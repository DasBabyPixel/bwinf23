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
            var node = graph.newNode(tourpunkt);
            nodeMap.put(tourpunkt, node);
            if (last != null) {
                last.newConnection(node, tourpunkt.distanceToStart() - last.data().distanceToStart());
            }
            var points = pointsByName.computeIfAbsent(tourpunkt.location(), s -> new ArrayList<>());
            for (var point : points) {
                point.newConnection(node, 0);
            }
            if (tourpunkt.important()) {
                pointsByName.clear();
                points.clear();
                pointsByName.put(tourpunkt.location(), points);
            }
            points.add(node);
            last = node;
        }
    }

    public List<Tourpoint> search(Tourpoint beginning, Tourpoint end) {
        var bNode = nodeMap.get(beginning);
        var eNode = nodeMap.get(end);
        var path = graph.search(Graph.Algorithm
                .<Tourpoint, Integer>dijkstra()
                .withData(new Graph.Algorithm.DijkstraData<>(bNode, eNode, Graph.Node.Connection::way)));
        var output = new ArrayList<Tourpoint>();
        int distanceToStart = 0;
        for (var connection : path) {
            var from = connection.from();
            var to = connection.to();
            int distance = connection.way();
            distanceToStart += distance;
            if (output.isEmpty()) {
                output.add(new Tourpoint(from.data().location(), from.data().year(), from.data().important(), 0));
            }
            output.add(new Tourpoint(to.data().location(), to.data().year(), to.data().important(), distanceToStart));
        }
        return output;
    }
}
