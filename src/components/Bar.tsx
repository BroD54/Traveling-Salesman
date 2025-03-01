import React, { useState } from 'react'

interface BarProp {
  onRunAlgorithm: (algorithm: string) => void;
}

const Bar = ({ onRunAlgorithm }: BarProp) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('nearestNeighbor');

  const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleRunAlgorithm = () => {
    onRunAlgorithm(selectedAlgorithm);
  };

  return (
    <div className="bg-white shadow-md p-4 px-8 mb-4 flex justify-between items-center border-b">
      <h1 className="text-3xl font-semibold text-gray-900">Traveling Salesman Visualizer</h1>
      
      <div className="flex space-x-4 items-center">
        <select
          value={selectedAlgorithm}
          onChange={handleAlgorithmChange}
          className="p-2 rounded-md border border-gray-300 text-black"
        >
          <option value="nearestNeighbor">Nearest Neighbor</option>
          <option value="otherAlgorithm">Other Algorithm</option>
        </select>

        <button
          onClick={handleRunAlgorithm}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Run Algorithm
        </button>
      </div>
    </div>
  );
}

export default Bar;
