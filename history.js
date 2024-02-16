// Local storage stuff
const dataLocalstorage = localStorage.getItem('data');
const data = JSON.parse(dataLocalstorage);


// insert data in html table
const specificDiv = document.querySelector('.date-header[data-date="2024-02-16"]');
const tableAfterSpecificDiv = specificDiv.nextElementSibling;

const tdElements = tableAfterSpecificDiv.querySelectorAll('td');

// Loop through each <td> element to find the one containing 'Eat breakfast'
tdElements.forEach(td => {
    if (td.textContent.trim() === 'Eat breakfast') {
        // Get the next sibling <td> element
        const nextCell = td.nextElementSibling;
        const nextSecondCell = nextCell.nextElementSibling
        
        // Insert the value into the next cell
        if (nextCell) {
            const eatInMorningValue = data["2024-02-16"]["eatInMorning"];
            nextCell.textContent = eatInMorningValue ? "Yes" : "No";
        }

        // Insert the value into the next second cell or next, next cell
        if (nextSecondCell) {
            const eatInMorningPoints = data["2024-02-16"]["eatInMorningPoints"];
            nextSecondCell.textContent = eatInMorningPoints;
        }


    }
    if (td.textContent.trim() === 'No extra food') {
        const nextCell = td.nextElementSibling;
        const nextSecondCell = nextCell.nextElementSibling
        
        if (nextCell) {
            const overEatingValue = data["2024-02-16"]["overEating"];
            nextCell.textContent = overEatingValue ? "Yes" : "No";
        }

        if (nextSecondCell) {
            const overEatingPoints = data["2024-02-16"]["overEatingPoints"];
            nextSecondCell.textContent = overEatingPoints
        }
    }
});


