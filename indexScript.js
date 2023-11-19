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
let selected; // Variable für den ausgewählten Baustein

function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Der Wert ist gültig
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Der Wert wurde abgelehnt. Den letzten Wert wiederherstellen
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                // Der Wert wurde abgelehnt. Es gibt keinen wiederherstellbaren Wert
                this.value = "";
            }
        });
    });
}

// Filter um nur positive ganze Zahlen zuzulassen
setInputFilter(inputLaenge, function (value) {
    return /^\d*$/.test(value) && parseInt(value) > 0
}, "Muss eine Positive Zahl sein")
setInputFilter(inputHoehe, function (value) {
    return /^\d*$/.test(value) && parseInt(value) > 0
}, "Muss eine Positive Zahl sein")

// Event-Listener für den "Erstelle das Spielfeld" Button
createButton.addEventListener("click", () => {
    // Die eingegebenen Werte für Länge und Höhe werden in Ganzzahlen umgewandelt.
    laenge = parseInt(inputLaenge.value);
    hoehe = parseInt(inputHoehe.value);
    // Die Funktion zum Erstellen des Spielfelds wird aufgerufen.
    createPlayground();
});

// Funktion, um den ausgewählten Baustein visuell mit einer grünen Umrahmung hervorzuheben
function makeBorderGreen(block) {
    blauBB.style.border = "1px solid black";
    weissWW.style.border = "1px solid black";
    rot_rR.style.border = "1px solid black";
    rotRr.style.border = "1px solid black";
    block.style.border = "3px solid lightgreen";
}

// Event-Listener für die Bausteine, um die Flags zu setzen und die Funktion zum Hervorheben aufzurufen
blauBB.addEventListener("click", selectEvent);
weissWW.addEventListener("click", selectEvent);
rot_rR.addEventListener("click", selectEvent);
rotRr.addEventListener("click", selectEvent);

// Eine Funktion für den Klick-EventHandler
function selectEvent(event) {
    select(event.target)
}

// Funktion zum Auswählen eines Bausteins
function select(blockType) {
    selected = blockType
    makeBorderGreen(selected)
}

// Funktion zum Erstellen des Spielfelds
function createPlayground() {
    // Zugriff auf das HTML-Element mit der ID "playground"
    const playground = document.getElementById("playground");
    // Das Spielfeld wird geleert
    playground.innerHTML = "";
    // Berechnung der Zellengröße basierend auf der Länge des Fensters
    const cellSize = `min(${80 / (laenge + 1)}vw, ${50 / hoehe}vh)`;

    // Schleife für jede Zeile im Spielfeld (abhängig von der Höhe)
    for (let rowIndex = 0; rowIndex < hoehe; rowIndex++) {
        // Erstellen eines div-Elements für eine Zeile
        const row = document.createElement("div");
        row.classList.add("row");

        // Hinzufügen der Lampe am Anfang jeder Zeile
        addLamp(row, rowIndex, cellSize)

        // Schleife für jede Zelle in der aktuellen Zeile (abhängig von der Länge)
        for (let columnIndex = 0; columnIndex < laenge; columnIndex++) {
            // Hinzufügen aller Zellen in der Zeile
            addCell(row, rowIndex, columnIndex, cellSize)
        }
        // Hinzufügen der aktuellen Zeile zum Spielfeld
        playground.appendChild(row);
    }
    // Die Funktion zum Berechnen des Licht-Wegs wird aufgerufen
    calculateLight();
}

function addCell(row, rowId, cellId, cellSize) {
    // Erstellen eines div-Elements für eine Zelle
    const cell = document.createElement("div");
    cell.classList.add("cell");
    // Festlegen der eindeutigen ID jeder Zelle basierend auf ihrer Position
    cell.id = `cell-${cellId}-${rowId}`;
    cell.style.width = cellSize
    cell.style.height = cellSize
    cell.innerHTML = "X" // Standardmäßiger Inhalt jeder Zelle
    cell.style.color = "rgba(115, 115, 115, 0.1)";
    cell.draggable = false
    // Event-Listener für die Zellen, um die Funktionen zum Hervorheben und zum Setzen des Bausteins aufzurufen
    cell.addEventListener("mouseover", handleCellHover);
    cell.addEventListener("mouseout", handleCellMouseOut);
    cell.addEventListener("click", handleCellClick);
    // Hinzufügen der Zelle zur Zeile
    row.appendChild(cell);
}

function addLamp(row, id, cellSize) {
    const lamp = document.createElement("div");
    // Standardklassen für CSS der Lampen und "off" für Status der Lampe
    lamp.classList.add("lamp", "cell", "off");
    // Eindeutige ID für Lampen-Zellen
    lamp.id = `lamp-${id}`;
    lamp.style.width = cellSize
    lamp.style.height = cellSize
    // Event-Listener für Lampen-Zellen
    lamp.addEventListener("click", lampClick)
    row.appendChild(lamp)
}

