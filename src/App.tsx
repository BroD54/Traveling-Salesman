import { useState } from 'react'
import Grid from "./components/Grid"
import Bar from "./components/Bar"
import initNodes from "./utils/initiNodes";


function App() {
  const rowNum = 20;
  const colNum = 30;
  const [grid, setGrid] = useState<NodeType[][]>(initNodes(rowNum, colNum));

  return (
    <>
      <Bar />
      <Grid nodes={grid} />
    </>
  )
}

export default App
