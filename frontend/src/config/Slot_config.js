// src/firebaseFunctions.js
import { firestore, doc, setDoc, getDocs, collection } from "./firebase";

// Function to add a test slot
const addTestSlot = async (centerId, testId, slot) => {
  try {
    const slotId = `${Date.now()}`; // Generate or use a unique slot ID
    await setDoc(
      doc(
        firestore,
        "Diagnostic_center",
        centerId,
        "Available_Test",
        testId,
        "Test_Slot",
        slotId
      ),
      slot
    );
    console.log("Slot added successfully");
  } catch (error) {
    console.error("Error adding slot: ", error);
  }
};

// Function to fetch test slots
const fetchTestSlots = async (centerId, testId) => {
  try {
    const querySnapshot = await getDocs(
      collection(
        firestore,
        "Diagnostic_center",
        centerId,
        "Available_Test",
        testId,
        "Test_Slot"
      )
    );
    const slots = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return slots;
  } catch (error) {
    console.error("Error fetching slots: ", error);
  }
};

export { addTestSlot, fetchTestSlots };
