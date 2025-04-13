const nearestNeighbor = (grid: NodeType[][]): NodeType[] => {
	let currentNode: NodeType | undefined = grid
		.flat()
		.find((node) => node.isStart);
	if (!currentNode) {
		alert('No start node found');
		return [];
	}

	let visitedNodes: Set<number> = new Set();
	let path: NodeType[] = [currentNode];
	visitedNodes.add(currentNode.id);

	let unvisitedNodes = grid
		.flat()
		.filter((node) => node.isSelected && !visitedNodes.has(node.id));

	while (unvisitedNodes.length > 0) {
		let nearestNode: NodeType | undefined = undefined;
		let minDistance = Infinity;

		for (let node of unvisitedNodes) {
			const distance = Math.sqrt(
				Math.pow(node.x - currentNode.x, 2) +
					Math.pow(node.y - currentNode.y, 2)
			);
			if (distance < minDistance) {
				minDistance = distance;
				nearestNode = node;
			}
		}

		if (nearestNode) {
			path.push(nearestNode);
			visitedNodes.add(nearestNode.id);
			currentNode = nearestNode;
		}

		unvisitedNodes = grid
			.flat()
			.filter((node) => node.isSelected && !visitedNodes.has(node.id));
	}

	path.push(path[0]);

	return path;
};

export default nearestNeighbor;
