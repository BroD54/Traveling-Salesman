const calculateTSPPath = (grid: NodeType[][]): NodeType[] => {
	const convexHullPoints = grid.flat().filter((node) => node.isConvexHull);
	const selectedNodes = grid
		.flat()
		.filter((node) => node.isSelected && !node.isConvexHull);

	if (convexHullPoints.length === 0) {
		return selectedNodes.length ? solveTSP(selectedNodes) : [];
	}

	let tspPath = solveTSP(convexHullPoints);

	tspPath = insertNodesWithoutCrossing(tspPath, selectedNodes);

	tspPath = twoOptOptimization(tspPath);

	return tspPath;
};

const solveTSP = (nodes: NodeType[]): NodeType[] => {
	if (nodes.length === 0) return [];

	let path = [...nodes];

	path.push(path[0]);

	return path;
};

const insertNodesWithoutCrossing = (
	path: NodeType[],
	innerNodes: NodeType[]
): NodeType[] => {
	if (innerNodes.length === 0) return path;

	let updatedPath = [...path];

	for (let node of innerNodes) {
		let bestIndex = 1;
		let minExtraDistance = Infinity;

		for (let i = 1; i < updatedPath.length; i++) {
			let prev = updatedPath[i - 1];
			let next = updatedPath[i];

			let extraDistance =
				getDistance(prev, node) +
				getDistance(node, next) -
				getDistance(prev, next);

			if (
				extraDistance < minExtraDistance &&
				!wouldCauseCrossing(updatedPath, prev, node, next)
			) {
				minExtraDistance = extraDistance;
				bestIndex = i;
			}
		}

		updatedPath.splice(bestIndex, 0, node);
	}

	return updatedPath;
};

const wouldCauseCrossing = (
	path: NodeType[],
	prev: NodeType,
	newNode: NodeType,
	next: NodeType
): boolean => {
	for (let i = 0; i < path.length - 2; i++) {
		let a = path[i];
		let b = path[i + 1];

		if (
			doLinesIntersect(a, b, prev, newNode) ||
			doLinesIntersect(a, b, newNode, next)
		) {
			return true;
		}
	}
	return false;
};

const twoOptOptimization = (path: NodeType[]): NodeType[] => {
	let improved = true;
	while (improved) {
		improved = false;
		for (let i = 1; i < path.length - 2; i++) {
			for (let j = i + 1; j < path.length - 1; j++) {
				let a = path[i - 1];
				let b = path[i];
				let c = path[j];
				let d = path[j + 1];

				if (doLinesIntersect(a, b, c, d)) {
					path = swapEdges(path, i, j);
					improved = true;
				}
			}
		}
	}
	return path;
};

const swapEdges = (path: NodeType[], i: number, j: number): NodeType[] => {
	let newPath = [...path];
	while (i < j) {
		[newPath[i], newPath[j]] = [newPath[j], newPath[i]];
		i++;
		j--;
	}
	return newPath;
};

const doLinesIntersect = (
	p1: NodeType,
	p2: NodeType,
	p3: NodeType,
	p4: NodeType
): boolean => {
	const orientation = (a: NodeType, b: NodeType, c: NodeType) =>
		(b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

	return (
		orientation(p1, p2, p3) * orientation(p1, p2, p4) < 0 &&
		orientation(p3, p4, p1) * orientation(p3, p4, p2) < 0
	);
};

const getDistance = (node1: NodeType, node2: NodeType): number => {
	return Math.sqrt(
		Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
	);
};

export default calculateTSPPath;
