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
    handleLinkColors(0);
    const links = document.querySelectorAll('.notesLink');
    links.forEach(ele => {
        ele.classList.remove('active');
    });
    links[0].classList.add('active');
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
    const noteContainer = document.querySelectorAll('.noteContainer');
    if (mode == 'light') {
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryLightGray)';
        });
    }
    else {
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        });
    }
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
        const links = document.querySelectorAll('.notesLink');
        links.forEach(ele => {
            ele.classList.remove('active');
        });
        links[1].classList.add('active');
        notesContainer.innerHTML = '';
        activeNote.style.color = 'var(--brightBlue)';
        handleLinkColors(1);
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
            const noteContainer = document.querySelectorAll('.noteContainer');
            if (mode == 'light') {
                noteContainer.forEach(ele => {
                    ele.style.backgroundColor = 'var(--veryLightGray)';
                });
            }
            else {
                noteContainer.forEach(ele => {
                    ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
                });
            }
        });
    });

}

function showCompletedNotes() {
    const completedNote = document.getElementById('completed');
    const notesContainer = document.getElementById('notesContainer');

    completedNote.addEventListener('click', () => {
        const links = document.querySelectorAll('.notesLink');
        links.forEach(ele => {
            ele.classList.remove('active');
        });
        links[2].classList.add('active');
        notesContainer.innerHTML = ``;
        completedNote.style.color = 'var(--brightBlue)';
        handleLinkColors(2);
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
        if (mode == 'light') {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryLightGray)';
            });
        }
        else {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
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
        const noteContainer = document.querySelectorAll('.noteContainer');
        if (mode == 'light') {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryLightGray)';
            });
        }
        else {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
            });
        }


    });
}


