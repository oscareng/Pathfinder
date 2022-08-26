const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const initialState = [];

const CREATE_GRID = "CREATE_GRID";
const MOUSE_IS_PRESSED = "MOUSE_IS_PRESSED";

const _createGrid = (grid) => ({
  type: CREATE_GRID,
  grid,
});

export const mouseIsPressed = (mouseDown) => ({
  type: mouseIsPressed,
  mouseDown,
});

function createGridHelper() {
  const nodes = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
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
      };
      currentRow.push(currentNode);
    }
    nodes.push(currentRow);
  }
  return nodes;
}

export const setGrid = (grid) => (dispatch) => {
  if (!grid) {
    const grid = createGridHelper();
    dispatch(_createGrid(grid));
  } else {
    dispatch(_createGrid(grid));
  }
};

export const resetGrid = () => (dispatch) => {
  const grid = createGridHelper();
  dispatch(_createGrid(grid));
};
export default function gridReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_GRID:
      return action.grid;
    case MOUSE_IS_PRESSED:
      return action.mouseDown;
    default:
      return state;
  }
}
