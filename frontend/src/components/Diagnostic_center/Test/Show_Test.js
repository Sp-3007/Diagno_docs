import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, collection, getDocs, doc } from "../../../config/firebase";
import "../../../styles/Diagnostic_center/test/Show_Test.css";

const Alltest = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const diagnosticCenterId = "QSDSuH7NYj5VoDwQeWR8";
        const docRef = doc(firestore, "Diagnostic_center", diagnosticCenterId);
        const colRef = collection(docRef, "Available_Test");
        const querySnapshot = await getDocs(colRef);
        const testsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched tests:", testsList);
        setTests(testsList);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  const handleAddClick = () => {
    navigate("/addtest");
  };

  const handleModifyClick = (testId) => {
    navigate(`/modifytest/${testId}`);
  };

  return (
    <>
      <button onClick={handleAddClick} className="add-test-button">
        Add New Test
      </button>
      <div className="tests-container">
        <ul className="tests-list">
          {tests.length === 0 ? (
            <p className="no-tests-available">No tests available</p>
          ) : (
            tests.map((test) => (
              <li key={test.id} className="test-item">
                <h3>{test.testName}</h3>
                <p>Description: {test.description}</p>
                <p>Duration: {test.duration}</p>
                <p>Price: {test.price}</p>
                <button
                  onClick={() => handleModifyClick(test.id)}
                  className="modify-button"
                >
                  Modify
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Alltest;
