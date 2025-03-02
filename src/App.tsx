import { useEffect, useState } from 'react'
import Grid from "./components/Grid"
import Bar from "./components/Bar"
import initNodes from "./utils/initiNodes";
import nearestNeighbor from './utils/nearestNeighbor';
import totalPath from './utils/path';

function App() {
  const rowNum = 40;
  const colNum = 70;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));
  const [speed, setSpeed] = useState<number>(50);

  const toggleNode = (id: number, selected: boolean = false, start:boolean = false) => {

    if (selected){
      setGrid((prevGrid) => {
        return prevGrid.map((row) =>
          row.map((node) =>
            node.id === id ? { ...node, isSelected: !node.isSelected } : node
          )
        );
      });
    }
    if (start){
      setGrid((prevGrid) => {
        return prevGrid.map((row) =>
          row.map((node) =>
            node.id === id ? { ...node, isSelected: false, isStart: !node.isStart } : { ...node, isStart: false }
          )
        );
      });
    }
  };

  const runAlgorithm = (algorithm: string) => {
    if (algorithm === "nearestNeighbor") {
        const nodes = nearestNeighbor(grid);
        const path = totalPath(grid, nodes);

        animatePath(path);
    }
  };

  const animatePath = (path: NodeType[]) => {
    let index = 0;

    const interval = setInterval(() => {
        if (index >= path.length) {
            clearInterval(interval);
            return;
        }

        setGrid(prevGrid =>
            prevGrid.map(row =>
                row.map(node =>
                    path.slice(0, index + 1).some(p => p.id === node.id)
                        ? { ...node, isOnPath: true }
                        : node
                )
            )
        );

        index++;
    }, speed); // Adjust speed as needed
  };

  const onClearGrid = () => {
    setGrid(initNodes(rowNum, colNum));
  }


  useEffect(() => {
    // console.log(grid); // This will log the grid after the state update
  }, [grid]);

  return (
    <>
      <Bar onRunAlgorithm={runAlgorithm} onClearGrid={onClearGrid} onSpeedChange={setSpeed}/>
      <Grid nodes={grid} toggleNode={toggleNode} />
    </>
  )
}

export default App
