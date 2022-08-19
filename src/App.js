import React from "react";
import PathFindingisualizer from "./PathFindingVisualizer/PathFindingVisualizer.js";
import { Provider } from "react-redux";
import store from "./store.js";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PathFindingisualizer></PathFindingisualizer>
      </Provider>
    </div>
  );
};

export default App;
