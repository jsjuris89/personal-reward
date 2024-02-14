// Retrieve the JSON string from local storage
let actionValuesString = localStorage.getItem('actionValues');

// Convert the JSON string back to an object
let actionValues = JSON.parse(actionValuesString);