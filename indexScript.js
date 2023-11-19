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
    const cellSize = `${80 / (laenge+1)}vw`;

    for (let i = 0; i < hoehe; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        addLamp(row, i, cellSize)

        for (let j = 0; j < laenge; j++) {
            addCell(row, i, j, cellSize)
        }
        playground.appendChild(row);
    }
}

function addCell(row, rowId, cellId, cellSize) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${rowId}-${cellId}`; // Unique ID based on position
    cell.style.width = cellSize;
    cell.style.height = cellSize;
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
    lamp.style.width = lamp.style.height = cellSize
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
    if (selected == null) {
        return;
    }
    const cell = event.target;
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);
    if (event.target.id.split("-")[2] === hoehe - 1) {
        return;
    }
    if (cell.innerHTML !== "X" || cellBelow.innerHTML !== "X") {
        return;
    }
    cell.style.backgroundColor = "lightgreen";
    cellBelow.style.backgroundColor = "lightgreen";
}

function handleCellMouseOut(event) {
    const cell = event.target;
    cell.style.backgroundColor = "";
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);
    if (cellBelow) {
        cellBelow.style.backgroundColor = "";
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);

    if (event.target.id.split("-")[2] == hoehe - 1) {
        return;
    }
    if (cell.innerHTML !== "X" || cellBelow.innerHTML !== "X") {
        return;
    }

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
    const lampenWerte = new Array(laenge+1);
    lampenWerte[0] = new Array(hoehe);
    for (let i = 0; i < hoehe; i++) {
        lampenWerte[0][i] = document.getElementById(`lamp-${i}`).classList.contains("on");
    }
    const bigArray = new Array(laenge);
    for (let i = 0; i < laenge; i++) {
        bigArray[i] = new Array(hoehe);
        for (let j = 0; j < hoehe; j++) {
            if (document.getElementById(`cell-${i}-${j}`).innerHTML === "B") {
                bigArray[i][j] = BausteinSegmentEnum.B;
            } else if (document.getElementById(`cell-${i}-${j}`).innerHTML === "W") {
                bigArray[i][j] = BausteinSegmentEnum.W;
            } else if (document.getElementById(`cell-${i}-${j}`).innerHTML === "r") {
                bigArray[i][j] = BausteinSegmentEnum.r;
            } else if (document.getElementById(`cell-${i}-${j}`).innerHTML === "R") {
                bigArray[i][j] = BausteinSegmentEnum.R;
            } else if (document.getElementById(`cell-${i}-${j}`).innerHTML === "X") {
                bigArray[i][j] = BausteinSegmentEnum.X;
            }
        }
    }
    for (let i = 1; i < lampenWerte.length; i++) {
        let output = new Spalte(hoehe, bigArray[i - 1]);
        lampenWerte[i] = output.apply(lampenWerte[i - 1]);
    }
    for (let i = 1; i < laenge; i++) {
        for (let j = 0; j < hoehe; j++) {
            const cell = document.getElementById(`cell-${i-1}-${j}`)
            if (lampenWerte[i][j] == true) {
                cell.style.border = "3px solid yellow";
            } if (lampenWerte[i][j] != true) {
                cell.style.border = "1px solid black"
            }
            const nextCell = document.getElementById(`cell-${i}-${j}`)
            if (lampenWerte[i][j] == true && nextCell.innerHTML == "X") {
                nextCell.style.backgroundImage = "url('image/licht.jpg')";
            } else if (lampenWerte[i][j] != true && nextCell.innerHTML == "X") {
                nextCell.style.backgroundImage = "";
            }
        }
    }
}