function addingInputEventHandler() {
    const inputTag = document.getElementById('inputNote');
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
            `;
        const noteContainer = document.querySelectorAll('.noteContainer');
        if (mode == 'light') {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryLightGray)';
            });
        }
        else {
            noteContainer.forEach(ele => {
                ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
            });
        }
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
                ele.parentElement.children[1].style.textDecoration = 'none';
                if (mode == 'dark') ele.parentElement.children[1].style.color = 'var(--veryLightGray)';
                else ele.parentElement.children[1].style.color = 'var(--veryDarkBlue)';
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
    const links = document.querySelectorAll('.notesLink');
    links.forEach((ele, Index) => {
        if (Index !== index) links[Index].style.color = 'var(--veryDarkGrayishBlue1)';
    });
}

function handleMode() {
    const dayBtn = document.getElementById('lightBtn');
    const nightBtn = document.getElementById('darkBtn');
    const imgDiv = document.getElementById('imgDiv');
    const inputDiv = document.getElementById('inputDiv');
    const inputTag = document.getElementById('inputNote');
    const optionContainer = document.getElementById('optionContainer');
    const optionContainerSeparate = document.getElementById('optionContainerSeparate');

    dayBtn.addEventListener('click', () => {
        mode = 'light';
        const noteContainer = document.querySelectorAll('.noteContainer');
        dayBtn.style.display = 'none';
        darkBtn.style.display = 'inline';
        imgDiv.style.background = `url('./images/bg-desktop-light.jpg') no-repeat center center/cover`;
        document.body.style.backgroundColor = 'var(--veryLightGray)';
        document.body.style.color = 'var(--veryDarkDesaturatedBlue)';
        inputDiv.style.backgroundColor = 'var(--veryLightGray)';
        inputTag.style.color = 'var(--veryDarkDesaturatedBlue)';
        optionContainer.style.backgroundColor = 'var(--veryLightGray)';
        optionContainerSeparate.style.backgroundColor = 'var(--veryLightGray)';
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryLightGray)';
        });
    });

    nightBtn.addEventListener('click', () => {
        const noteContainer = document.querySelectorAll('.noteContainer');
        mode = 'dark';
        dayBtn.style.display = 'inline';
        darkBtn.style.display = 'none';
        imgDiv.style.background = `url('./images/bg-desktop-dark.jpg') no-repeat center center/cover`;
        document.body.style.backgroundColor = 'var(--veryDarkBlue)';
        document.body.style.color = 'var(--veryLightGray)';
        inputDiv.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        inputTag.style.color = 'var(--veryLightGray)';
        optionContainer.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        optionContainerSeparate.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        noteContainer.forEach(ele => {
            ele.style.backgroundColor = 'var(--veryDarkDesaturatedBlue)';
        });
    });
}

function handleHover() {
    const links = document.querySelectorAll('.notesLink');
    links.forEach(ele => {
        ele.addEventListener('mouseover', () => {
            if (mode == 'light' && !ele.classList.contains('active')) {
                ele.style.color = 'var(--veryDarkDesaturatedBlue)';
            }

            else if (mode == 'dark' && !ele.classList.contains('active')) {
                ele.style.color = 'var(--veryLightGray)';
            }
        });
        ele.addEventListener('mouseleave', () => {
            if (!ele.classList.contains('active')) ele.style.color = 'var(--veryDarkGrayishBlue1)';
        });
    });

}

const mediaWidth1 = window.matchMedia("(max-width: 1000px)");
const mediaWidth2 = window.matchMedia("(min-width: 1001px)");
function makeSeparateOptionContainer() {
    const separateOptionContainer = document.getElementById('optionContainerSeparate');
    const optionContainer = document.getElementById('optionContainer');
    const linkContainer = document.getElementById('linkContainer');
    const dayBtn = document.getElementById('lightBtn');
    const nightBtn = document.getElementById('darkBtn');
    const imgDiv = document.getElementById('imgDiv');
    if (mediaWidth1.matches) {
        separateOptionContainer.appendChild(optionContainer.removeChild(linkContainer));
        if (mode == 'light') {
            imgDiv.style.background = `url('./images/bg-mobile-light.jpg') no-repeat center center/cover`;
        }
        else {
            imgDiv.style.background = `url('./images/bg-mobile-dark.jpg') no-repeat center center/cover`;
        }
        dayBtn.addEventListener('click', () => {
            mode = 'light';
            imgDiv.style.background = `url('./images/bg-mobile-light.jpg') no-repeat center center/cover`;

        });
        nightBtn.addEventListener('click', () => {
            mode = 'dark';
            imgDiv.style.background = `url('./images/bg-mobile-dark.jpg') no-repeat center center/cover`;

        });

    }
}

function makeOneOptionContainer() {
    const optionContainer = document.getElementById('optionContainer');
    const linkContainer = document.getElementById('linkContainer');
    const clearCompleted = document.getElementById('clearCompleted');
    const dayBtn = document.getElementById('lightBtn');
    const nightBtn = document.getElementById('darkBtn');
    const imgDiv = document.getElementById('imgDiv');

    if (mediaWidth2.matches) {
        optionContainer.insertBefore(linkContainer, clearCompleted);
        if (mode == 'light') {
            imgDiv.style.background = `url('./images/bg-desktop-light.jpg') no-repeat center center/cover`;
        }
        else {
            imgDiv.style.background = `url('./images/bg-desktop-dark.jpg') no-repeat center center/cover`;
        }
        dayBtn.addEventListener('click', () => {
            mode = 'light';
            imgDiv.style.background = `url('./images/bg-desktop-light.jpg') no-repeat center center/cover`;

        });
        nightBtn.addEventListener('click', () => {
            mode = 'dark';
            imgDiv.style.background = `url('./images/bg-desktop-dark.jpg') no-repeat center center/cover`;

        });
    }
}

mediaWidth1.addListener(makeSeparateOptionContainer);
mediaWidth2.addListener(makeOneOptionContainer);

showAllNotes();
addingInputEventHandler();
makeSeparateOptionContainer();
makeOneOptionContainer();