const nearestNeighbor = (grid: NodeType[][]): NodeType[] => {
    let currentNode: NodeType | undefined = grid.flat().find(node => node.isStart);
    if (!currentNode) {
        console.error("No start node found");
        return [];
    }

    let visitedNodes: Set<number> = new Set();
    let path: NodeType[] = [currentNode]; // Start the path with the start node
    visitedNodes.add(currentNode.id); // Mark the start node as visited

    // Continue until all selected nodes are visited
    let unvisitedNodes = grid.flat().filter(node => node.isSelected && !visitedNodes.has(node.id));

    while (unvisitedNodes.length > 0) {
        let nearestNode: NodeType | undefined = undefined;
        let minDistance = Infinity;

        // Find the nearest unvisited node
        for (let node of unvisitedNodes) {
            const distance = Math.sqrt(Math.pow(node.x - currentNode.x, 2) + Math.pow(node.y - currentNode.y, 2));
            // const manhattan_distance = Math.abs(node.x - currentNode.x) + Math.abs(node.y - currentNode.y);
            if (distance < minDistance) {
                minDistance = distance;
                nearestNode = node;
            }
        }

        // If a nearest node is found, add it to the path
        if (nearestNode) {
            path.push(nearestNode);
            visitedNodes.add(nearestNode.id); // Mark the node as visited
            currentNode = nearestNode;
        }

        // Update the list of unvisited nodes
        unvisitedNodes = grid.flat().filter(node => node.isSelected && !visitedNodes.has(node.id));
    }

    // Finally, return back to the start node
    path.push(path[0]);

    return path;
};

export default nearestNeighbor;