// Funktion für das Klick-Event einer Lampe
function lampClick(event) {
    const lamp = event.target
    lampToggle(lamp) // An- bzw. Ausschalten der Lampe
}

function lampToggle(lamp) {
    if (lamp.classList.contains("on")) lampOff(lamp)
    else lampOn(lamp)
}

function lampOff(lamp) {
    lamp.classList.add("off");
    lamp.classList.remove("on");
    calculateLight() // Licht neuberechnen
}

function lampOn(lamp) {
    lamp.classList.add("on")
    lamp.classList.remove("off")
    calculateLight() // Licht neuberechnen
}

// Variablen für die Hintergrundbilder der Zellen
let cellImageUrl;
let cellBelowImageUrl;

// Funktion für das Verhalten bei Hover-Ereignissen auf Zellen
function handleCellHover(event) {
    const cell = event.target;  // Zugriff auf die Zelle, auf der das Ereignis ausgelöst wurde
    if (cell.innerHTML !== "X") { // Wenn die Zelle schon belegt ist, wollen wir den zu löschenden Baustein markieren
        const find = findCombined(cell) // Den zugehörigen zweiten Baustein für die Zelle finden
        // Baustein Markieren
        find.top.style.borderColor = "lightgreen"
        find.bottom.style.borderColor = "lightgreen"
        return;
    }
    if (selected == null) { // Kein Baustein ist ausgewählt. Es kann nichts platziert werden.
        return;
    }
    if (!isValid(cell)) return; // Der Baustein kann hier nicht platziert werden.
    const cellBelow = findCellBelow(cell) // Zugriff auf die Zelle unter der aktuellen Zelle
    cellImageUrl = cell.style.backgroundImage; // Speichern des Hintergrundbilds der aktuellen Zelle
    cellBelowImageUrl = cellBelow.style.backgroundImage; // Speichern des Hintergrundbilds der Zelle unter der aktuellen Zelle

    // Die aktuelle Zelle und die Zelle unter der aktuellen Zelle wird grün hervorgehoben und das Hintergrundbild wird entfernt, damit die Hintergrundfarbe sichtbar wird
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
    if (cellImageUrl) {
        cell.style.backgroundImage = cellImageUrl;
        cellImageUrl = null;
    }
    const cellBelow = findCellBelow(cell)
    if (cellBelow) {
        cellBelow.style.backgroundColor = "";
        if (cellBelowImageUrl) {
            cellBelow.style.backgroundImage = cellBelowImageUrl;
            cellBelowImageUrl = null;
        }
    }
    if (cell.style.borderColor === "lightgreen") {
        // Der Baustein wurde markiert. Dann wurde die Lichtanzeige überschrieben.
        // Neuberechnen des Lichts berechnet auch die Lichtanzeige wieder neu.
        calculateLight()
    }
}

// Gibt die Zelle der gegebenen "cell" zurück
function findCellBelow(cell) {
    const pos = position(cell)
    return document.getElementById(`cell-${pos.col}-${pos.row + 1}`);
}

// Gibt die Position einer Zelle zurück
function position(cell) {
    const [colIndex, rowIndex] = cell.id.split("-").slice(1).map(Number);
    return {row: rowIndex, col: colIndex}
}

// Überprüft, ob an diese Zelle ein Baustein platziert werden kann.
// Dabei wird die gegebene Zelle, und die darunter, überprüft.
function isValid(cell) {
    const cellBelow = findCellBelow(cell)
    const pos = position(cell)
    if (pos.row === hoehe - 1) {
        return false;
    }
    return !(cell.innerHTML !== "X" || cellBelow.innerHTML !== "X");
}

// Löscht eine Zelle
function deleteBlock(cell) {
    const find = findCombined(cell)
    // Zurücksetzen aller Werte
    find.top.innerHTML = "X"
    find.bottom.innerHTML = "X"
    find.top.style.backgroundImage = ""
    find.bottom.style.backgroundImage = ""
    cellImageUrl = null
    cellBelowImageUrl = null
    calculateLight() // Neuberechnen des Lichts nach Löschvorgang
}

// Funktion um den Baustein (Die Zwei Zellen) für die gegebene Zelle zu finden.
function findCombined(cell) {
    const pos = position(cell)
    let row
    let rowCell
    for (row = 0; row <= pos.row; row++) {
        rowCell = document.getElementById(`cell-${pos.col}-${row}`)
        if (rowCell.innerHTML !== "X") row++; // Ein Baustein ist immer zwei hoch, deswegen zweimal "row++"
    }
    // rowCell ist jetzt der immer obere Teil des Bausteins, indem "cell" ist.
    const below = findCellBelow(rowCell)
    return {top: rowCell, bottom: below}
}

