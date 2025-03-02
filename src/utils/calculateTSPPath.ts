const calculateTSPPath = (grid: NodeType[][]): NodeType[] => {
  console.log('Calculating TSP Path...');

  // Extract convex hull points from the grid
  const convexHullPoints = grid.flat().filter(node => node.isConvexHull);
  console.log('Convex Hull Points:', convexHullPoints);

  // Extract selected nodes from the grid
  const selectedNodes = grid.flat().filter(node => node.isSelected);
  console.log('Selected Nodes:', selectedNodes);

  // Combine convex hull points and selected nodes for TSP
  const allNodes = [...convexHullPoints, ...selectedNodes];
  console.log('All Nodes (Convex Hull + Selected):', allNodes);

  if (allNodes.length === 0) {
    console.error('No nodes found!');
    return []; // Exit early if no nodes are found
  }

  // Start from the first node (convex hull or selected)
  let visitedNodes: NodeType[] = [allNodes[0]]; // Start with the first point
  let remainingNodes = [...allNodes.slice(1)]; // All other nodes
  let currentNode = allNodes[0];

  // Helper function to find the nearest node to the current node
  const getNearestNode = (current: NodeType, nodes: NodeType[]): NodeType => {
    let nearestNode = nodes[0];
    let shortestDistance = getDistance(current, nearestNode);

    // Loop through the remaining nodes and find the nearest one
    for (let node of nodes) {
      let distance = getDistance(current, node);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestNode = node;
      }
    }

    return nearestNode;
  };

  // Helper function to calculate the distance between two nodes (Euclidean distance)
  const getDistance = (node1: NodeType, node2: NodeType): number => {
    return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
  };

  // While there are remaining nodes, find the nearest node and add it to the path
  while (remainingNodes.length > 0) {
    let nearestNode = getNearestNode(currentNode, remainingNodes);
    visitedNodes.push(nearestNode);

    // Remove the visited node from the remaining nodes
    remainingNodes = remainingNodes.filter(node => node.id !== nearestNode.id);

    // Set the current node to the nearest node
    currentNode = nearestNode;
  }

  // To complete the tour, return to the starting point (first node)
  visitedNodes.push(visitedNodes[0]);

  return visitedNodes;
};

export default calculateTSPPath;
