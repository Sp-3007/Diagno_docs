const medicalTests = [
  {
    category: "Blood Tests",
    tests: [
      { id: 1, name: "Complete Blood Count (CBC)" },
      { id: 2, name: "Blood Glucose Test" },
      { id: 3, name: "Lipid Panel" },
      { id: 4, name: "Liver Function Tests (LFTs)" },
      { id: 5, name: "Thyroid Function Tests" },
      { id: 6, name: "Hemoglobin A1c" },
      { id: 7, name: "Vitamin and Mineral Tests" },
    ],
  },
  {
    category: "Imaging Tests",
    tests: [
      { id: 8, name: "X-ray" },
      { id: 9, name: "Ultrasound" },
      { id: 10, name: "Magnetic Resonance Imaging (MRI)" },
      { id: 11, name: "Computed Tomography (CT) Scan" },
      { id: 12, name: "Positron Emission Tomography (PET) Scan" },
      { id: 13, name: "Mammography" },
    ],
  },
  {
    category: "Genetic Tests",
    tests: [
      { id: 14, name: "Prenatal Genetic Screening" },
      { id: 15, name: "Newborn Screening" },
      { id: 16, name: "Carrier Testing" },
      { id: 17, name: "Predictive and Pre-symptomatic Testing" },
      { id: 18, name: "Pharmacogenomics" },
    ],
  },
  {
    category: "Urine Tests",
    tests: [
      { id: 19, name: "Urinalysis" },
      { id: 20, name: "Urine Culture" },
      { id: 21, name: "24-Hour Urine Collection" },
      { id: 22, name: "Urine Protein Test" },
    ],
  },
  {
    category: "Cardiovascular Tests",
    tests: [
      { id: 23, name: "Electrocardiogram (ECG/EKG)" },
      { id: 24, name: "Echocardiogram" },
      { id: 25, name: "Stress Test" },
      { id: 26, name: "Holter Monitor" },
      { id: 27, name: "Cardiac Catheterization" },
    ],
  },
  {
    category: "Respiratory Tests",
    tests: [
      { id: 28, name: "Pulmonary Function Tests (PFTs)" },
      { id: 29, name: "Spirometry" },
      { id: 30, name: "Peak Flow Measurement" },
      { id: 31, name: "Arterial Blood Gas (ABG)" },
    ],
  },
  {
    category: "Microbiological Tests",
    tests: [
      { id: 32, name: "Blood Cultures" },
      { id: 33, name: "Stool Cultures" },
      { id: 34, name: "Throat Swabs" },
      { id: 35, name: "Wound Cultures" },
    ],
  },
  {
    category: "Endocrinological Tests",
    tests: [
      { id: 36, name: "Hormone Tests" },
      { id: 37, name: "Insulin Tests" },
      { id: 38, name: "Cortisol Tests" },
    ],
  },
  {
    category: "Oncological Tests",
    tests: [
      { id: 39, name: "Tumor Markers" },
      { id: 40, name: "Biopsies" },
      { id: 41, name: "Pap Smear" },
      { id: 42, name: "PSA Test (Prostate-Specific Antigen)" },
    ],
  },
  {
    category: "Neurological Tests",
    tests: [
      { id: 43, name: "Electroencephalogram (EEG)" },
      { id: 44, name: "Nerve Conduction Studies" },
      { id: 45, name: "Lumbar Puncture (Spinal Tap)" },
    ],
  },
  {
    category: "Reproductive Health Tests",
    tests: [
      { id: 46, name: "Pregnancy Test" },
      { id: 47, name: "Fertility Tests" },
      { id: 48, name: "STD/STI Tests" },
    ],
  },
  {
    category: "Autoimmune Tests",
    tests: [
      { id: 49, name: "Antinuclear Antibody (ANA)" },
      { id: 50, name: "Rheumatoid Factor (RF)" },
      { id: 51, name: "C-reactive Protein (CRP)" },
    ],
  },
];

module.exports =medicalTests