let data = {};

function addUserInput() {
    const currentDate = new Date().toISOString().slice(0, 10);
    // Code for eat in morning stuff
    const eatMorningStatus = document.getElementById("eatInMorning").checked;

    // Traversing DOM to get points value
    const morningParentOfCheckbox = document.getElementById("eatInMorning").parentElement
    const morningPointsContainer = morningParentOfCheckbox.nextElementSibling.nextElementSibling;
    const morningActualPointsElement = morningPointsContainer.querySelector('.points')
    const morningEatInMorningPoints = morningActualPointsElement.textContent;


    // Code for no overeating
    const overeatingStatus = document.getElementById("noOverEating").checked;

    // Traversing DOM to get points value 
    const overeatingparentOfCheckbox = document.getElementById("noOverEating").parentElement
    const overeatingpointsContainer = overeatingparentOfCheckbox.nextElementSibling.nextElementSibling;
    const overeatingactualPointsElement = overeatingpointsContainer.querySelector('.points')
    const overeatingPoints = overeatingactualPointsElement.textContent;


    data[currentDate] = {
        eatInMorning: eatMorningStatus,
        eatInMorningPoints: morningEatInMorningPoints,
        overEating: overeatingStatus,
        overEatingPoints: overeatingPoints
    }
    saveToLocalhost()
}

function calculateTotalPoints() {
    addUserInput();
    let totalPoints = 0;

    // Iterate through each date key in the data object
    for (let dateKey in data) {
        let dateData = data[dateKey];
        // Iterate through key '2024-02-14' through all keys like eatInMorning etc
        for (let key in dateData) {
            if (key.endsWith('Points')) {
                totalPoints += parseInt(dateData[key]);
            }
        }
    }

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
function checkboxPoints(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        const checkbox = event.target;
        const pointsContainer = checkbox.closest('.container').querySelector('.points');

        // Set points based on the checkbox state
        if (checkbox.id === 'eatInMorning') {
            pointsContainer.textContent = checkbox.checked ? '3' : '0';
        } else if (checkbox.id === 'noOverEating') {
            pointsContainer.textContent = checkbox.checked ? '2' : '0';
        }
    }
}

function submitData() {
    addUserInput();
    calculateTotalPoints();
}

// event listeners
document.querySelector('.main-container').addEventListener('change', checkboxPoints)
document.getElementById("calculateButton").addEventListener("click", submitData);




const openModal = document.querySelector('.show-modal');
const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector('.modal')

openModal.addEventListener('click', () => {
    modal.showModal();
})
closeModal.addEventListener('click', () => {
    modal.close()
})




