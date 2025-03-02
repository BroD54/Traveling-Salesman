import { useEffect, useState } from 'react';
import Grid from "./components/Grid";
import Bar from "./components/Bar";
import initNodes from "./utils/initiNodes";
import nearestNeighbor from './utils/nearestNeighbor';
import totalPath from './utils/path';
import convexHullAlgorithm from './utils/convexHullAlgorithm';

function App() {
  const rowNum = 40;
  const colNum = 70;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));
  const [speed, setSpeed] = useState<number>(50);

  const [convexHull, setConvexHull] = useState<NodeType[]>([]);

  const toggleNode = (id: number, selected: boolean = false, start: boolean = false) => {
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
    } else if (algorithm === "convexHull") {
      runConvexHullAlgorithm();
    }
  };

  const runConvexHullAlgorithm = () => {
    // Get convex hull points step by step
    const algorithmSteps = convexHullAlgorithm(grid);
  
    let stepIndex = 0;
  
    const interval = setInterval(() => {
      if (stepIndex < algorithmSteps.length) {
        const currentStep = algorithmSteps[stepIndex];
  
        // Update convex hull points
        setConvexHull(currentStep.convexHullPoints);
  
        // Update grid with convex hull nodes
        updateConvexHullNodes(currentStep.convexHullPoints);
  
        stepIndex++;
      } else {
        clearInterval(interval); // Stop animation when done
  
        // After convex hull is finished, call nearest neighbor algorithm
        const startNode = algorithmSteps[algorithmSteps.length - 1].convexHullPoints[0]; // First point of the convex hull
        setGrid(prevGrid =>
          prevGrid.map(row =>
            row.map(node =>
              node.id === startNode.id ? { ...node, isStart: true } : node
            )
          )
        );

        const nodes = nearestNeighbor(grid); // Pass the start point to nearest neighbor
        if (nodes.length > 0) {
          const path = totalPath(grid, nodes);
          animatePath(path);
        }
      }
    }, 500); // Speed of convex hull animation
  };

  const updateConvexHullNodes = (convexHullPoints: NodeType[]) => {
    setGrid(prevGrid =>
      prevGrid.map(row =>
        row.map(node => {
          const isPartOfHull = convexHullPoints.some(point => point.id === node.id);
          return isPartOfHull ? { ...node, isConvexHull: true } : node;
        })
      )
    );
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
  };

  useEffect(() => {
    // console.log(grid); // This will log the grid after the state update
  }, [grid]);

  return (
    <>
      <Bar onRunAlgorithm={runAlgorithm} onClearGrid={onClearGrid} onSpeedChange={setSpeed} />
      <Grid nodes={grid} toggleNode={toggleNode} />
    </>
  );
}

export default App;
