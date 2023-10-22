Ansatz 1:
Zuerst optimalen Startpunkt festlegen, indem vor dem ersten wichtigen und nach dem letzten wichtigen Punkt sucht und das erste passende Paar nimmt.

Problem:
Ein besserer Startpunkt existiert (Einer der am Ende insgesamt weniger Distanz hat)

Ansatz 2:
Alle möglichen Startpunkte suchen und sortieren, dass die meiste Distanz verloren ist

Problem:
Ein anderer besserer Startpunkt existiert, wenn man eine geschlossene Teiltour auslässt

Wegen dieser Komplexität:
Einen Graphen aufbauen mit allen möglichen Wegen und dann:
Dijkstra

**Finaler Ansatz:**

Alle möglichen Startpunkt/Endpunkt Kombinationen suchen (und speichern) - Main.java

Einen korrekten Graphen aufbauen - TourGraph.java

Dijkstra auf den Graphen für jede Startpunkt/Endpunkt Kombination ausführen. Dann den besten Weg aussuchen - Main.java
