import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addTestSlot } from "../../../config/Slot_config";
import "../../../styles/Diagnostic_center/Slot/AddSlotPage.css"; // Import the CSS file

const AddSlotPage = () => {
  const { testId } = useParams();
  const centerId = "QSDSuH7NYj5VoDwQeWR8"; // Replace with your center ID
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeZone, setTimeZone] = useState("UTC+5:30");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slot = {
      date,
      startTime,
      endTime,
      timeZone,
    };
    try {
      await addTestSlot(centerId, testId, slot);
      navigate(`/slots/${testId}`);
    } catch (error) {
      console.error("Error adding slot:", error);
    }
  };

  return (
    <div className="add-slot-container">
      <h2>Add Available Slot</h2>
      <form onSubmit={handleSubmit} className="add-slot-form">
        <div className="form-group">
          <label htmlFor="date">Select Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeZone">Time Zone:</label>
          <input
            type="text"
            id="timeZone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlotPage;
