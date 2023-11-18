// indexScript.js

const inputLaenge = document.getElementById("laenge");
const inputHoehe = document.getElementById("hoehe");
const button = document.getElementById("button");
const blauBB = document.getElementById("blauBB");
const weissWW = document.getElementById("weissWW");
const rot_rR = document.getElementById("rot_rR");
const rotRr = document.getElementById("rotRr");
let laenge;
let hoehe;

button.addEventListener("click", () => {
    laenge = inputLaenge.value;
    hoehe = inputHoehe.value;
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
    block.style.border = "2px solid green";
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




// indexScript.js

// ... (Your existing code)

function createPlayground() {
    const playground = document.getElementById("playground");
    playground.innerHTML = ""; // Clear previous content

    const cellSize = `calc(${Math.min(window.innerWidth, window.innerHeight) / laenge}px)`;

    for (let i = 0; i < hoehe; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < laenge; j++) {
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
            cell.addEventListener("click", handleCellClick)

            row.appendChild(cell);
        }

        playground.appendChild(row);
    }
}

function handleCellHover(event) {
    const hoveredCell = event.target;
    hoveredCell.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Darken the hovered cell

    // Get the row and column indices from the cell's ID
    const [rowIndex, colIndex] = hoveredCell.id.split("-").slice(1).map(Number);

    // Get the cell below the hovered cell
    const cellBelow = document.getElementById(`cell-${rowIndex + 1}-${colIndex}`);

    if (cellBelow) {
        cellBelow.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Darken the cell below
    }
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
    if (event.target.id.split("-")[1] == hoehe - 1) {
        alert("Du kannst hier nicht ein Baustein platzieren!");
        return;
    }
    if (selBlockBB == true) {
        cell.innerHTML = "B";
        cellBelow.innerHTML = "B";
        cell.style.backgroundImage = "url('image/blauB.jpg')";
        cellBelow.style.backgroundImage = "url('image/blauB.jpg')";
    }
    if (selBlockWW == true) {
        cell.innerHTML = "W";
        cellBelow.innerHTML = "W";
        cell.style.backgroundImage = "url('image/weissW.jpg')";
        cellBelow.style.backgroundImage = "url('image/weissW.jpg')";
    }
    if (selBlock_rR == true) {
        cell.innerHTML = "r";
        cellBelow.innerHTML = "R";
        cell.style.backgroundImage = "url('image/rot_r.jpg')";
        cellBelow.style.backgroundImage = "url('image/rotR.jpg')";
    }
    if (selBlockRr == true) {
        cell.innerHTML = "R";
        cellBelow.innerHTML = "r";
        cell.style.backgroundImage = "url('image/rotR.jpg')";
        cellBelow.style.backgroundImage = "url('image/rot_r.jpg')";
    } else {
        return;
    }

    cellBelow.style.color = "rgba(15, 15, 15, 0.2)";
    cell.style.color = "rgba(15, 15, 15, 0.2)";

}


// bewegen einzelne Bausteine