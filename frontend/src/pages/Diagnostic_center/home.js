import React, { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "../../config/firebase"; // Adjust the import path to your firebase config
import "../../styles/Diagnostic_center/home.css"; // Import your CSS file

const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        
        const querySnapshot = await getDocs(
          collection(firestore, "Appointments")
        );
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      } catch (e) {
        console.error("Error fetching appointments: ", e);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="appointments-container">
      <h1 id="app_h1">Appointments</h1>
      {appointments.length > 0 ? (
        <ul className="appointments-list">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <h2>User: {appointment.username}</h2>
              <p>
                <strong>Email:</strong> {appointment.email} <br />
                <strong>Mobile Number:</strong> {appointment.mobileNumber}{" "}
                <br />
                <strong>Test:</strong> {appointment.testName} <br />
                <strong>Time Slot:</strong> {appointment.timeSlot} <br />
                <strong>Date:</strong> {appointment.date} <br />
                <strong>Registered At:</strong>{" "}
                {new Date(appointment.createdAt.toDate()).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Home;
