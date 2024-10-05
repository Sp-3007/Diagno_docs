import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, collection, doc, addDoc } from "../../../config/firebase";
import "../../../styles/Diagnostic_center/test/Add_Test.css";
import SearchBar from "./Shearch_Test"; // Ensure the import path is correct

const AddTestForm = () => {
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState({
    testName: "",
    description: "",
    preparationInstructions: "",
    duration: "",
    price: "",
  });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleSelect = (selectedTest) => {
    setTestDetails({
      testName: selectedTest.name || "",
      description: selectedTest.description || "",
      preparationInstructions: selectedTest.preparationInstructions || "",
      duration: selectedTest.duration || "",
      price: selectedTest.price || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const diagnosticCenterId = "QSDSuH7NYj5VoDwQeWR8";
      const docRef = doc(firestore, "Diagnostic_center", diagnosticCenterId);
      const colRef = collection(docRef, "Available_Test");
      await addDoc(colRef, testDetails);
      alert("Test added successfully");
      setTestDetails({
        testName: "",
        description: "",
        preparationInstructions: "",
        duration: "",
        price: "",
      });
      navigate("/alltest"); // Redirect to Alltest page
    } catch (error) {
      console.error("Error adding test:", error);
      alert("Error adding test");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form className="add-test-form" onSubmit={handleSubmit}>
      <SearchBar onSelect={handleSelect} />
      {testDetails.testName && (
        <div className="selected-test">
          <label>Selected Test: {testDetails.testName}</label>
        </div>
      )}
      <textarea
        className="test-description"
        name="description"
        value={testDetails.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <textarea
        className="test-preparation-instructions"
        name="preparationInstructions"
        value={testDetails.preparationInstructions}
        onChange={handleChange}
        placeholder="Preparation Instructions"
        required
      />
      <input
        className="test-duration"
        type="text"
        name="duration"
        value={testDetails.duration}
        onChange={handleChange}
        placeholder="Duration"
        required
      />
      <input
        className="test-price"
        type="number"
        name="price"
        value={testDetails.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? "Adding Test..." : "Add Test"}
      </button>
    </form>
  );
};

export default AddTestForm;
