const convexHullAlgorithm = (
	grid: NodeType[][]
): { convexHullPoints: NodeType[] }[] => {
	const steps: { convexHullPoints: NodeType[] }[] = [];

	let points = grid.flat().filter((node) => node.isSelected || node.isStart);

	if (points.length < 3) {
		return steps;
	}

	points.sort((a, b) => a.x - b.x || a.y - b.y);

	const cross = (o: NodeType, a: NodeType, b: NodeType) =>
		(b.x - o.x) * (a.y - o.y) - (a.x - o.x) * (b.y - o.y);

	let lower: NodeType[] = [];
	for (let point of points) {
		while (
			lower.length >= 2 &&
			cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
		) {
			lower.pop();
		}
		lower.push(point);
	}

	let upper: NodeType[] = [];
	for (let i = points.length - 1; i >= 0; i--) {
		while (
			upper.length >= 2 &&
			cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0
		) {
			upper.pop();
		}
		upper.push(points[i]);
	}

	upper.pop();

	const hull = [...lower, ...upper];

	for (let i = 0; i < hull.length; i++) {
		steps.push({
			convexHullPoints: hull.slice(0, i + 1),
		});
	}

	return steps;
};

export default convexHullAlgorithm;
