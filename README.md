# Traveling Salesman Visualizer

This project visualizes the process of solving the Traveling Salesman Problem (TSP) using a combination of convex hull and selected nodes. It is built with React and includes interactive features to visualize the TSP path, convex hull algorithm, and optimized node insertion.

## Problem Statement

The Traveling Salesman Problem (TSP) seeks to find the shortest possible route that visits each given point exactly once and returns to the starting point. A naive approach, like the Nearest Neighbor algorithm, often results in paths with excessive crossing lines, leading to inefficient routes. This project improves upon that by:

- Using **Convex Hull** to establish an initial structure.
- **Inserting additional nodes optimally** to minimize crossings.
- Applying **2-opt optimization** to further refine the route.

## Demo

Here’s an example of the visualization in action:

![Project Demo](https://github.com/BroD54/Traveling-Salesman/blob/main/public/demo.PNG)


You can try the project live here:  
[**Traveling Salesman Visualizer**](https://BroD54.github.io/Travling-Salesman/)

## Features

- **Convex Hull Calculation**: Computes and visualizes the convex hull as the outer boundary of the selected points.
- **Optimized TSP Path Calculation**: Uses the convex hull as a base, strategically inserts additional points, and applies a 2-opt heuristic to reduce line crossings.
- **Node Selection**: Click on nodes to include them in the TSP calculation, whether they are part of the convex hull or not.
- **Interactive Grid**: Modify the grid in real-time to experiment with different configurations.
- **Animation**: The TSP path construction and optimization steps are animated for better understanding.

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

1. **Convex Hull Calculation**: The convex hull algorithm finds the minimal boundary around the set of selected points, forming an initial structured path.
2. **Node Insertion Without Crossing**: Any additional selected nodes (not in the convex hull) are inserted into the path in positions that minimize additional travel distance and prevent unnecessary line crossings.
3. **2-Opt Optimization**: The path is further refined using the 2-opt heuristic, which swaps edges to eliminate intersections and improve efficiency.

## Technologies Used

- **React**: Frontend framework for building the interactive interface.
- **JavaScript/TypeScript**: For algorithm implementation and state management.
- **TailwindCSS**: For styling the grid and visualizations.
