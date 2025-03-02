
/*

id	        number	    Unique identifier for the node (for React key and tracking)
x	        number	    X-coordinate in the grid
y	        number	    Y-coordinate in the grid
isStart	    boolean	    Whether this node is the selected start node
isSelected  boolean     Whether this node is selected
isVisited	boolean	    Used for algorithm visualization
isOnPath	boolean	    Indicates if the node is part of the computed path

*/
interface NodeType {
    id: number;
    x: number;
    y: number;
    isStart: boolean;
    isSelected: boolean;
    isVisited: boolean;
    isOnPath: boolean;
    isConvexHull: boolean;
}