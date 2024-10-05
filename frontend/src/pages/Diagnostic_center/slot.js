import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, collection, getDocs } from "../../config/firebase";
import "../../styles/Diagnostic_center/pages/slot.css"

const TestListPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const centerId = "QSDSuH7NYj5VoDwQeWR8";

  useEffect(() => {
    const fetchTests = async () => {
      const colRef = collection(
        firestore,
        "Diagnostic_center",
        centerId,
        "Available_Test"
      );
      const snapshot = await getDocs(colRef);
      const testsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTests(testsList);
    };

    fetchTests();
  }, []);

  const handleViewSlots = (testId) => {
    navigate(`/slots/${testId}`);
  };

  return (
    <div className="test-list-container">
      <h2 id="hhhh">Available Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            {test.testName}
            <button onClick={() => handleViewSlots(test.id)}>Manage Slots</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestListPage;
