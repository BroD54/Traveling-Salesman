import { useState } from 'react'
import Grid from "./components/Grid"
import Bar from "./components/Bar"
import initNodes from "./utils/initiNodes";
import nearestNeighbor from './utils/nearestNeighbor';


function App() {
  const rowNum = 20;
  const colNum = 30;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));

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

  return (
    <>
      <Bar onRunAlgorithm={(algorithm: string) => console.log(algorithm)} />
      <Grid nodes={grid} toggleNode={toggleNode} />
    </>
  )
}

export default App
