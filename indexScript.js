// indexScript.js

const inputLaenge = document.getElementById("laenge");
const inputHoehe = document.getElementById("hoehe");
const createButton = document.getElementById("button");
const blauBB = document.getElementById("blauBB");
const weissWW = document.getElementById("weissWW");
const rot_rR = document.getElementById("rot_rR");
const rotRr = document.getElementById("rotRr");
let laenge
let hoehe;

createButton.addEventListener("click", () => {
    laenge = parseInt(inputLaenge.value);
    hoehe = parseInt(inputHoehe.value);
    console.log("Länge: " + laenge + ", Höhe: " + hoehe)
    createPlayground();
});

let selBlockBB = false;
let selBlockWW = false;
let selBlock_rR = false;
let selBlockRr = false;

function makeBorderGreen(block) {
    blauBB.style.border = "1px solid black";
    weissWW.style.border = "1px solid black";
    rot_rR.style.border = "1px solid black";
    rotRr.style.border = "1px solid black";
    block.style.border = "3px solid lightgreen";
}

blauBB.addEventListener("click", () => {
    selBlockBB = true;
    selBlockWW = false;
    selBlock_rR = false;
    selBlockRr = false;
    makeBorderGreen(blauBB);
});

weissWW.addEventListener("click", () => {
    selBlockBB = false;
    selBlockWW = true;
    selBlock_rR = false;
    selBlockRr = false;
    makeBorderGreen(weissWW);
});

rot_rR.addEventListener("click", () => {
    selBlockBB = false;
    selBlockWW = false;
    selBlock_rR = true;
    selBlockRr = false;
    makeBorderGreen(rot_rR);
});

rotRr.addEventListener("click", () => {
    selBlockBB = false;
    selBlockWW = false;
    selBlock_rR = false;
    selBlockRr = true;
    makeBorderGreen(rotRr);
});

function createPlayground() {
    const playground = document.getElementById("playground");
    playground.innerHTML = ""; // Clear previous content

    const cellSize = `${80 / (laenge + 1)}vw`;


    for (let i = 0; i < hoehe; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = -1; j < laenge; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${i}-${j}`; // Unique ID based on position
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cell.innerHTML = "X"
            cell.style.color = "rgba(115, 115, 115, 0.1)";
            // Add event listeners for mouseover and mouseout events
            cell.addEventListener("mouseover", handleCellHover);
            cell.addEventListener("mouseout", handleCellMouseOut);
            cell.addEventListener("click", handleCellClick);
            row.appendChild(cell);
            // set first column to Lamps
            if (j === -1) {
                cell.innerHTML = "aus";
                cell.style.color = "rgba(15, 15, 15, 0.2)";
                cell.id = `cell-${i}-Lamp`;
                cell.style.backgroundImage = "url('image/lampeAus.jpg')";
                cell.removeEventListener("mouseover", handleCellHover);
                cell.removeEventListener("mouseout", handleCellMouseOut);
                cell.removeEventListener("click", handleCellClick);
                cell.addEventListener("click", () => {
                    if (cell.innerHTML === "an") {
                        cell.innerHTML = "aus";
                        cell.style.backgroundImage = "url('image/lampeAus.jpg')";
                    } else {
                        cell.innerHTML = "an";
                        cell.style.backgroundImage = "url('image/lampeAn.jpg')";
                    }
                    calculateLight()
                });
            }
        }
        playground.appendChild(row);
    }
}

function handleCellHover(event) {
    if (selBlockBB === false && selBlockWW === false && selBlock_rR === false && selBlockRr === false) {
        return;
    }
    if (event.target.id.split("-")[1] === hoehe - 1) {
        return;
    }

    const hoveredCell = event.target;
    const [rowIndex, colIndex] = hoveredCell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex + 1}-${colIndex}`);

    if (hoveredCell.innerHTML !== "X" || cellBelow.innerHTML !== "X") {
        return;
    }
    hoveredCell.style.backgroundColor = "lightgreen";
    cellBelow.style.backgroundColor = "lightgreen";
}

