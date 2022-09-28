import { useState } from "react";
import { GRID_NODES } from "./visualizeAlgo";

// Custom hook to initialze grid and grid node properties
// import into 'visualizeAlgo.js' and use if wanted,
// replace current value for getInitialGrid(),
// createNode() no longer needed in 'visualizeAlgo' if using this hook

const useInitializeGrid = () => {
	const [grid, setGrid] = useState(() => {
		const grid = Array.from(Array(20), () => new Array(51));
		return grid.map((row, rowIdx) => {
			return row.map((node, nodeIdx) => createNode(nodeIdx, rowIdx));
		});
	});

	const createNode = (col, row) => {
		return {
			col,
			row,
			isStart:
				row === GRID_NODES.START_NODE_ROW && col === GRID_NODES.START_NODE_COL,
			isFinish:
				row === GRID_NODES.FINISH_NODE_ROW &&
				col === GRID_NODES.FINISH_NODE_COL,
			distance: Infinity,
			isVisited: false,
			isWall: false,
			previousNode: null,
		};
	};

	return [grid, setGrid];
};

export default useInitializeGrid;
