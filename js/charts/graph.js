/**
 * Graph chart
 */
class Graph {

    /**
     * Constructor
     * @param {String} title title
     */
    constructor(title) {
        this.option = {
            title: title,

        }
    }

    /**
     * reandering method
     * @param {Array[Array]} rawData data from google spreadsheet
     * @param {String} targetId rendering target id attribute
     * @returns Graph instance
     */
    render(rawData, targetId) {
        let chartDiv = document.getElementById(targetId);

        // render title
        chartDiv.parentElement.prepend(this.option.title);

        // create graph data
        let connectionData = rawData.data;
        let nodeEdgeData = this.createNodeEdgeData(connectionData);

        // render graph
        const graph = new graphology.Graph();
        graph.import(nodeEdgeData);
        const renderer = new Sigma(graph, chartDiv);

        // graph event
        let draggedNode = null;
        let isDragging = false;

        // drag start event
        renderer.on("downNode", (e) => {
            isDragging = true;
            draggedNode = e.node;
            graph.setNodeAttribute(draggedNode, "highlighted", true);
        });

        // drag end event
        renderer.getMouseCaptor().on("mouseup", () => {
            if (draggedNode) {
                graph.removeNodeAttribute(draggedNode, "highlighted");
            }
            isDragging = false;
            draggedNode = null;
        });

        // drag event
        renderer.getMouseCaptor().on("mousemovebody", (e) => {
            if (!isDragging || !draggedNode) return;

            // get new position of node
            const pos = renderer.viewportToGraph(e);

            graph.setNodeAttribute(draggedNode, "x", pos.x);
            graph.setNodeAttribute(draggedNode, "y", pos.y);

            // prevent sigma to move camera:
            e.preventSigmaDefault();
            e.original.preventDefault();
            e.original.stopPropagation();
        });

        // create download link
        ChartsUtils.createDownloadCanvasLink(targetId);
        return this;
    }

    /**
     * create node and edge data for graphology
     * @param {Object} connectionData data from google spreadsheet
     * @returns graphology data
     */
    createNodeEdgeData(connectionData) {
        let nodeEdgeData = {
            nodes: [],
            edges: []
        };

        // key: 'receiver,supplier' or 'supplier,receiver'
        // value: point
        let nodesPointMap = {};
        connectionData.map(data => {
            let receiver = data.receiver;
            let supplier = data.supplier;
            let point = data.point;
            let key1 = receiver + ',' + supplier;
            let key2 = supplier + ',' + receiver;

            // 1/2 point because of rendering edge size
            if (nodesPointMap.hasOwnProperty(key1)) {
                nodesPointMap[key1] += point / 2;
            } else if (nodesPointMap.hasOwnProperty(key2)) {
                nodesPointMap[key2] += point / 2;
            } else {
                nodesPointMap[key1] = 0;
                nodesPointMap[key1] += point / 2;
            }
        });

        // create node and edge data
        let nodeList = [];
        Object.keys(nodesPointMap).map(key => {
            let nodes = key.split(',');

            // create node
            if (nodeList.indexOf(nodes[0]) < 0) {
                nodeList.push(nodes[0]);
                nodeEdgeData.nodes.push(this.createNode(nodes[0]));
            }
            if (nodeList.indexOf(nodes[1]) < 0) {
                nodeList.push(nodes[1]);
                nodeEdgeData.nodes.push(this.createNode(nodes[1]));
            }

            // create edge
            nodeEdgeData.edges.push(this.createEdge(key, nodes[0], nodes[1], nodesPointMap[key]));
        });

        return nodeEdgeData;
    }

    /**
     * create node data
     * @param {String} label player name
     * @returns node object
     */
    createNode(label) {
        let name = label;
        let x = Math.random();
        let y = Math.random();
        if (Const.PLAYER[label] != null) {

            // set player name and position
            name = Const.PLAYER[label].name;
            x = Const.PLAYER[label].x;
            y = Const.PLAYER[label].y;
        }
        return {
            key: name,
            attributes: {
                label: name,
                x: x,
                y: y,
                size: 8
            }
        }
    }

    /**
     * create edge data
     * @param {String} key nodesPointMap key
     * @param {String} source source node label
     * @param {String} target target node label
     * @param {Numer} point point
     * @returns edge object
     */
    createEdge(key, source, target, point) {
        let sourceName = source;
        let targetName = target;

        // set player name
        if (Const.PLAYER[source] != null) {
            sourceName = Const.PLAYER[source].name;
        }
        if (Const.PLAYER[target] != null) {
            targetName = Const.PLAYER[target].name;
        }
        return {
            key: key,
            source: sourceName,
            target: targetName,
            attributes: {
                size: point
            }
        }
    }
}