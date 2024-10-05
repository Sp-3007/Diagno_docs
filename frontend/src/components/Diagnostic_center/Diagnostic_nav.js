import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Diagnostic_center/Diagnostic_nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Diagnostic_nav = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;
    setVisible(visible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div id="main_nav" className={visible ? "visible" : "hidden"}>
      <div id="topblock"></div>
      <div id="d_navbar">
        <div id="nav_1">
          <div id="logo"></div>
          <Link to="home">
            <img
              className="logo"
              src="../../screenshot (38) 1.png"
              alt="Logo"
            />
          </Link>
          <div id="search_bar">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="text"
              placeholder="Search"
              id="inf"
              style={{ marginLeft: "10px" }}
            />
          </div>
        </div>
        <ul id="ui">
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="alltest">Add Test</Link>
          </li>
          <li>
            <Link to="slot_update">Update Slot</Link>
          </li>
          <li>
            <Link to="upload_userreport">Upload Test Report</Link>
          </li>
          <li>
            <Link to="account">
              <img
                className="d_logo"
                src="../../projectuser.jpg"
                alt="Account"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Diagnostic_nav;
