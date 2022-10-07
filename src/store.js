import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import gridReducer from "./PathFindingVisualizer/redux/gridReducer.js";
import navBarReducer from "./PathFindingVisualizer/redux/navBarReducer.js";
const reducer = combineReducers({ grid: gridReducer, menu: navBarReducer });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export default createStore(reducer, middleware);
