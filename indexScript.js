const inputLaenge = document.getElementById("laenge");
const inputHoehe = document.getElementById("hoehe");
const createButton = document.getElementById("button");
const blauBB = document.getElementById("blauBB");
const weissWW = document.getElementById("weissWW");
const rot_rR = document.getElementById("rot_rR");
const rotRr = document.getElementById("rotRr");
let laenge;
let hoehe;
let selected;

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

setInputFilter(inputLaenge, function (value) {
    return /^\d*$/.test(value) && parseInt(value) > 0
}, "Muss eine Positive Zahl sein")
setInputFilter(inputHoehe, function (value) {
    return /^\d*$/.test(value) && parseInt(value) > 0
}, "Muss eine Positive Zahl sein")

createButton.addEventListener("click", () => {
    laenge = parseInt(inputLaenge.value);
    hoehe = parseInt(inputHoehe.value);
    console.log("Länge: " + laenge + ", Höhe: " + hoehe)
    createPlayground();
});

function makeBorderGreen(block) {
    blauBB.style.border = "1px solid black";
    weissWW.style.border = "1px solid black";
    rot_rR.style.border = "1px solid black";
    rotRr.style.border = "1px solid black";
    block.style.border = "3px solid lightgreen";
}

blauBB.addEventListener("click", selectEvent);
weissWW.addEventListener("click", selectEvent);
rot_rR.addEventListener("click", selectEvent);
rotRr.addEventListener("click", selectEvent);

function selectEvent(event) {
    select(event.target)
}

function select(blockType) {
    selected = blockType
    makeBorderGreen(selected)
}

function createPlayground() {
    const playground = document.getElementById("playground");
    playground.innerHTML = "";
    const cellSize = `min(${80 / (laenge + 1)}vw, ${50 / hoehe}vh)`;

    for (let rowIndex = 0; rowIndex < hoehe; rowIndex++) {
        const row = document.createElement("div");
        row.classList.add("row");

        addLamp(row, rowIndex, cellSize)

        for (let columnIndex = 0; columnIndex < laenge; columnIndex++) {
            addCell(row, rowIndex, columnIndex, cellSize)
        }
        playground.appendChild(row);
    }
}