function handleCellMouseOut(event) {
    const cell = event.target;
    cell.style.backgroundColor = ""; // Reset background color on mouseout

    // Get the row and column indices from the cell's ID
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);

    // Get the cell below the current cell
    const cellBelow = document.getElementById(`cell-${rowIndex + 1}-${colIndex}`);

    if (cellBelow) {
        cellBelow.style.backgroundColor = ""; // Reset background color on mouseout
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex + 1}-${colIndex}`);

    // if cell is on the bottom row, alert the user, that he can't click on it
    if (event.target.id.split("-")[1] === hoehe - 1) {
        return;
    }
    if (cell.innerHTML !== "X" || cellBelow.innerHTML !== "X") {
        return;
    }

    if (selBlockBB === true) {
        cell.innerHTML = "B";
        cellBelow.innerHTML = "B";
        cell.style.backgroundImage = "url('image/blauB.jpg')";
        cellBelow.style.backgroundImage = "url('image/blauB.jpg')";
    } else if (selBlockWW === true) {
        cell.innerHTML = "W";
        cellBelow.innerHTML = "W";
        cell.style.backgroundImage = "url('image/weissW.jpg')";
        cellBelow.style.backgroundImage = "url('image/weissW.jpg')";
    } else if (selBlock_rR === true) {
        cell.innerHTML = "r";
        cellBelow.innerHTML = "R";
        cell.style.backgroundImage = "url('image/rot_r.jpg')";
        cellBelow.style.backgroundImage = "url('image/rotR.jpg')";
    } else if (selBlockRr === true) {
        cell.innerHTML = "R";
        cellBelow.innerHTML = "r";
        cell.style.backgroundImage = "url('image/rotR.jpg')";
        cellBelow.style.backgroundImage = "url('image/rot_r.jpg')";
    } else {
        return;
    }

    cellBelow.style.color = "rgba(15, 15, 15, 0.2)";
    cell.style.color = "rgba(15, 15, 15, 0.2)";
    calculateLight()
}


const clear = document.getElementById("delete");

clear.addEventListener("click", () => {
    if (confirm("Willst du wirklich alles löschen?") === true) {
        createPlayground();
    }
});

function calculateLight() {
    const lampenWerte = new Array(laenge);
    lampenWerte[0] = new Array(hoehe);
    for (let i = 0; i < hoehe; i++) {
        lampenWerte[0][i] = document.getElementById(`cell-${i}-Lamp`).innerHTML === "an";
    }
    const bigArray = new Array(laenge);
    for (let i = 0; i < laenge; i++) {
        bigArray[i] = new Array(hoehe);
        for (let j = 0; j < hoehe; j++) {
            // bigArray[i][j] = document.getElementById(`cell-${j}-${i}`).innerHTML;
            if (document.getElementById(`cell-${j}-${i}`).innerHTML === "B") {
                bigArray[i][j] = BausteinSegmentEnum.B;
            } else if (document.getElementById(`cell-${j}-${i}`).innerHTML === "W") {
                bigArray[i][j] = BausteinSegmentEnum.W;
            } else if (document.getElementById(`cell-${j}-${i}`).innerHTML === "r") {
                bigArray[i][j] = BausteinSegmentEnum.r;
            } else if (document.getElementById(`cell-${j}-${i}`).innerHTML === "R") {
                bigArray[i][j] = BausteinSegmentEnum.R;
            } else if (document.getElementById(`cell-${j}-${i}`).innerHTML === "X") {
                bigArray[i][j] = BausteinSegmentEnum.X;
            }
        }
    }
    for (let i = 1; i < lampenWerte.length; i++) {
        let hehe = new Spalte(hoehe, bigArray[i - 1]);
        lampenWerte[i] = hehe.apply(lampenWerte[i - 1]);
    }
    for (let i = 1; i < laenge; i++) {
        for (let j = 0; j < hoehe; j++) {
            const element = document.getElementById(`cell-${j}-${i - 1}`)
            if (lampenWerte[i][j] === true) {
                //make cell border yellow
                element.style.border = "3px solid yellow";
            } else {
                element.style.border = "1px solid black"
            }
        }
    }
}


