let data = {};

// User 1st time setting values for actions and their point values
const eatInMorning = 4;
const noExtraFood = 15;

const actionPoints = {
    "eatInMorningPoints": eatInMorning,
    "overEatingPoints": noExtraFood
}
// - [x] how can we add new actions from the user input?
function configureActionPointsObj(actionName, actionPointsValue) {
    // Add or update the key-value pair in the actionPoints object
    actionPoints[actionName] = parseFloat(actionPointsValue);

    // Additional logic using the updated actionPoints object
    console.log('Updated Action Points:', actionPoints);
}
function createDom(action) {
    const mainContainer = document.querySelector('.main-container');
    const calculateButton = document.getElementById('calculateButton');

    // Create a new container element
    const newContainer = document.createElement('div');
    newContainer.classList.add('container');

    newContainer.innerHTML = `
    <label for="newCheckbox">
        <input type="checkbox" id="newCheckbox">
    </label>
    <p>${action}</p>
    <div class="points-container">
        <p>Points</p>
        <span class="points">0</span>
    </div>
    <button class="delete-button">Delete</button>
`;

    mainContainer.insertBefore(newContainer, calculateButton);
}






// User modify values for actions and points ?
// - [ ] create another modal


// this modifies data object for specific data, but we shouldnt modify past data (that is cheating)
function newValuesForPoints(date) {
    console.log('setUserPointsValues executed...')
    // Check if the data object has a property corresponding to the provided date
    if (data.hasOwnProperty(date)) {
        // Get the object corresponding to the provided date
        const dateObject = data[date];

        // Iterate over the keys in actionPoints
        for (let key in actionPoints) {
            // Check if the key exists in the dateObject
            if (dateObject.hasOwnProperty(key)) {
                // Update the value in dateObject with the value from actionPoints
                dateObject[key] = actionPoints[key];
            }
        }
    }
    console.log('at the end of setUserPointsValues data object is: ', data['2024-02-22'])
}

// this is basically taking things from UI and changing data inside our data object (should be reversed data comes from database and are being displayed in the UI)
// - [ ] remove later from code
// function updateDomPointsValue() {
//     // newValuesForPoints('2024-02-22')


//     // Select all elements with class 'points'
//     const pointsElements = document.querySelectorAll('.points');
//     pointsElements.forEach(element => {
//         // Check if the element has a specific second class
//         if (element.classList.contains('morning')) {
//             console.log('first if textContent -->', element.textContent)
//             data['2024-02-22'].eatInMorningPoints = actionPoints.eatInMorningPoints
//         } else if (element.classList.contains('noExtra')) {
//             data['2024-02-22'].overEatingPoints = actionPoints.overEatingPoints
//         }
//     });
// }


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
    console.log('checkboxPoints event was launched')
    if (event.target.matches('input[type="checkbox"]')) {
        const checkbox = event.target;
        const pointsContainer = checkbox.closest('.container').querySelector('.points');

        // Set points based on the checkbox state
        if (checkbox.id === 'eatInMorning') {
            pointsContainer.textContent = checkbox.checked ? actionPoints.eatInMorningPoints : '0';
        } else if (checkbox.id === 'noOverEating') {
            pointsContainer.textContent = checkbox.checked ? actionPoints.overEatingPoints : '0';
        }
    }
}

function deleteDom(e) {
    if (e.target.classList.contains('delete-button')) {
        const children = e.target.parentElement;
        const parent = children.parentElement
        parent.removeChild(children)
    }
}

function submitData() {
    addUserInput();
    calculateTotalPoints();
}


// event listeners
document.querySelector('.main-container').addEventListener('change', checkboxPoints)
document.getElementById("calculateButton").addEventListener("click", submitData);
const delBtnBubblingParent = document.querySelector('.main-container')
delBtnBubblingParent.addEventListener('click', deleteDom)


const openModal = document.querySelector('.show-modal');
const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector('.modal')

openModal.addEventListener('click', () => {
    modal.showModal();
})
closeModal.addEventListener('click', () => {
    modal.close()
})

function modalSubmitForm(event) {
    const actionName = document.getElementById('modal-insert-action-name').value
    const actionPoints = document.getElementById('modal-action-points').value;

    configureActionPointsObj(actionName, actionPoints)
    // After user has configured new action and points assigned for that action
    // That action should be displayed in the UI
    // So user can add todays data
    createDom(actionName)
}

