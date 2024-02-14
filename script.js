let actionValues = {
    eatInMorning: "",
    eatInMorningPoints: "",
    overEating: "",
    overEatingPoints: ""
}

function addUserInput() {
    let hasEated = document.getElementById("eatInMorning").checked;
    let hasEatedPoints = document.getElementById("eatInMorningPoints").value

    let overeating = document.getElementById("noOverEating").checked;
    let overeatingPoints = document.getElementById("noOverEatingPoints").value;

    
    actionValues['eatInMorning'] = hasEated;
    actionValues['eatInMorningPoints'] = hasEatedPoints;

    actionValues['overEating'] = overeating;
    actionValues['overEatingPoints'] = overeatingPoints;
}

// function to calculate total points
let totalPoints = 0;
function calculateTotalPoints() {
    for (let key in actionValues) {
        if (key.endsWith('Points')) {
            totalPoints += parseInt(actionValues[key]);
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

// event listener functions
function updateUserInputAndCalculateTotalPoints() {
    addUserInput();
    calculateTotalPoints();
}

// event listeners
document.getElementById("calculateButton").addEventListener("click", updateUserInputAndCalculateTotalPoints);