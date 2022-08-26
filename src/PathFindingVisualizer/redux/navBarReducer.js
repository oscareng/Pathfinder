const TOGGLE_MENU = "TOGGLE_MENU";
const TOGGLE_ALGO = "TOGGLE_ALGO";

const initialState = { status: false, algo: null };

const _toggleMenu = (boolean) => ({
  type: TOGGLE_MENU,
  status: boolean,
});

export const toggleMenu = (boolean) => (dispatch) => {
  dispatch(_toggleMenu(boolean));
};

const _setAlgorithim = (key) => ({
  type: TOGGLE_ALGO,
  algo: key,
});

export const setAlgorithim = (key) => (dispatch) => {
  console.log(key);
  if (key === "astar") {
    dispatch(_setAlgorithim(key));
  } else if (key === "djikstra") {
    dispatch(_setAlgorithim(key));
  } else if (key === "breadthFirstSearch") {
    dispatch(_setAlgorithim(key));
  } else {
    console.log(`setAlgo thunk error!`);
  }
};

export default function navBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, status: action.status };
    case TOGGLE_ALGO:
      return { ...state, algo: action.algo };
    default:
      return state;
  }
}
