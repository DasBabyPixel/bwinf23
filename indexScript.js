// Diese Variablen werden erstellt und mit den entsprechenden HTML-Elementen verknüpft.
const inputLaenge = document.getElementById("laenge"); // Variable für die Eingabe der Länge des Spielfelds
const inputHoehe = document.getElementById("hoehe"); // Variable für die Eingabe der Höhe des Spielfelds
const createButton = document.getElementById("button"); // Variable für den "Erstelle das Spielfeld" Button
const blauBB = document.getElementById("blauBB"); // Variable für den blauen Baustein
const weissWW = document.getElementById("weissWW"); // Variable für den weißen Baustein
const rot_rR = document.getElementById("rot_rR"); // Variable für den 1. roten Baustein
const rotRr = document.getElementById("rotRr"); // Variable für den 2. roten Baustein
let laenge; // Variable für die Länge des Spielfelds
let hoehe;  // Variable für die Höhe des Spielfelds

// Event-Listener für den "Erstelle das Spielfeld" Button
createButton.addEventListener("click", () => {
    // Die eingegebenen Werte für Länge und Höhe werden in Ganzzahlen umgewandelt.
    laenge = parseInt(inputLaenge.value);
    hoehe = parseInt(inputHoehe.value);
    // Die Funktion zum Erstellen des Spielfelds wird aufgerufen.
    createPlayground();
});

// Flags für die Bausteine, um zu wissen, welcher Baustein ausgewählt ist
let selBlockBB = false;
let selBlockWW = false;
let selBlock_rR = false;
let selBlockRr = false;

// Funktion, um den ausgewählten Baustein visuell mit einer grünen Umrahmung hervorzuheben
function makeBorderGreen(block) {
    blauBB.style.border = "1px solid black";
    weissWW.style.border = "1px solid black";
    rot_rR.style.border = "1px solid black";
    rotRr.style.border = "1px solid black";
    block.style.border = "3px solid lightgreen";
}

// Event-Listener für die Bausteine, um die Flags zu setzen und die Funktion zum Hervorheben aufzurufen
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

