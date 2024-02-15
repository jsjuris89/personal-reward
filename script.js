let data = {};

function addUserInput() {
    // get values from HTML
    let hasEated = document.getElementById("eatInMorning").checked;
    let hasEatedPoints = document.getElementById("eatInMorningPoints").value;

    let overeating = document.getElementById("noOverEating").checked;
    let overeatingPoints = document.getElementById("noOverEatingPoints").value;

    // Get current date in "YYYY-MM-DD" format
    let currentDate = new Date().toISOString().slice(0, 10);

    data[currentDate] = {
        eatInMorning: hasEated,
        eatInMorningPoints: hasEatedPoints,
        overEating: overeating,
        overEatingPoints: overeatingPoints
    }
    saveToLocalhost()
};

// function to calculate total points
function calculateTotalPoints() {
    let totalPoints = 0;
    // Iterate through each date key in the data object
    for (let dateKey in data) {
        let dateData = data[dateKey];
        // Iterate through key '2024-02-14' through all keys like eatInMorning etc
        for (let key in dateData) {
            // Check if the property key ends with 'Points'
            if (key.endsWith('Points')) {
                // Add points to totalPoints
                totalPoints += parseInt(dateData[key]);
            }
        }
    }

    // Determine reward based on total points
    console.log("Total Points:", totalPoints);
    if (totalPoints >= 10) {
        console.log("Congratulations! You can get a pizza reward.");
    } else if (totalPoints >= 5) {
        console.log("Congratulations! You can get a kebab reward.");
    } else {
        console.log("Keep accumulating points for a tasty reward!");
    }
}

// get data from specific date
function getDataForDate(dateInISO) {
    let dataFromSpecificDate = localStorage.getItem('data');
    let data = dataFromSpecificDate ? JSON.parse(dataFromSpecificDate) : {};
    
    // Retrieve data for the specified date
    return data[dateInISO] || {};
}

function saveToLocalhost() {
    localStorage.setItem('data', JSON.stringify(data));
}
// event listener functions
function submitData() {
    addUserInput();
    calculateTotalPoints();
}

// event listeners
document.getElementById("calculateButton").addEventListener("click", submitData);
