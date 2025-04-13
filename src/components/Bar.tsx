import React, { useState } from 'react';

interface BarProp {
	onRunAlgorithm: (algorithm: string) => void;
	onClearGrid: () => void;
	onSpeedChange: (speed: number) => void;
}

const Bar = ({ onRunAlgorithm, onClearGrid, onSpeedChange }: BarProp) => {
	const [selectedAlgorithm, setSelectedAlgorithm] = useState('nearestNeighbor');
	const [_, setSpeed] = useState(100);

	const handleAlgorithmChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedAlgorithm(event.target.value);
	};

	const handleRunAlgorithm = () => {
		onRunAlgorithm(selectedAlgorithm);
	};

	return (
		<div className="bg-white shadow-md p-4 sm:px-6 lg:px-8 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
			<h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 md:mb-0">
				Traveling Salesman Visualizer
			</h1>

			<div className="flex flex-col space-y-4 m-auto md:space-y-0 md:flex-row md:space-x-4 md:mr-0">
				{' '}
				<select
					value={selectedAlgorithm}
					onChange={handleAlgorithmChange}
					className="p-2 rounded-md border border-gray-300 text-black text-sm sm:text-base w-full"
				>
					<option value="nearestNeighbor">Nearest Neighbor</option>
					<option value="convexHull">Convex Hull</option>
				</select>
				<div className="flex items-center w-full">
					<label
						htmlFor="speed"
						className="mr-2 text-gray-700 text-sm sm:text-base"
					>
						Speed:
					</label>
					<input
						type="range"
						id="speed"
						min="0"
						max="99"
						onChange={(event) => {
							const newSpeed = Number(event.target.value);
							setSpeed(newSpeed);
							onSpeedChange(100 - newSpeed);
						}}
						className="w-full"
					/>
				</div>
				<button
					onClick={handleRunAlgorithm}
					className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md w-full text-sm sm:text-base"
				>
					Run Algorithm
				</button>
				<button
					onClick={onClearGrid}
					className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md w-full text-sm sm:text-base"
				>
					Clear Grid
				</button>
			</div>
		</div>
	);
};

export default Bar;
