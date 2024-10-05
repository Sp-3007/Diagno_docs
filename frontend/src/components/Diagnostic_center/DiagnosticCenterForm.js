import React, { useState } from "react";
import Modal from "react-modal";
import "../../styles/Diagnostic_center/DiagnosticCenterForm.css";
import {
  FaClinicMedical,
  FaUser,
  FaRegAddressCard,
  FaClock,
  FaHandHoldingUsd,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

Modal.setAppElement("#root");

const predefinedInsuranceOptions = ["PM-Jay", "Bajaj", "HDFC Health Provider"];

const DiagnosticCenterForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    centerName: "",
    registrationNumber: "",
    contactPerson: "",
    address: "",
    city: "",
    insuranceAccepted: "",
    latitude: "",
    longitude: "",
    customInsurance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInsuranceChange = (e) => {
    const { value } = e.target;
    if (value === "Other") {
      setFormData({ ...formData, insuranceAccepted: "", customInsurance: "" });
    } else {
      setFormData({
        ...formData,
        insuranceAccepted: value,
        customInsurance: "",
      });
    }
  };

  const handleCustomInsuranceChange = (e) => {
    setFormData({
      ...formData,
      customInsurance: e.target.value,
      insuranceAccepted: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const insurance = formData.customInsurance || formData.insuranceAccepted;

    try {
      const response = await fetch(
        "http://localhost:3001/diagnostic_center/details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, insuranceAccepted: insurance }),
        }
      );

      if (response.ok) {
        console.log("Diagnostic center registered successfully!");
        localStorage.setItem("diagnosticCenterData", JSON.stringify(formData)); // Store data in localStorage
        onClose(); // Close the form
      } else {
        console.error("Registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering diagnostic center:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const address = data.display_name || "Unknown location";
              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                "Unknown city";
              setFormData({
                ...formData,
                address,
                city,
                latitude,
                longitude,
              });
            })
            .catch((error) => console.error("Error fetching address:", error));
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                "Geolocation permission denied. Please allow location access."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.");
              break;
            default:
              alert("An error occurred. Please try again.");
          }
        },
        { timeout: 10000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div id="back_g">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        contentLabel="Register Diagnostic Center"
        className="diagnostic-modal"
        overlayClassName="diagnostic-overlay"
      >
        <div className="modal-header">
          <h2>Help us get to know you better 😊</h2>
        </div>
        <form onSubmit={handleSubmit} className="diagnostic-form">
          <div className="form-group">
            <label>
              <FaClinicMedical /> Center Name:
            </label>
            <input
              type="text"
              name="centerName"
              value={formData.centerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaRegAddressCard /> Registration Number:
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaUser /> Contact Person:
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <FaInfoCircle /> Address:
            </label>
            <div className="address-container">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <button
                type="button"
                className="get-location-button"
                onClick={getLocation}
              >
                <FaMapMarkerAlt /> Locate
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>
              <FaClock /> City:
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <FaHandHoldingUsd /> Insurance Accepted:
            </label>
            <div className="insurance-container">
              <select
                name="insuranceAccepted"
                value={formData.insuranceAccepted || "Other"}
                onChange={handleInsuranceChange}
              >
                <option value="Other">Select or Type</option>
                {predefinedInsuranceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Type your insurance"
                value={formData.customInsurance}
                onChange={handleCustomInsuranceChange}
                className={
                  formData.insuranceAccepted === "Other" ? "show-input" : ""
                }
              />
            </div>
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DiagnosticCenterForm;
