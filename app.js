let dataObj = getFromLocalStorage() == null ? { notes: [] } : getFromLocalStorage();
let mode = 'dark';

function setToLocalStorage(dataObj) {
    localStorage.setItem('data', JSON.stringify(dataObj));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
}

const allNotes = document.getElementById('all');
allNotes.addEventListener('click', () => {
    showAllNotes();
    handleLinkColors(0, mode);
});

function showAllNotes() {
    allNotes.style.color = 'var(--brightBlue)';
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    dataObj.notes.forEach((ele) => {
        notesContainer.innerHTML += `
        <div class="noteContainer">
        <div class="checkHolder">
        <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
        </div>
        <p class="noteText">${ele[0]}</p>
        <img src="./images/icon-cross.svg" class="deleteBtn"/>
        </div> 
        <hr>`;
    });
    dataObj.notes.forEach((ele, index) => {
        if (ele[2] == 1) {
            const noteContainer = document.querySelectorAll('.noteContainer');
            noteContainer[index].children[0].children[0].style.display = 'inline';
            noteContainer[index].children[0].style.backgroundImage = 'var(--checkBackground)';
            noteContainer[index].children[1].style.color = 'var(--veryDarkGrayishBlue1)';
            noteContainer[index].children[1].style.textDecoration = 'line-through';
        }
    });
    addEventListenerToCheckBox();
    addEventListenerToDeleteBtn();
    addHoverEffectToNoteContainer(notesContainer);
    updateLeftNotes();
    showActiveNotes();
    showCompletedNotes();
    clearCompletedNotes();
    handleMode();
    handleHover();
}

function showActiveNotes() {
    const activeNote = document.getElementById('active');
    const notesContainer = document.getElementById('notesContainer');
    activeNote.addEventListener('click', () => {
        notesContainer.innerHTML = '';
        activeNote.style.color = 'var(--brightBlue)';
        handleLinkColors(1, mode);
        getFromLocalStorage().notes.forEach(ele => {
            if (ele[1] == 1) {
                notesContainer.innerHTML += `
                <div class="noteContainer">
                    <div class="checkHolder">
                    <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
                    </div>
                    <p class="noteText">${ele[0]}</p>
                    <img src="./images/icon-cross.svg" class="deleteBtn"/>
                </div> 
                <hr>
                `;
            }
        });
    });

}

function showCompletedNotes() {
    const completedNote = document.getElementById('completed');
    const notesContainer = document.getElementById('notesContainer');

    completedNote.addEventListener('click', () => {
        notesContainer.innerHTML = ``;
        completedNote.style.color = 'var(--brightBlue)';
        handleLinkColors(2, mode);
        getFromLocalStorage().notes.forEach(ele => {
            if (ele[2] == 1) {
                notesContainer.innerHTML += `
                <div class="noteContainer">
                    <div class="checkHolder">
                    <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
                    </div>
                    <p class="noteText">${ele[0]}</p>
                    <img src="./images/icon-cross.svg" class="deleteBtn"/>
                </div> 
                <hr>
                `;
            }
        });
        const noteContainer = document.querySelectorAll('.noteContainer');
        if (notesContainer.innerHTML != '') {
            noteContainer.forEach((ele, index) => {
                noteContainer[index].children[0].children[0].style.display = 'inline';
                noteContainer[index].children[0].style.backgroundImage = 'var(--checkBackground)';
                noteContainer[index].children[1].style.color = 'var(--veryDarkGrayishBlue1)';
                noteContainer[index].children[1].style.textDecoration = 'line-through';
            });
        }
    });
}

function clearCompletedNotes() {
    const clearCompleted = document.getElementById('clearCompleted');
    const notesContainer = document.getElementById('notesContainer');
    clearCompleted.addEventListener('click', () => {
        const notesObj = getFromLocalStorage();
        for (let i = 0; i < notesObj.notes.length; i++) {
            if (notesObj.notes[i][2] == 1) {
                notesObj.notes.splice(i, 1);
                i--;
            }
        }
        setToLocalStorage(notesObj);
        dataObj = notesObj;

        notesContainer.innerHTML = '';
        dataObj.notes.forEach((ele) => {
            notesContainer.innerHTML += `
        <div class="noteContainer">
        <div class="checkHolder">
        <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
        </div>
        <p class="noteText">${ele[0]}</p>
        <img src="./images/icon-cross.svg" class="deleteBtn"/>
        </div> 
        <hr>`;
        });


    });
}


function addingInputEventHandler() {
    const inputTag = document.getElementById('inputNote');
    // console.log(checkHolders);
    inputTag.addEventListener('change', (e) => {
        const notesContainer = document.getElementById('notesContainer');
        notesContainer.innerHTML += `
            <div class="noteContainer">
                <div class="checkHolder">
                <img src="./images/icon-check.svg" alt="check-icon" class="checkIcon">
                </div>
                <p class="noteText">${e.target.value}</p>
                <img src="./images/icon-cross.svg" class="deleteBtn"/>
            </div>
            <hr>
            `
        dataObj.notes.push([e.target.value, 1, 0]);
        setToLocalStorage(dataObj);
        e.target.value = '';
        addEventListenerToCheckBox();
        addEventListenerToDeleteBtn();
        addHoverEffectToNoteContainer();
        updateLeftNotes();
        showActiveNotes();
        showCompletedNotes();
        clearCompletedNotes();
        handleMode();
        handleHover();
    });
}