// Funktion zum Erstellen des Spielfelds
function createPlayground() {
    // Zugriff auf das HTML-Element mit der ID "playground"
    const playground = document.getElementById("playground");
    // Das Spielfeld wird geleert
    playground.innerHTML = "";
    // Berechnung der Zellengröße basierend auf der Länge des Fensters
    const cellSize = `${90 / (laenge+1)}vw`;

    // Schleife für jede Zeile im Spielfeld (abhängig von der Höhe)
    for (let i = 0; i < hoehe; i++) {
        // Erstellen eines div-Elements für eine Zeile
        const row = document.createElement("div");
        row.classList.add("row");

        // Schleife für jede Zelle in der aktuellen Zeile (abhängig von der Länge)
        for (let j = -1; j < laenge; j++) {
            // Erstellen eines div-Elements für eine Zelle
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // Festlegen der eindeutigen ID jeder Zelle basierend auf ihrer Position
            cell.id = `cell-${j}-${i}`;
            cell.style.width = cellSize;
            cell.style.height = cellSize;
            cell.innerHTML = "X" // Standardmäßiger Inhalt jeder Zelle
            cell.style.color = "rgba(222, 222, 222, 0.1)"; // Text wird unsichtbar gemacht
            // Event-Listener für die Zellen, um die Funktionen zum Hervorheben und zum Setzen des Bausteins aufzurufen
            cell.addEventListener("mouseover", handleCellHover);
            cell.addEventListener("mouseout", handleCellMouseOut);
            cell.addEventListener("click", handleCellClick);
            // Hinzufügen der Zelle zur Zeile
            row.appendChild(cell);

            // Spezielle Behandlung für die erste Spalte (Lampen)
            if (j === -1) {
                cell.innerHTML = "aus"; // Standardtext für Lampen-Zellen
                cell.style.color = "rgba(222, 222, 222, 0.1)"; // Text wird unsichtbar gemacht
                cell.id = `cell-Lamp-${i}`; // Eindeutige ID für Lampen-Zellen
                cell.style.backgroundImage = "url('image/lampeAus.jpg')"; // Hintergrundbild
                // Alte Event-Listener werden entfernt
                cell.removeEventListener("mouseover", handleCellHover);
                cell.removeEventListener("mouseout", handleCellMouseOut);
                cell.removeEventListener("click", handleCellClick);
                // Neuer Event-Listener für Lampen-Zellen
                cell.addEventListener("click", () => {
                    // Funktion zum Ein- und Ausschalten der Lampe
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
        // Hinzufügen der aktuellen Zeile zum Spielfeld
        playground.appendChild(row);
    }
    // Die Funktion zum Berechnen des Licht-Wegs wird aufgerufen
    calculateLight();
}

// Variablen für die Hintergrundbilder der Zellen
let cellImageUrl;
let cellBelowImageUrl;

// Funktion für das Verhalten bei Hover-Ereignissen auf Zellen
function handleCellHover(event) {
    const cell = event.target; // Zugriff auf die Zelle, auf der das Ereignis ausgelöst wurde
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number); // Extrahieren der Zeilen- und Spalten-Indizes

    // Überprüfung, ob ein Baustein ausgewählt wurde und ob es die unterste Reihe betrifft    
    if (selBlockBB == false && selBlockWW == false && selBlock_rR == false && selBlockRr == false) {
        return; // Wenn kein Baustein ausgewählt wurde, wird die Funktion beendet, also passiert nichts
    }
    if (event.target.id.split("-")[2] == hoehe - 1) {
        return; // Wenn die unterste Reihe betroffen ist, wird die Funktion beendet, da dort keine Bausteine platziert werden können
    }
    if (cell.innerHTML != "X" || cellBelow.innerHTML != "X") {
        return; // Wenn die aktuelle Zelle oder die Zelle unter der aktuellen Zelle bereits einen Baustein enthalten, wird die Funktion beendet
    }
    
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`); // Zugriff auf die Zelle unter der aktuellen Zelle
    cellImageUrl = cell.style.backgroundImage; // Speichern des Hintergrundbilds der aktuellen Zelle
    cellBelowImageUrl = cellBelow.style.backgroundImage; // Speichern des Hintergrundbilds der Zelle unter der aktuellen Zelle

    // Die aktuelle Zelle und die Zelle unter der aktuellen Zelle grün hervorgehoben und das Hintergrundbild wird entfernt, damit die Hintegrundfarbe sichtbar wird
    cell.style.backgroundColor = "lightgreen";
    cell.style.backgroundImage = "";
    cellBelow.style.backgroundColor = "lightgreen";
    cellBelow.style.backgroundImage = "";

}

// Funktion für das Verhalten bei MouseOut-Ereignissen auf Zellen
function handleCellMouseOut(event) {
    const cell = event.target;
    // Die Hintergrundbilder werden wiederhergestellt und die Hintergrundfarbe wird entfernt
    cell.style.backgroundColor = "";
    cell.style.backgroundImage = cellImageUrl;
    cellImageUrl = "";
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);
    if (cellBelow) {
        cellBelow.style.backgroundColor = "";
        cellBelow.style.backgroundImage = cellBelowImageUrl;
        cellBelowImageUrl = "";
    }

}

// Funktion für das Verhalten bei Click-Ereignissen auf Zellen
function handleCellClick(event) {
    const cell = event.target;
    const [rowIndex, colIndex] = cell.id.split("-").slice(1).map(Number);
    // Überprüfung, ob es sich um die unterste Reihe handelt
    if (event.target.id.split("-")[2] == hoehe - 1) {
        return; // Wenn die unterste Reihe betroffen ist, wird die Funktion beendet, da dort keine Bausteine platziert werden können
    }
    // Überprüfung, ob die aktuelle Zelle und die Zelle unter der aktuellen Zelle leer sind
    if (cell.innerHTML !== "X" || cellBelow.innerHTML !== "X") {
        return; // Wenn die aktuelle Zelle oder die Zelle unter der aktuellen Zelle bereits einen Baustein enthalten, wird die Funktion beendet, da dort kein Baustein platziert werden kann
    }
    const cellBelow = document.getElementById(`cell-${rowIndex}-${colIndex + 1}`);
    // Die aktuelle Zelle und die Zelle unter der aktuellen Zelle werden mit dem ausgewählten Baustein befüllt, dabei werden auch die Hintergrundbilder gesetzt und die entsprechenden Buchstaben in die Zellen geschrieben
    if (selBlockBB == true) {
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
        return; // Wenn kein Baustein ausgewählt wurde, wird die Funktion beendet, also passiert nichts
    }
    // Speichern der Hintergrundbilder und Aktualisieren der Textfarbe
    cellImageUrl = cell.style.backgroundImage;
    cellBelowImageUrl = cellBelow.style.backgroundImage;
    cell.style.color = "rgba(222, 222, 222, 0.1)";
    cellBelow.style.color = "rgba(222, 222, 222, 0.1)";
    // Die Funktion zum Berechnen des Licht-Wegs wird aufgerufen
    calculateLight()
}

// Zugriff auf den "Setze das Spielfeld zurück" Button
const clear = document.getElementById("clear");

// Event-Listener für den Clear-Button, um das Spielfeld zu löschen
clear.addEventListener("click", () => {
    // Bestätigungsdialog vor dem Löschen des Spielfelds
    if (confirm("Willst du wirklich alles löschen?") === true) {
        createPlayground(); // Das Spielfeld wird neu erstellt
    }
});

// Funktion zum Berechnen des Licht-Wegs
function calculateLight() {
    // Erstellen und Initialisieren eines zweidimensionalen Arrays für die Lampenstatus in jeder Spalte, jedes Element ist wiedrum ein eigenes Array für die Lampenstatus in jeder Zeile
    const lampenWerte = new Array(laenge+1); // +1, da es eine zusaetzliche erste Spalte mit Lampen gibt
    // Die Lampenstatus in der ersten Spalte werden aus den HTML-Elementen ausgelesen und in das Array gespeichert
    lampenWerte[0] = new Array(hoehe);
    for (let i = 0; i < hoehe; i++) {
        lampenWerte[0][i] = document.getElementById(`cell-Lamp-${i}`).innerHTML === "an";
    }
    // Erstellen und Initialisieren eines zweidimensionalen Arrays für die Bausteinstatus in jeder Spalte, jedes Element ist wiedrum ein eigenes Array für die Bausteinstatus in jeder Zeile
    const bigArray = new Array(laenge);
    for (let i = 0; i < laenge; i++) { // Schleife für jede Spalte
        bigArray[i] = new Array(hoehe); // Erstellen eines Arrays für die aktuelle Spalte
        for (let j = 0; j < hoehe; j++) { // Schleife für jedes Feld in der aktuellen Spalte
            // Auslesen der Bausteinstatus aus den HTML-Elementen und Speichern in das Array
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
    // Das zweidimensionale Array für die Lampenstatus wird mit den entsprechenden Werten befüllt
    for (let i = 1; i < lampenWerte.length; i++) { // Schleife für jede Spalte, beginnend bei der zweiten Spalte, da die erste Spalte bereits befüllt ist
        let output = new Spalte(hoehe, bigArray[i - 1]); // Erstellen eines Objekts der Klasse Spalte mit den entsprechenden Parametern aus der anderen Script-Datei
        lampenWerte[i] = output.apply(lampenWerte[i - 1]); // Anwenden der Funktion apply aus der Klasse Spalte auf die aktuelle Spalte, sodass die Lampenstatus in der aktuellen Spalte berechnet werden und in das Array gespeichert werden
    }
    // Funktion zum Anzeigen der Lampenstatus
    for (let i = 1; i < laenge; i++) { // Schleife für jede Spalte, beginnend bei der zweiten Spalte, da in der ersten Spalte Lampen sind
        for (let j = 0; j < hoehe; j++) { // Schleife für jedes Feld in der aktuellen Spalte
            const cell = document.getElementById(`cell-${i-1}-${j}`) // Zugriff auf die Zelle in der aktuellen Spalte und der aktuellen Zeile, Indizes i wird um 1 verringert, da die erste Spalte, die Bausteine enthält, den Index 0 hat
            if (lampenWerte[i][j] == true) { // Wenn der Lampenstatus in der aktuellen Zelle true ist, wird die Zelle gelb umrandet
                cell.style.border = "3px solid yellow";
            } if (lampenWerte[i][j] != true) { // Wenn der Lampenstatus in der aktuellen Zelle false ist, wird die Zelle schwarz umrandet
                cell.style.border = "1px solid black"
            }
            const nextCell = document.getElementById(`cell-${i}-${j}`) // Zugriff auf die Zelle in der nächsten Spalte und der aktuellen Zeile
            if (lampenWerte[i][j] == true && nextCell.innerHTML == "X") { // Wenn der Lampenstatus in der aktuellen Zelle true ist und die Zelle in der nächsten Spalte leer ist, wird die Zelle in der nächsten Spalte mit einem Hintergrundbild eines austretenden Lichts befüllt
                nextCell.style.backgroundImage = "url('image/licht.jpg')";
            } else if (lampenWerte[i][j] != true && nextCell.innerHTML == "X") { // Wenn der Lampenstatus in der aktuellen Zelle false ist und die Zelle in der nächsten Spalte leer ist, wird das Hintergrundbild der Zelle in der nächsten Spalte entfernt
                nextCell.style.backgroundImage = "";
            }
        }
    }
}