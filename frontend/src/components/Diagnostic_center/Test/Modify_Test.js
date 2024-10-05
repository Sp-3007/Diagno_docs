import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  firestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "../../../config/firebase";
import "../../../styles/Diagnostic_center/test/ModifyTest.css"; // Import the CSS file

const ModifyTest = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState({
    testName: "",
    description: "",
    preparationInstructions: "",
    duration: "",
    price: "",
  });

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const diagnosticCenterId = "QSDSuH7NYj5VoDwQeWR8";
        const docRef = doc(
          firestore,
          "Diagnostic_center",
          diagnosticCenterId,
          "Available_Test",
          testId
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTestDetails(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestDetails();
  }, [testId]);

  const handleChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const diagnosticCenterId = "QSDSuH7NYj5VoDwQeWR8";
      const docRef = doc(
        firestore,
        "Diagnostic_center",
        diagnosticCenterId,
        "Available_Test",
        testId
      );
      await updateDoc(docRef, testDetails);
      alert("Test updated successfully");
      navigate("/alltest");
    } catch (error) {
      console.error("Error updating test:", error);
      alert("Error updating test");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );
    if (confirmDelete) {
      try {
        const diagnosticCenterId = "QSDSuH7NYj5VoDwQeWR8";
        const docRef = doc(
          firestore,
          "Diagnostic_center",
          diagnosticCenterId,
          "Available_Test",
          testId
        );
        await deleteDoc(docRef);
        alert("Test deleted successfully");
        navigate("/alltest");
      } catch (error) {
        console.error("Error deleting test:", error);
        alert("Error deleting test");
      }
    }
  };

  return (
    <form className="modify-test-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="testName"
        value={testDetails.testName}
        onChange={handleChange}
        placeholder="Test Name"
        required
      />
      <textarea
        name="description"
        value={testDetails.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <textarea
        name="preparationInstructions"
        value={testDetails.preparationInstructions}
        onChange={handleChange}
        placeholder="Preparation Instructions"
        required
      />
      <input
        type="text"
        name="duration"
        value={testDetails.duration}
        onChange={handleChange}
        placeholder="Duration"
        required
      />
      <input
        type="number"
        name="price"
        value={testDetails.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <button type="submit">Update Test</button>
      <button type="button" onClick={handleDelete}>
        Delete Test
      </button>
    </form>
  );
};

export default ModifyTest;
