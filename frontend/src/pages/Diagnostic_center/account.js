import React, { useEffect, useState } from "react";
import { firestore, doc, getDoc } from "../../config/firebase"; // Correct import for Firestore

import "../../styles/Diagnostic_center/account.css"; // Ensure CSS path is correct

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const centerId = "r7QrCUgMD8qzVJe5BDm2"; // Get the center ID dynamically if needed
        const docRef = doc(firestore, "Diagnostic_center", centerId); // Create document reference
        const docSnap = await getDoc(docRef); // Get document snapshot

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("Error fetching user data: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="account-container">
      <div className="profile-header">
        <img
          src={
            userData?.profilePhoto ||
            "data:image/jpeg;base64,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"
          }
          alt="User Profile"
          className="profile-photo"
        />
        <h1>Account Page</h1>
      </div>
      {userData ? (
        <div className="user-details">
          <p>
            <strong>Center Name:</strong> {userData.centerName}
          </p>
          <p>
            <strong>City:</strong> {userData.city}
          </p>
          <p>
            <strong>Contact Person:</strong> {userData.contactPerson}
          </p>
          <p>
            <strong>Registration Number:</strong> {userData.registrationNumber}
          </p>
          <p>
            <strong>Insurance Accepted:</strong> {userData.insuranceAccepted}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(userData.createdAt.seconds * 1000).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};

export default Account;
