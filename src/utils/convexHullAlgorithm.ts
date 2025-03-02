const convexHullAlgorithm = (grid: NodeType[][]): { convexHullPoints: NodeType[] }[] => {
  // Initialize the result array which stores the convex hull at each step
  const steps: { convexHullPoints: NodeType[] }[] = [];

  // Filter active points that are not the start node
  let points = grid.flat().filter(node => node.isSelected || node.isStart); 

  // Ensure there are enough points for a hull
  if (points.length < 3) {
    return steps; // Not enough points to form a convex hull
  }

  // Sort points by their x, then y coordinates
  points.sort((a, b) => a.x - b.x || a.y - b.y);

  // Function to check if the turn is counter-clockwise
  const cross = (o: NodeType, a: NodeType, b: NodeType) => (b.x - o.x) * (a.y - o.y) - (a.x - o.x) * (b.y - o.y);

  // Building the lower hull
  let lower: NodeType[] = [];
  for (let point of points) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }

  // Building the upper hull
  let upper: NodeType[] = [];
  for (let i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop();
    }
    upper.push(points[i]);
  }

  // Remove the last point because it's duplicated at the beginning of the other half
  upper.pop();

  // Combine the lower and upper hulls
  const hull = [...lower, ...upper];

  // Collecting steps for visualization
  for (let i = 0; i < hull.length; i++) {
    steps.push({
      convexHullPoints: hull.slice(0, i + 1), // Add one more point for each step
    });
  }

  return steps;
};

export default convexHullAlgorithm;
