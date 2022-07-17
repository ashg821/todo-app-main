const dataObj = { all: [], active: [], completed: [] };

function setToLocalStorage(dataObj) {
    localStorage.setItem('data', JSON.stringify(dataObj));
}


function getFromLocalStorage() {

    return JSON.parse(localStorage.getItem('data'));

}

function showAllNotes() {
    const dataObj = getFromLocalStorage();
    const notesContainer = document.getElementById('notesContainer');
    dataObj.all.forEach(ele => {
        notesContainer.innerHTML += `
            <div class="noteContainer">
            <div class="checkHolder">
                <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
            </div>
            <p class="noteText">${ele}</p>
            </div>
            <hr>`;
    });
}

function addingInputEventHandler() {
    const inputTag = document.getElementById('inputNote');
    // console.log(inputTag);
    inputTag.addEventListener('change', (e) => {
        console.log(e.target.value);
        const notesContainer = document.getElementById('notesContainer');
        // console.log(notesContainer);
        notesContainer.innerHTML += `
            <div class="noteContainer">
            <div class="checkHolder">
                <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
            </div>
            <p class="noteText">${e.target.value}</p>
            </div>
            <hr>`
        dataObj.all.push(e.target.value);
        dataObj.active.push(e.target.value);
        setToLocalStorage(dataObj);
        e.target.value = '';
    });
}

// setToLocalStorage(dataObj);
// console.log(getFromLocalStorage());

showAllNotes();
addingInputEventHandler();