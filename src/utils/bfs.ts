/*
    Breadth First Search
    - searches for the shortest path to each node in nodes in order
*/
const bfs = (grid: NodeType[][], nodes: NodeType[]): NodeType[] => {
    const directions = [
      { dx: 0, dy: 1 },  // Right
      { dx: 1, dy: 0 },  // Down
      { dx: 0, dy: -1 }, // Left
      { dx: -1, dy: 0 }, // Up
    ];
  
    const totalPath: NodeType[] = []; // This will store the entire path across all nodes in order
  
    for (let i = 0; i < nodes.length - 1; i++) {
      const startNode = nodes[i];
      const endNode = nodes[i + 1];
  
      if (!startNode || !endNode) continue;
  
      const queue: { node: NodeType, parent: NodeType | null }[] = [{ node: startNode, parent: null }];
      const visited = new Set<string>(); // Set to track visited nodes
      visited.add(`${startNode.x},${startNode.y}`);
  
      const path: NodeType[] = []; // Path from start to end node
  
      while (queue.length > 0) {
        const { node, parent } = queue.shift()!;
  
        if (node === endNode) {
          // Reconstruct the path once we reach the end node
          let currentNode = node;
          while (currentNode) {
            path.unshift(currentNode); // Add the node to the beginning of the path
            currentNode = parent!; // Move to the parent node
          }
  
          // Append the path to the total path
          totalPath.push(...path);
  
          // Mark all nodes in this path as "onPath"
          path.forEach((nodeInPath) => {
            nodeInPath.isOnPath = true;
            nodeInPath.isVisited = true; // Ensure this node is marked as visited
          });
          break; // Exit the while loop once we find the end node
        }
  
        // Explore neighboring nodes (up, down, left, right)
        for (let dir of directions) {
          const neighborX = node.x + dir.dx;
          const neighborY = node.y + dir.dy;
  
          // Check if the neighbor is within bounds and not visited
          if (neighborX >= 0 && neighborX < grid.length && neighborY >= 0 && neighborY < grid[0].length) {
            const neighbor = grid[neighborX][neighborY];
            const neighborKey = `${neighbor.x},${neighbor.y}`;
            if (!visited.has(neighborKey) && !neighbor.isVisited && !neighbor.isSelected) {
              visited.add(neighborKey); // Mark the neighbor as visited
              queue.push({ node: neighbor, parent: node });
            }
          }
        }
      }
    }
  
    return totalPath; // Return the entire path across all nodes in order
  };
  
  export default bfs;
  