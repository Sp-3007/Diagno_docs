import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { firestore, doc, deleteDoc } from "../../../config/firebase";
import { fetchTestSlots } from "../../../config/Slot_config";
import "../../../styles/Diagnostic_center/Slot/SlotListPage.css";

const SlotListPage = () => {
  const { testId } = useParams();
  const [slots, setSlots] = useState([]);
  const centerId = "QSDSuH7NYj5VoDwQeWR8"; // Replace with your center ID
  const navigate = useNavigate();

  useEffect(() => {
    const getSlots = async () => {
      const fetchedSlots = await fetchTestSlots(centerId, testId);
      setSlots(fetchedSlots);
    };

    getSlots();
  }, [centerId, testId]);

  const handleDeleteSlot = async (slotId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this slot?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(
          doc(
            firestore,
            "Diagnostic_center",
            centerId,
            "Available_Test",
            testId,
            "Test_Slot",
            slotId
          )
        );
        setSlots(slots.filter((slot) => slot.id !== slotId));
      } catch (error) {
        console.error("Error deleting slot:", error);
      }
    }
  };

  const handleAddSlot = () => {
    navigate(`/add-slot/${testId}`);
  };

  return (
    <div className="slot-list-container">
      <div className="slot-list-header">
        <h2>Available Slots</h2>
        <button className="add-slot-button-redirect" onClick={handleAddSlot}>
          Add Slot
        </button>
      </div>
      {slots.map((slot) => (
        <div key={slot.id} className="slot-item">
          <p>Date: {slot.date}</p>
          <p>
            Time: {slot.startTime} - {slot.endTime}
          </p>
          <p>Time Zone: {slot.timeZone}</p>
          <button onClick={() => handleDeleteSlot(slot.id)}>Delete Slot</button>
        </div>
      ))}
    </div>
  );
};

export default SlotListPage;
