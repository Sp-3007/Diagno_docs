const medicalTests = require("../config/medicalTests ");

// Create a search index for faster lookups
const searchIndex = {};

medicalTests.forEach(category => {
  category.tests.forEach(test => {
    const key = test.name.toLowerCase();
    if (!searchIndex[key]) {
      searchIndex[key] = [];
    }
    searchIndex[key].push(test);
  });
});

const list = async (req, res) => {
  const category = req.query.category;
  const testName = req.query.testName;

  console.log("Received query:", { category, testName }); // Debugging log

  if (category) {
    const filteredTests = medicalTests.filter(testCategory =>
      testCategory.category.toLowerCase().includes(category.toLowerCase())
    );
    console.log("Filtered by category:", filteredTests); // Debugging log
    return res.send(filteredTests);
  }

  if (testName) {
    const key = testName.toLowerCase();
    const matchingTests = [];
    Object.keys(searchIndex).forEach(indexKey => {
      if (indexKey.includes(key)) {
        matchingTests.push(...searchIndex[indexKey]);
      }
    });
    console.log("Filtered by test name:", matchingTests); // Debugging log
    return res.send(matchingTests);
  }

  // Default tests to show if no query is provided
  const defaultTests = medicalTests.flatMap(category => category.tests).slice(0, 10);
  console.log("Default tests:", defaultTests); // Debugging log
  res.send(defaultTests);
};

module.exports = list;
