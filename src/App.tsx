import { useEffect, useState } from 'react';
import Grid from './components/Grid';
import Bar from './components/Bar';
import initNodes from './utils/initiNodes';
import nearestNeighbor from './utils/nearestNeighbor';
import totalPath from './utils/path';
import convexHullAlgorithm from './utils/convexHullAlgorithm';
import calculateTSPPath from './utils/calculateTSPPath';

function App() {
	const [rowNum, setRowNum] = useState<number>(40);
	const [colNum, setColNum] = useState<number>(70);
	const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));
	const [speed, setSpeed] = useState<number>(50);
	const [_, setConvexHull] = useState<NodeType[]>([]);
	const [isConvexHullFinished, setIsConvexHullFinished] =
		useState<boolean>(false);

	const updateGridSize = () => {
		const rows = Math.floor(window.innerHeight / 35);
		const cols = Math.floor(window.innerWidth / 35);
		setRowNum(rows);
		setColNum(cols);
		setGrid(initNodes(rows, cols));
	};

	useEffect(() => {
		updateGridSize();
		window.addEventListener('resize', updateGridSize);
		return () => window.removeEventListener('resize', updateGridSize);
	}, []);

	const toggleNode = (
		id: number,
		selected: boolean = false,
		start: boolean = false
	) => {
		if (selected) {
			setGrid((prevGrid) => {
				return prevGrid.map((row) =>
					row.map((node) =>
						node.id === id ? { ...node, isSelected: !node.isSelected } : node
					)
				);
			});
		}
		if (start) {
			setGrid((prevGrid) => {
				return prevGrid.map((row) =>
					row.map((node) =>
						node.id === id
							? { ...node, isSelected: false, isStart: !node.isStart }
							: { ...node, isStart: false }
					)
				);
			});
		}
	};

	const runAlgorithm = (algorithm: string) => {
		setGrid((prevGrid) => {
			const updatedGrid = prevGrid.map((row) =>
				row.map((node) => {
					return { ...node, isOnPath: false, isConvexHull: false };
				})
			);
			return updatedGrid;
		});
		if (algorithm === 'nearestNeighbor') {
			const nodes = nearestNeighbor(grid);
			const path = totalPath(grid, nodes);
			animatePath(path);
		} else if (algorithm === 'convexHull') {
			runConvexHullAlgorithm();
		}
	};

	const runConvexHullAlgorithm = () => {
		const algorithmSteps = convexHullAlgorithm(grid);

		let stepIndex = 0;

		const interval = setInterval(() => {
			if (stepIndex < algorithmSteps.length) {
				const currentStep = algorithmSteps[stepIndex];

				setConvexHull(currentStep.convexHullPoints);

				setGrid((prevGrid) => {
					const updatedGrid = prevGrid.map((row) =>
						row.map((node) => {
							const isPartOfHull = currentStep.convexHullPoints.some(
								(point) => point.id === node.id
							);
							return isPartOfHull ? { ...node, isConvexHull: true } : node;
						})
					);
					return updatedGrid;
				});

				stepIndex++;
			} else {
				clearInterval(interval);

				setIsConvexHullFinished(true);
			}
		}, speed * 20);
	};

	const animatePath = (path: NodeType[]) => {
		let index = 0;

		const interval = setInterval(() => {
			if (index >= path.length) {
				clearInterval(interval);
				return;
			}

			setGrid((prevGrid) =>
				prevGrid.map((row) =>
					row.map((node) =>
						path.slice(0, index + 1).some((p) => p.id === node.id)
							? { ...node, isOnPath: true }
							: node
					)
				)
			);

			index++;
		}, speed);
	};

	const onClearGrid = () => {
		setGrid(initNodes(rowNum, colNum));
	};

	useEffect(() => {
		if (isConvexHullFinished) {
			const tspPath = calculateTSPPath(grid);
			const path = totalPath(grid, tspPath);

			if (path.length > 0) {
				animatePath(path);
			}
			setIsConvexHullFinished(false);
		}
	}, [isConvexHullFinished, grid]);

	return (
		<div className="min-h-screen">
			<Bar
				onRunAlgorithm={runAlgorithm}
				onClearGrid={onClearGrid}
				onSpeedChange={setSpeed}
			/>
			<Grid nodes={grid} toggleNode={toggleNode} />
		</div>
	);
}

export default App;
