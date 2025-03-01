import React from 'react'

/*

id	        number	    Unique identifier for the node (for React key and tracking)
x	        number	    X-coordinate in the grid
y	        number	    Y-coordinate in the grid
isStart	    boolean	    Whether this node is the selected start node
isVisited	boolean	    Used for algorithm visualization
isOnPath	boolean	    Indicates if the node is part of the computed path

*/

type NodeProps = {
    node: NodeType;
}

const Node = ( { node } : NodeProps ) => {
  return (
    <div className={`bg-slate-100 w-8 h-8 cursor-pointer m-0.5`}>{node.id}</div>
  )
}

export default Node