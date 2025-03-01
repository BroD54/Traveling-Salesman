import { useState } from 'react'
import Grid from "./components/Grid"
import Bar from "./components/Bar"
import initNodes from "./utils/initiNodes";


function App() {
  const rowNum = 20;
  const colNum = 30;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));

  const toggleNode = (id: number, visited: boolean = false, start:boolean = false) => {

    if (visited){
      setGrid((prevGrid) => {
        return prevGrid.map((row) =>
          row.map((node) =>
            node.id === id ? { ...node, isVisited: !node.isVisited } : node
          )
        );
      });
    }
    if (start){
      setGrid((prevGrid) => {
        return prevGrid.map((row) =>
          row.map((node) =>
            node.id === id ? { ...node, isVisited: false, isStart: !node.isStart } : { ...node, isStart: false }
          )
        );
      });
    }
  };

  return (
    <>
      <Bar />
      <Grid nodes={grid} toggleNode={toggleNode} />
    </>
  )
}

export default App