// Funktion für das Verhalten bei Click-Ereignissen auf Zellen
function handleCellClick(event) {
    const cell = event.target;

    if (cell.innerHTML !== "X") {
        // Auf dieser Zelle ist bereits ein Baustein, also müss dieser gelöscht werden
        deleteBlock(cell)
        return;
    }

    if (!isValid(cell)) return; // Hier kann kein Baustein platziert werden.
    const cellBelow = findCellBelow(cell)

    // Platzieren eines Bausteins....
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
    if (confirm("Willst du wirklich alles löschen?")) {
        createPlayground(); // Das Spielfeld wird neu erstellt
    }
});

// Funktion zum Berechnen des Licht-Wegs
function calculateLight() {
    // Erstellen und Initialisieren eines zweidimensionalen Arrays für die Lampenstatus in jeder Spalte, jedes Element ist wiederum ein eigenes Array für die Lampenstatus in jeder Zeile
    const lampenWerte = new Array(laenge + 1); // +1, da es eine zusätzliche erste Spalte mit Lampen gibt
    // der Lampenstatus in der ersten Spalte werden aus den HTML-Elementen ausgelesen und in das Array gespeichert
    lampenWerte[0] = new Array(hoehe);
    for (let i = 0; i < hoehe; i++) {
        lampenWerte[0][i] = document.getElementById(`lamp-${i}`).classList.contains("on");
    }
    // Erstellen und Initialisieren eines zweidimensionalen Arrays für die Bausteinstatus in jeder Spalte, jedes Element ist wiederum ein eigenes Array für die Bausteinstatus in jeder Zeile
    const bigArray = new Array(laenge);
    for (let col = 0; col < laenge; col++) { // Schleife für jede Spalte
        bigArray[col] = new Array(hoehe); // Erstellen eines Arrays für die aktuelle Spalte
        for (let row = 0; row < hoehe; row++) { // Schleife für jedes Feld in der aktuellen Spalte
            // Auslesen der Bausteinstatus aus den HTML-Elementen und Speichern in das Array
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
    // Das zweidimensionale Array für die Lampenstatus wird mit den entsprechenden Werten befüllt
    for (let i = 1; i < lampenWerte.length; i++) { // Schleife für jede Spalte, beginnend bei der zweiten Spalte, da die erste Spalte bereits befüllt ist
        let output = new Spalte(hoehe, bigArray[i - 1]); // Erstellen eines Objekts der Klasse Spalte mit den entsprechenden Parametern aus der anderen Script-Datei
        lampenWerte[i] = output.apply(lampenWerte[i - 1]); // Anwenden der Funktion apply aus der Klasse Spalte auf die aktuelle Spalte, sodass die Lampenstatus in der aktuellen Spalte berechnet werden und in das Array gespeichert werden
    }
    // Funktion zum Anzeigen der Lampenstatus
    for (let i = 1; i < laenge; i++) { // Schleife für jede Spalte, beginnend bei der zweiten Spalte, da in der ersten Spalte Lampen sind
        for (let j = 0; j < hoehe; j++) { // Schleife für jedes Feld in der aktuellen Spalte
            const cell = document.getElementById(`cell-${i - 1}-${j}`) // Zugriff auf die Zelle in der aktuellen Spalte und der aktuellen Zeile, Indizes i wird um 1 verringert, da die erste Spalte, die Bausteine enthält, den Index 0 hat
            if (lampenWerte[i][j]) { // Wenn der Lampenstatus in der aktuellen Zelle true ist, wird die Zelle gelb umrandet
                cell.style.border = "3px solid yellow";
            } else { // Wenn der Lampenstatus in der aktuellen Zelle false ist, wird die Zelle schwarz umrandet
                cell.style.border = "1px solid black"
            }
            const nextCell = document.getElementById(`cell-${i}-${j}`) // Zugriff auf die Zelle in der nächsten Spalte und der aktuellen Zeile
            if (lampenWerte[i][j] === true && nextCell.innerHTML === "X") { // Wenn der Lampenstatus in der aktuellen Zelle true ist und die Zelle in der nächsten Spalte leer ist, wird die Zelle in der nächsten Spalte mit einem Hintergrundbild eines austretenden Lichts befüllt
                nextCell.style.backgroundImage = "url('image/licht.jpg')";
            } else if (lampenWerte[i][j] !== true && nextCell.innerHTML === "X") { // Wenn der Lampenstatus in der aktuellen Zelle false ist und die Zelle in der nächsten Spalte leer ist, wird das Hintergrundbild der Zelle in der nächsten Spalte entfernt
                nextCell.style.backgroundImage = "";
            }
        }
    }
}