function addCell(row, rowId, cellId, cellSize) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${cellId}-${rowId}`; // Unique ID based on position
    cell.style.width = cellSize
    cell.style.height = cellSize
    cell.innerHTML = "X"
    cell.style.color = "rgba(115, 115, 115, 0.1)";
    cell.draggable = false
    // Add event listeners for mouseover and mouseout events
    cell.addEventListener("mouseover", handleCellHover);
    cell.addEventListener("mouseout", handleCellMouseOut);
    cell.addEventListener("click", handleCellClick);
    row.appendChild(cell);
}

function addLamp(row, id, cellSize) {
    const lamp = document.createElement("div");
    lamp.classList.add("lamp", "cell", "off");
    lamp.id = `lamp-${id}`;
    lamp.style.width = cellSize
    lamp.style.height = cellSize
    lamp.addEventListener("click", lampClick)
    row.appendChild(lamp)
}

function lampClick(event) {
    const lamp = event.target
    lampToggle(lamp)
}

function lampToggle(lamp) {
    if (lamp.classList.contains("on")) lampOff(lamp)
    else lampOn(lamp)
}

function lampOff(lamp) {
    lamp.classList.add("off");
    lamp.classList.remove("on");
    calculateLight()
}

function lampOn(lamp) {
    lamp.classList.add("on")
    lamp.classList.remove("off")
    calculateLight()
}

function handleCellHover(event) {
    const cell = event.target;
    if (cell.innerHTML !== "X") {
        const find = findCombined(cell)
        find.top.style.borderColor = "lightgreen"
        find.bottom.style.borderColor = "lightgreen"
        return;
    }
    if (selected == null) {
        return;
    }
    if (!isValid(cell)) return;
    const cellBelow = findCellBelow(cell)
    cell.style.backgroundColor = "lightgreen";
    cellBelow.style.backgroundColor = "lightgreen";
}

function handleCellMouseOut(event) {
    const cell = event.target;
    cell.style.backgroundColor = "";
    const cellBelow = findCellBelow(cell)
    if (cellBelow) {
        cellBelow.style.backgroundColor = "";
    }
    if (cell.style.borderColor === "lightgreen") {
        calculateLight()
    }
}

function findCellBelow(cell) {
    const pos = position(cell)
    return document.getElementById(`cell-${pos.col}-${pos.row + 1}`);
}

function position(cell) {
    const [colIndex, rowIndex] = cell.id.split("-").slice(1).map(Number);
    return {row: rowIndex, col: colIndex}
}

function isValid(cell) {
    const cellBelow = findCellBelow(cell)
    const pos = position(cell)
    if (pos.row === hoehe - 1) {
        return false;
    }
    return !(cell.innerHTML !== "X" || cellBelow.innerHTML !== "X");
}

function deleteBlock(cell) {
    const find = findCombined(cell)
    find.top.innerHTML = "X"
    find.bottom.innerHTML = "X"
    find.top.style.backgroundImage = ""
    find.bottom.style.backgroundImage = ""
    calculateLight()
}

function findCombined(cell) {
    const pos = position(cell)
    let row
    let rowCell
    for (row = 0; row <= pos.row; row++) {
        rowCell = document.getElementById(`cell-${pos.col}-${row}`)
        if (rowCell.innerHTML !== "X") row++;
    }
    const below = findCellBelow(rowCell)
    return {top: rowCell, bottom: below}
}

function handleCellClick(event) {
    const cell = event.target;

    if (cell.innerHTML !== "X") {
        deleteBlock(cell)
        return;
    }

    if (!isValid(cell)) return;
    const cellBelow = findCellBelow(cell)

    if (selected === blauBB) {
        cell.innerHTML = "B";
        cellBelow.innerHTML = "B";
        cell.style.backgroundImage = "url('image/blauB.jpg')";
        cellBelow.style.backgroundImage = "url('image/blauB.jpg')";
    } else if (selected === weissWW) {
        cell.innerHTML = "W";
        cellBelow.innerHTML = "W";
        cell.style.backgroundImage = "url('image/weissW.jpg')";
        cellBelow.style.backgroundImage = "url('image/weissW.jpg')";
    } else if (selected === rot_rR) {
        cell.innerHTML = "r";
        cellBelow.innerHTML = "R";
        cell.style.backgroundImage = "url('image/rot_r.jpg')";
        cellBelow.style.backgroundImage = "url('image/rotR.jpg')";
    } else if (selected === rotRr) {
        cell.innerHTML = "R";
        cellBelow.innerHTML = "r";
        cell.style.backgroundImage = "url('image/rotR.jpg')";
        cellBelow.style.backgroundImage = "url('image/rot_r.jpg')";
    } else {
        return;
    }

    cell.draggable = true;
    cellBelow.draggable = true;
    cell.style.color = "rgba(222, 222, 222, 0.1)";
    cellBelow.style.color = "rgba(222, 222, 222, 0.1)";
    calculateLight()
}

const clear = document.getElementById("clear");

clear.addEventListener("click", () => {
    if (confirm("Willst du wirklich alles löschen?") === true) {
        createPlayground();
    }
});

function calculateLight() {
    const lampenWerte = new Array(laenge + 1);
    lampenWerte[0] = new Array(hoehe);
    for (let i = 0; i < hoehe; i++) {
        lampenWerte[0][i] = document.getElementById(`lamp-${i}`).classList.contains("on");
    }
    const bigArray = new Array(laenge);
    for (let col = 0; col < laenge; col++) {
        bigArray[col] = new Array(hoehe);
        for (let row = 0; row < hoehe; row++) {
            if (document.getElementById(`cell-${col}-${row}`).innerHTML === "B") {
                bigArray[col][row] = BausteinSegmentEnum.B;
            } else if (document.getElementById(`cell-${col}-${row}`).innerHTML === "W") {
                bigArray[col][row] = BausteinSegmentEnum.W;
            } else if (document.getElementById(`cell-${col}-${row}`).innerHTML === "r") {
                bigArray[col][row] = BausteinSegmentEnum.r;
            } else if (document.getElementById(`cell-${col}-${row}`).innerHTML === "R") {
                bigArray[col][row] = BausteinSegmentEnum.R;
            } else if (document.getElementById(`cell-${col}-${row}`).innerHTML === "X") {
                bigArray[col][row] = BausteinSegmentEnum.X;
            }
        }
    }
    for (let i = 1; i < lampenWerte.length; i++) {
        let output = new Spalte(hoehe, bigArray[i - 1]);
        lampenWerte[i] = output.apply(lampenWerte[i - 1]);
    }
    for (let i = 1; i < laenge; i++) {
        for (let j = 0; j < hoehe; j++) {
            const cell = document.getElementById(`cell-${i - 1}-${j}`)
            if (lampenWerte[i][j] === true) {
                cell.style.border = "3px solid yellow";
            }
            if (lampenWerte[i][j] !== true) {
                cell.style.border = "1px solid black"
            }
            const nextCell = document.getElementById(`cell-${i}-${j}`)
            if (lampenWerte[i][j] === true && nextCell.innerHTML === "X") {
                nextCell.style.backgroundImage = "url('image/licht.jpg')";
            } else if (lampenWerte[i][j] !== true && nextCell.innerHTML === "X") {
                nextCell.style.backgroundImage = "";
            }
        }
    }
}


