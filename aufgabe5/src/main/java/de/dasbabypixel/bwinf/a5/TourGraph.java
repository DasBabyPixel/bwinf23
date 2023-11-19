package de.dasbabypixel.bwinf.a5;

import de.dasbabypixel.util.Graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TourGraph {
    private final Graph<Tourpoint, Integer> graph = Graph.linkedGraph();
    private final Map<Tourpoint, Graph.Node<Tourpoint, Integer>> nodeMap = new HashMap<>();

    public TourGraph(List<Tourpoint> tour) {
        Graph.Node<Tourpoint, Integer> last = null;
        var pointsByName = new HashMap<String, List<Graph.Node<Tourpoint, Integer>>>();
        for (var tourpunkt : tour) {
            // Zunächst den Tourpunkt registrieren.
            var node = graph.newNode(tourpunkt);
            // Den Tourpunkt für späteren Zugriff speichern.
            nodeMap.put(tourpunkt, node);
            if (last != null) { // Eine Verbindung zum vorherigen Tourpunkt aufbauen.
                last.newConnection(node, tourpunkt.distanceToStart() - last.data().distanceToStart());
            }
            var points = pointsByName.computeIfAbsent(tourpunkt.location(), s -> new ArrayList<>());
            for (var point : points) { // Eine Verbindung mit Strecke 0 zu allen vorherigen Tourpunkten am gleichen Ort nach dem letzten wichtigen Tourpunkt (eingeschlossen) aufbauen.
                point.newConnection(node, 0);
            }
            if (tourpunkt.important()) {
                // Der Tourpunkt ist wichtig, deswegen kann nicht abgekürzt werden.
                // Das sorgt dafür, dass in dem Graph kein Weg um einen wichtigen Tourpunkt herumführt.
                pointsByName.clear();
                points.clear();
                pointsByName.put(tourpunkt.location(), points);
            }
            // Den Tourpunkt für Abkürzungen zwischenspeichern.
            points.add(node);
            last = node;
        }
    }

    public List<Tourpoint> search(Tourpoint beginning, Tourpoint end) {
        // Die Start- und Endpunkte im Graph laden.
        var bNode = nodeMap.get(beginning);
        var eNode = nodeMap.get(end);
        // Mithilfe des Dijkstra-Algorithmus den kürzesten Weg berechnen.
        var path = graph.search(Graph.Algorithm
                .<Tourpoint, Integer>dijkstra()
                .withData(new Graph.Algorithm.DijkstraData<>(bNode, eNode, Graph.Node.Connection::way)));
        // Output vorbereiten.
        var output = new ArrayList<Tourpoint>();
        // Länge der Strecke vorbereiten.
        int distanceToStart = 0;
        // "path" in das richtige Format konvertieren.
        for (var connection : path) {
            var from = connection.from();
            var to = connection.to();
            int distance = connection.way();
            // Kumulative Distanz berechnen
            distanceToStart += distance;
            if (output.isEmpty()) {
                // Der erste Punkt wurde noch nicht hinzugefügt, da wir Verbindungen und nicht Punkte iterieren.
                output.add(new Tourpoint(from.data().location(), from.data().year(), from.data().important(), 0));
            }
            // Den "to"-Punkt hinzufügen
            output.add(new Tourpoint(to.data().location(), to.data().year(), to.data().important(), distanceToStart));
        }
        return output;
    }
}
