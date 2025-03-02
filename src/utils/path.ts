const findPath = (start: NodeType, end: NodeType, cols: number): NodeType[] => {
	let path: NodeType[] = [];
	let { x, y } = start;

	let dx = end.x - x;
	let dy = end.y - y;

	let stepX = dx > 0 ? 1 : -1;
	let stepY = dy > 0 ? 1 : -1;

	while (x !== end.x || y !== end.y) {
		if (Math.abs(dx) > 0) {
			x += stepX;
			dx -= stepX;
		}
		if (Math.abs(dy) > 0) {
			y += stepY;
			dy -= stepY;
		}
		path.push({
			id: x * cols + y + 1,
			x,
			y,
			isStart: false,
			isVisited: false,
			isSelected: false,
			isOnPath: true,
			isConvexHull: false,
		});
	}

	return path;
};

const totalPath = (grid: NodeType[][], nodes: NodeType[]): NodeType[] => {
	let totalPath: NodeType[] = [];
	for (let i = 0; i < nodes.length - 1; i++) {
		const startNode = nodes[i];
		const endNode = nodes[i + 1];
		const pathSegment = findPath(startNode, endNode, grid[0].length);
		totalPath = [...totalPath, ...pathSegment];
	}
	return totalPath;
};

export default totalPath;
