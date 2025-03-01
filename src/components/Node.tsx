import React from 'react'

type NodeProps = {
    node: NodeType;
    toggleNode: (id: number, selected?:boolean, start?:boolean) => void;
}

const Node = ( { node, toggleNode } : NodeProps ) => {

    const nodeColor = (): string => {
        if (node.isStart) return "bg-green-300";
        if (node.isSelected) return "bg-slate-400";
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