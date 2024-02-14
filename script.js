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
addUserInput();


// function to calculate total points
let totalPoints = 0;
function calculateTotalPoints() {
    for (let key in actionValues) {
        if (key.endsWith('Points')) {
            totalPoints += parseInt(actionValues[key]);
        }
    }
    return totalPoints;
}


