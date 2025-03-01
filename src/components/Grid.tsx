import React from 'react'
import Node from './Node'

type GridProps = {
    nodes: NodeType[][];
    toggleNode: (id: number, visited?:boolean, start?:boolean) => void;
}

const Grid = ({nodes, toggleNode}: GridProps) => {

  return (
    <div className="flex flex-col justify-center items-center">
        {
        nodes.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
                {row.map((node, colIndex) => (
                    <Node key={node.id} node={node} toggleNode={toggleNode} />
                ))}
            </div>
            ))
        }

        {/* {results.map((course, index) => (
          <Result key={index} course={course} />
        ))} */}
    </div>
  )
}

export default Grid