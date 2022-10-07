import { v4 as uuid } from "uuid";

const START_NODE_ROW = 9;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 9;
const FINISH_NODE_COL = 28;

const initialState = {
	grid: [],
	start: { row: 9, col: 10 },
	finish: { row: 9, col: 28 },
};

const CREATE_GRID = "CREATE_GRID";
const SET_START = "SET_START";
const SET_FINISH = "SET_FINISH";

function createGridHelper() {
  const nodes = [];
  for (let row = 0; row <= 18; row++) {
    const currentRow = [];
    for (let col = 0; col <= 38; col++) {
      const currentNode = {
        id: `node-${row}-${col}`,
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        isVisited: false,
        distance: Infinity,
        distanceFromStart: Infinity,
        estimatedDistanceToEnd: Infinity,
        isWeighted: false,
        isVisitedMaze: false,
        key: uuid(),
      };

			currentRow.push(currentNode);
		}
		nodes.push(currentRow);
	}
	return nodes;
}

const _createGrid = (grid) => ({
	type: CREATE_GRID,
	grid,
});

const setStart = (start) => ({
	type: SET_START,
	start,
});

const setFinish = (finish) => ({
	type: SET_FINISH,
	finish,
});

export const setGrid = (grid) => (dispatch) => {
	if (!grid) {
		const grid = createGridHelper();
		dispatch(_createGrid(grid));
	} else {
		dispatch(_createGrid(grid));
	}
};

export const setStartOrFinish = (row, col, hex) => (dispatch) => {
	if (hex === "start") {
		dispatch(setStart({ row, col }));
	} else if (hex === "finish") {
		dispatch(setFinish({ row, col }));
	}
};

export const resetStartAndFinish = (grid) => (dispatch) => {
	dispatch(setStart({ row: 9, col: 10 }));
	dispatch(setFinish({ row: 9, col: 28 }));
};

export const resetGrid = () => (dispatch) => {
	const grid = createGridHelper();
	dispatch(_createGrid(grid));
};

export default function gridReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_GRID:
			return { ...state, grid: action.grid };
		case SET_START:
			return { ...state, start: action.start };
		case SET_FINISH:
			return { ...state, finish: action.finish };
		default:
			return state;
	}
}
