import {
	dijkstra,
	getNodesInShortestPathOrder,
} from "../../../algorithms/dijkstra";

// global, unchanged variables
export const GRID_NODES = {
	START_NODE_ROW: 10,
	START_NODE_COL: 15,
	FINISH_NODE_ROW: 10,
	FINISH_NODE_COL: 35,
};

// createNode()
// Creating node objects with the following properties:
// col, row, isStart, isFinish, distance, isVisited, isWall, previousNode
// the createNode function is called in the getInitialGrid function
export const createNode = (col, row) => {
	return {
		col,
		row,
		isStart:
			row === GRID_NODES.START_NODE_ROW && col === GRID_NODES.START_NODE_COL,
		isFinish:
			row === GRID_NODES.FINISH_NODE_ROW && col === GRID_NODES.FINISH_NODE_COL,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null,
	};
};

// getInitialGrid()
// Creating grid dimensions in terms of rows and columns
// nested hash map implementation to optimze runtime
export const getInitialGrid = () => {
	// 20 rows, 51 columns
	const grid = Array.from(Array(20), () => new Array(51));
	return grid.map((row, rowIdx) => {
		return row.map((node, nodeIdx) => createNode(nodeIdx, rowIdx));
	});
};

// default export
export default function visualizeAlgo() {
	function getNewGridWithWallToggled(grid, row, col) {
		const newGrid = grid.slice();
		const node = newGrid[row][col];
		const newNode = { ...node, isWall: !node.isWall };
		newGrid[row][col] = newNode;
		return newGrid;
	}
	function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					animateShortestPath(nodesInShortestPathOrder);
				}, 10 * i);
				return;
			}
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				document.getElementById(`node-${node.row}-${node.col}`).className =
					"node node-visited";
			}, 10 * i);
		}
	}

	function animateShortestPath(nodesInShortestPathOrder) {
		for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
			setTimeout(() => {
				const node = nodesInShortestPathOrder[i];
				document.getElementById(`node-${node.row}-${node.col}`).className =
					"node node-shortest-path";
			}, 50 * i);
		}
	}

	function visualizeDjikstra() {
		const grid = getInitialGrid();
		const startNode =
			grid[GRID_NODES.START_NODE_ROW][GRID_NODES.START_NODE_COL];
		const finishNode =
			grid[GRID_NODES.FINISH_NODE_ROW][GRID_NODES.FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
		animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	}
	return {
		getNewGridWithWallToggled,
		animateDijkstra,
		animateShortestPath,
		visualizeDjikstra,
	};
}
