type NodeProps = {
	node: NodeType;
	toggleNode: (id: number, selected?: boolean, start?: boolean) => void;
};

const Node = ({ node, toggleNode }: NodeProps) => {
	const nodeColor = (): string => {
		if (node.isStart) return 'bg-green-300';
		if (node.isConvexHull) return 'bg-red-300';
		if (node.isSelected) return 'bg-slate-400';
		if (node.isOnPath) {
			return 'bg-blue-400 transition-all duration-300 ease-in-out shadow-lg transform animate-pulse';
		}
		return 'bg-slate-100';
	};

	return (
		<div
			className={`${nodeColor()} w-4 h-4 md:w-6 md:h-6 cursor-pointer border-white border-[0.5px]`}
			onClick={() => toggleNode(node.id, true)}
			onContextMenu={(event) => {
				event.preventDefault();
				toggleNode(node.id, false, true);
			}}
		>
			{}
		</div>
	);
};

export default Node;
