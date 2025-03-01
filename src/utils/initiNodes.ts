const initNodes = (rows: number, cols: number): NodeType[][] => {
    var grid: NodeType[][] = [];

    for (let i = 0; i < rows; i++) {
        var row: NodeType[] = [];
        for (let j = 0; j < cols; j++) {
        row.push({
            id: i * cols + j + 1,
            x: i,
            y: j,
            isStart: false,
            isSelected: false,
            isVisited: false,
            isOnPath: false
        });
        }
        grid.push(row);
    }

    return grid;
};

export default initNodes 