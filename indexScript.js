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
    playground.innerHTML = "";
    const cellSize = `${90 / (laenge+1)}vw`;

    for (let i = 0; i < hoehe; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = -1; j < laenge; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${j}-${i}`; // Unique ID based on position
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cell.innerHTML = "X"
            cell.style.color = "rgba(222, 222, 222, 0.1)";
            cell.addEventListener("mouseover", handleCellHover);
            cell.addEventListener("mouseout", handleCellMouseOut);
            cell.addEventListener("click", handleCellClick);
            row.appendChild(cell);
            if (j === -1) {
                cell.innerHTML = "aus";
                cell.style.color = "rgba(222, 222, 222, 0.1)";
                cell.id = `cell-Lamp-${i}`;
                cell.style.backgroundImage = "url('image/lampeAus.jpg')";
                cell.removeEventListener("mouseover", handleCellHover);
                cell.removeEventListener("mouseout", handleCellMouseOut);
                cell.removeEventListener("click", handleCellClick);
                cell.addEventListener("click", () => {
                    if (cell.innerHTML === "an") {
                        cell.innerHTML = "aus";
                        cell.style.backgroundImage = "url('image/lampeAus.jpg')";
                        calculateLight();
                    } else {
                        cell.innerHTML = "an";
                        cell.style.backgroundImage = "url('image/lampeAn.jpg')";
                        calculateLight();
                    }
                });
            }
        }
        playground.appendChild(row);
    }
    calculateLight();
}

function handleCellHover(event) {
    const cell = event.target;
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);
    if (selBlockBB == false && selBlockWW == false && selBlock_rR == false && selBlockRr == false) {
        return;
    }
    if (event.target.id.split("-")[2] == hoehe - 1) {
        return;
    }
    if (cell.innerHTML != "X" || cellBelow.innerHTML != "X") {
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
        lampenWerte[0][i] = document.getElementById(`cell-Lamp-${i}`).innerHTML === "an";
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


