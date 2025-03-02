
# TSP Convex Hull & Selected Nodes Visualizer

This project visualizes the process of solving the Traveling Salesman Problem (TSP) using convex hull and selected nodes. It is built with React and includes interactive features to visualize the TSP path, convex hull algorithm, and node selection.

## Features
- **Convex Hull Calculation**: Visualize the convex hull of a set of points.
- **TSP Path Calculation**: Use the Nearest Neighbor algorithm to calculate the optimal path for visiting all points.
- **Node Selection**: Select nodes to be included in the TSP calculation, whether they are part of the convex hull or not.
- **Interactive Grid**: Click on nodes to select them and modify the grid in real-time.
- **Animation**: The TSP path and convex hull steps are animated for better understanding.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/BroD54/Traveling-Salesman.git
    ```

2. **Navigate into the project folder**:
    ```bash
    cd Traveling-Salesman
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the project**:
    ```bash
    npm start
    ```

    This will start the development server and open the app in your browser.


## How It Works

1. **Convex Hull Calculation**: The convex hull algorithm is run to find the minimal boundary around the set of points, which are marked on the grid.
2. **TSP Calculation**: The TSP path is calculated by finding the nearest neighbor for each node, starting from the first node (either from the convex hull or selected nodes). The algorithm continues until all nodes are visited, then returns to the starting node.
3. **Selected Nodes**: In addition to the convex hull points, any manually selected nodes will also be included in the TSP calculation, ensuring that they are part of the final path.

## Technologies Used
- **React**: Frontend framework for building the interactive interface.
- **JavaScript/TypeScript**: For algorithm implementation and state management.
- **TailwindCSS**: For styling the grid and visualizations.
