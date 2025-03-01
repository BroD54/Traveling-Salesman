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
    toggleNode: (id: number, visited?:boolean, start?:boolean) => void;
}

const Node = ( { node, toggleNode } : NodeProps ) => {

    const nodeColor = (): string => {
        if (node.isStart) return "bg-green-300";
        if (node.isVisited) return "bg-slate-400";
        if (node.isOnPath) return "bg-blue-300";
        return "bg-slate-100";
    }

    return (
        <div 
            className={`${nodeColor()} w-8 h-8 cursor-pointer m-0.5`} 
            onClick={() => toggleNode(node.id, true)}
            onContextMenu={(event) => {event.preventDefault(); toggleNode(node.id, false, true)}}
        >
            {}
        </div>
    )
}

export default Node