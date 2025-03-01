const nearestNeighbor = (grid: NodeType[][]): NodeType[][] => {
    // Reset all nodes
    grid = grid.map((row: NodeType[]) => {
        return row.map((node: NodeType) => {
            return { ...node, isVisited: false, isOnPath: false, isSelected: false }; // Reset isSelected as well
        });
    });

    // Find the start node
    const startNode = grid.flat().find(node => node.isStart);
    if (!startNode) return grid; // If no start node, return the grid unchanged

    // Initialize the path and the set for fast lookup
    let path = [startNode];
    let currentNode = startNode;
    let foundPath = false;
    const pathSet = new Set([startNode.id]); // Set to track nodes in the path by their id

    // Loop until the path is complete
    while (!foundPath) {
        // Mark the current node as visited
        currentNode = { ...currentNode, isVisited: true };

        // Find the nearest neighbor
        let nearestNeighbor = null;
        let minDistance = Infinity;

        for (let row of grid) {
            for (let node of row) {
                if (!node.isVisited && !node.isSelected) {
                    const distance = Math.sqrt(Math.pow(node.x - currentNode.x, 2) + Math.pow(node.y - currentNode.y, 2));
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestNeighbor = node;
                    }
                }
            }
        }

        // If a nearest neighbor is found, add it to the path
        if (nearestNeighbor) {
            path.push(nearestNeighbor);
            pathSet.add(nearestNeighbor.id); // Add to the path set
            currentNode = nearestNeighbor;
        } else {
            // No more neighbors to visit, end the path
            foundPath = true;
        }

        // Mark the nodes on the path
        grid = grid.map((row: NodeType[]) => {
            return row.map((node: NodeType) => {
                if (pathSet.has(node.id)) {
                    return { ...node, isOnPath: true };
                }
                return node;
            });
        });
    }

    return grid;
};

export default nearestNeighbor;
