let actionValues = {
    eated: "",
    eatedValue: ""
}

function addUserInput() {
    let hasEated = document.getElementById("task1").checked;
    let hasEatedPoints = document.getElementById("eatedValue").value
    
    actionValues['eated'] = hasEated;
    actionValues['eatedValue'] = hasEatedPoints;
}
addUserInput();




