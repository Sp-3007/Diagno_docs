import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cache, setCache] = useState({});
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Fetch default tests when the component mounts
    const fetchDefaultTests = async () => {
      const response = await axios.get("http://localhost:3001/Test_list");
      setSuggestions(response.data);
    };

    fetchDefaultTests();
  }, []);

  const fetchSuggestions = debounce(async (value) => {
    if (cache[value]) {
      setSuggestions(cache[value]);
    } else {
      const response = await axios.get("http://localhost:3001/Test_list", {
        params: { testName: value },
      });
      setCache((prevCache) => ({ ...prevCache, [value]: response.data }));
      setSuggestions(response.data);
    }
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      const fetchDefaultTests = async () => {
        const response = await axios.get("http://localhost:3001/Test_list");
        setSuggestions(response.data);
      };

      fetchDefaultTests();
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    setSuggestions([]);
    setIsFocused(false);
    onSelect(suggestion);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100); // Delay to allow click event on suggestion item
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search for tests..."
      />
      {isFocused && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