function addEventListenerToCheckBox() {
    const checkHolders = document.querySelectorAll('.checkHolder');
    checkHolders.forEach((ele, index) => {
        ele.addEventListener('click', () => {
            let checked = getFromLocalStorage().notes[index][2];
            if (checked != 1) {
                checked = 1;
                dataObj = getFromLocalStorage();
                ele.children[0].style.display = 'inline';
                ele.style.backgroundImage = 'var(--checkBackground)';
                ele.parentElement.children[1].style.color = 'var(--veryDarkGrayishBlue1)';
                ele.parentElement.children[1].style.textDecoration = 'line-through';
                dataObj.notes.forEach((element, Index) => {
                    if (index == Index) {
                        element[1] = 0;
                        element[2] = 1;
                    }
                });
            }
            else {
                checked = 0;
                ele.children[0].style.display = 'none';
                ele.style.backgroundImage = 'none';
                ele.parentElement.children[1].style.color = 'var(--veryLightGray';
                ele.parentElement.children[1].style.textDecoration = 'none';
                dataObj.notes.forEach((element, Index) => {
                    if (index == Index) {
                        element[1] = 1;
                        element[2] = 0;
                    }
                });
            }
            setToLocalStorage(dataObj);
            updateLeftNotes();

        });
    });
}


function addEventListenerToDeleteBtn() {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((ele, index) => {
        ele.addEventListener('click', () => {
            dataObj.notes.splice(index, 1);
            setToLocalStorage(dataObj);
            ele.parentElement.remove();
            location.reload();

        });
    });
}

function addHoverEffectToNoteContainer() {
    const noteContainer = document.querySelectorAll('.noteContainer');
    noteContainer.forEach(ele => {
        ele.addEventListener('mouseover', () => {
            ele.children[2].style.display = 'inline';
        });
        ele.addEventListener('mouseleave', () => {
            ele.children[2].style.display = 'none';
        });
    });
}

function updateLeftNotes() {
    const leftNote = document.getElementById('itemsLeft');
    const noteArray = dataObj.notes;
    let count = 0;
    noteArray.forEach(ele => {
        if (ele[1] == 1) count++;
    });
    leftNote.innerText = `${count} items left`
}

function handleLinkColors(index) {
    const links = document.querySelectorAll('.link');
    links.forEach((ele, Index) => {
        if (Index !== index) links[Index].style.color = 'var(--veryDarkGrayishBlue1)';
    });
}

function handleMode() {
    const dayBtn = document.getElementById('lightBtn');
    const nightBtn = document.getElementById('darkBtn');
    const imgDiv = document.getElementById('imgDiv');
    const inputDiv = document.getElementById('inputDiv');
    const noteContainer = document.querySelectorAll('.noteContainer');
    const inputTag = document.getElementById('inputNote');
    const optionContainer = document.getElementById('optionContainer');

    dayBtn.addEventListener('click', () => {
        mode = 'light';
        dayBtn.style.display = 'none';
        darkBtn.style.display = 'inline';
        imgDiv.style.background = `url('./images/bg-desktop-light.jpg') no-repeat center center/cover`;
        document.body.style.backgroundColor = 'var(--veryLightGray)';
        document.body.style.color = 'var(--veryDarkGrayishBlue)';
        inputDiv.style.backgroundColor = 'var(--veryLightGray)';
        inputTag.style.color = 'var(--veryDarkGrayishBlue)';
        optionContainer.style.backgroundColor = 'var(--veryLightGray)';
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryLightGray)';
        });
    });

    nightBtn.addEventListener('click', () => {
        mode = 'dark';
        dayBtn.style.display = 'inline';
        darkBtn.style.display = 'none';
        imgDiv.style.background = `url('./images/bg-desktop-dark.jpg') no-repeat center center/cover`;
        document.body.style.backgroundColor = 'var(--veryDarkBlue)';
        document.body.style.color = 'var(--veryLightGray)';
        inputDiv.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        inputTag.style.color = 'var(--veryLightGray)';
        optionContainer.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        });
    });
}

// function handleHover() {
//     const links = document.querySelectorAll('.link');
//     links.forEach(ele => {
//         ele.addEventListener('mouseover', ()=>{
//             if(mode == 'light') ele.style.color = 'var(--veryDarkGrayishBlue)';
            
//             else ele.style.color = 'var(--veryLightGray)';
//         });
//         ele.addEventListener('mouseleave', ()=>{
//             ele.style.color = 'var(--veryDarkGrayishBlue1)'
//         });
//     });

// }


showAllNotes();
addingInputEventHandler();