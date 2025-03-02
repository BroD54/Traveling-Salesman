import { useEffect, useState } from 'react';
import Grid from "./components/Grid";
import Bar from "./components/Bar";
import initNodes from "./utils/initiNodes";
import nearestNeighbor from './utils/nearestNeighbor';
import totalPath from './utils/path';
import convexHullAlgorithm from './utils/convexHullAlgorithm';
import calculateTSPPath from './utils/calculateTSPPath';

function App() {
  const rowNum = 40;
  const colNum = 70;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));
  const [speed, setSpeed] = useState<number>(50);
  const [convexHull, setConvexHull] = useState<NodeType[]>([]);
  const [isConvexHullFinished, setIsConvexHullFinished] = useState<boolean>(false);

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
    const algorithmSteps = convexHullAlgorithm(grid);

    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < algorithmSteps.length) {
        const currentStep = algorithmSteps[stepIndex];

        setConvexHull(currentStep.convexHullPoints);

        setGrid((prevGrid) => {
          const updatedGrid = prevGrid.map((row) =>
            row.map((node) => {
              const isPartOfHull = currentStep.convexHullPoints.some((point) => point.id === node.id);
              return isPartOfHull ? { ...node, isConvexHull: true } : node;
            })
          );
          return updatedGrid;
        });

        stepIndex++;
      } else {
        clearInterval(interval); // Stop animation when done

        // Mark convex hull as finished
        setIsConvexHullFinished(true);
      }
    }, 500); // Speed of convex hull animation
  };

  const updateConvexHullNodes = (convexHullPoints: NodeType[]) => {
    console.log('Updating grid with convex hull nodes...');
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          const isPartOfHull = convexHullPoints.some((point) => point.id === node.id);
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
    }, speed); // Adjust speed as needed
  };

  const onClearGrid = () => {
    setGrid(initNodes(rowNum, colNum));
  };

  useEffect(() => {
    if (isConvexHullFinished) {
      console.log("Convex Hull Finished, Calculating TSP");
      const tspPath = calculateTSPPath(grid);
      console.log("TSP Path:", tspPath);
      const path = totalPath(grid, tspPath);

      if (path.length > 0) {
        animatePath(path);
      }
      // Reset convex hull finished state
      setIsConvexHullFinished(false);
    }
  }, [isConvexHullFinished, grid]); // This will trigger when convex hull is finished and grid updates

  return (
    <>
      <Bar onRunAlgorithm={runAlgorithm} onClearGrid={onClearGrid} onSpeedChange={setSpeed} />
      <Grid nodes={grid} toggleNode={toggleNode} />
    </>
  );
}

export default App;
