import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Diagnostic_nav from "../components/Diagnostic_center/Diagnostic_nav";
import Alltest from "./Diagnostic_center/all_Test";
import Test from "./Diagnostic_center/Test";
import Slot from "./Diagnostic_center/slot";
import Home from "./Diagnostic_center/home";
import Account from "./Diagnostic_center/account";
import ModifyTest from "../components/Diagnostic_center/Test/Modify_Test";
import User_report from "./Diagnostic_center/user_report";
import AddSlotPage from "../components/Diagnostic_center/Slot/AddSlotPage";
import SlotListPage from "../components/Diagnostic_center/Slot/SlotListPage";
import DiagnosticCenterForm from "../components/Diagnostic_center/DiagnosticCenterForm";

const Diagnostic_center_Page = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    // Check if the diagnostic center data is already stored
    const storedData = localStorage.getItem("diagnosticCenterData");
    if (storedData) {
      setIsSetupComplete(true);
      setIsFormOpen(false);
    }
  }, []);

  const handleCloseForm = () => {
    // Handle form closure logic (e.g., store data, update state)
    setIsFormOpen(false);
    setIsSetupComplete(true); // Set the setup as complete to navigate to home
  };

  if (!isSetupComplete) {
    return <DiagnosticCenterForm isOpen={true} onClose={handleCloseForm} />;
  }

  return (
    <div>
      {!isFormOpen && <Diagnostic_nav />}
      <main>
        <Routes>
          <Route path="alltest" element={<Alltest />} />
          <Route path="slot_update" element={<Slot />} />
          <Route path="upload_userreport" element={<User_report />} />
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="addtest" element={<Test />} />
          <Route path="modifytest/:testId" element={<ModifyTest />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/add-slot/:testId" element={<AddSlotPage />} />
          <Route path="/slots/:testId" element={<SlotListPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Diagnostic_center_Page;
