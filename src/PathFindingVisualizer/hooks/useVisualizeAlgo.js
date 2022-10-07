import { dijkstra } from "../../Algorithms/dijkstra";
import { breadthFirstSearch } from "../../Algorithms/breadthFirstSearch.js";
import { aStar } from "../../Algorithms/astar.js";
import { useDispatch } from "react-redux";
import { setGrid, setStartOrFinish } from "../redux/gridReducer";
import { useSelector } from "react-redux";
import { recursiveBackTrackerMaze } from "../../Algorithms/MazeAlgorithms/recursive-backtracker";
import useVisualizeGraph from "./useGraph";
import { randomizedPrim } from "../../Algorithms/MazeAlgorithms/randomized-prim";
import { setAnimationActive, toggleHelpSetAlgo } from "../redux/navBarReducer";

export default function useVisualizeAlgo() {
  const { getNewGridWithAllWallsToggled, clearBoard, createGridHelper } =
    useVisualizeGraph();
  const pathKey = useSelector((state) => state.menu.algo);
  const mazeKey = useSelector((state) => state.menu.maze);
  const nodes = useSelector((state) => state.grid.grid);
  const startNode = useSelector((state) => state.grid.start);
  const endNode = useSelector((state) => state.grid.finish);

  const dispatch = useDispatch();

  const { row: startRow, col: startCol } = useSelector(
    (state) => state.grid.start
  );
  const { row: endRow, col: endCol } = useSelector(
    (state) => state.grid.finish
  );

  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== undefined) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    const timeToAnimate =
      visitedNodesInOrder.length * 50 + nodesInShortestPathOrder.length * 50;
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 50 * i);
        return timeToAnimate;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 50 * i);
    }
  }

  function animateMaze(newGrid) {
    const walls = [];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        let node = newGrid[i][j];
        if (node.isWall) {
          walls.push(node);
        }
      }
    }

    for (let x = 0; x < walls.length; x++) {
      setTimeout(() => {
        let wall = walls[x];
        document.getElementById(`node-${wall.row}-${wall.col}`).className =
          "node node-visited-wall node-wall";
      }, 15 * x);
    }

    const timeToAnimate = walls.length * 15;

    setTimeout(() => {
      dispatch(setGrid(newGrid));
      dispatch(setAnimationActive(false));
    }, timeToAnimate + 500);

    return timeToAnimate + 500;
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
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const timeToAnimate = animateAlgorithm(
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    return timeToAnimate;
  }

  function visualizeAStar() {
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const timeToAnimate = animateAlgorithm(
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    return timeToAnimate;
  }

  function visualizeBreadthFirstSearch() {
    const grid = nodes;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    const timeToAnimate = animateAlgorithm(
      visitedNodesInOrder,
      nodesInShortestPathOrder
    );
    return timeToAnimate;
  }

  function sortAlgorithms() {
    const pathfindingAlgo =
      pathKey === "astar"
        ? visualizeAStar
        : pathKey === "dijkstra"
        ? visualizeDjikstra
        : pathKey === "breadthFirstSearch"
        ? visualizeBreadthFirstSearch
        : "none";

    if (pathfindingAlgo !== "none") {
      dispatch(setAnimationActive(true));
      const timeToAnimate = pathfindingAlgo();
      setTimeout(() => {
        dispatch(setAnimationActive(false));
      }, timeToAnimate + 500);
    } else {
      const errorMsg = document.getElementsByClassName("error-message-hidden");
      console.log(errorMsg);
      errorMsg[0].classList.add("visible");
      setTimeout(() => {
        errorMsg[0].classList.remove("visible");
      }, 2000);
    }
  }

  function visualizeRecursiveDFSMaze() {
    clearBoard();
    dispatch(setAnimationActive(true));
    const resetGrid = createGridHelper();
    const grid = getNewGridWithAllWallsToggled(resetGrid);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const newGrid = recursiveBackTrackerMaze(grid, startNode, finishNode);
    const timeToAnimate = animateMaze(newGrid);
    return timeToAnimate;
  }

  function visualizePrim() {
    clearBoard();
    dispatch(setAnimationActive(true));
    const resetGrid = createGridHelper();
    const grid = getNewGridWithAllWallsToggled(resetGrid);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    const newGrid = randomizedPrim(grid, startNode, finishNode);
    const timeToAnimate = animateMaze(newGrid);
    return timeToAnimate;
  }

  return {
    animateShortestPath,
    getNodesInShortestPathOrder,
    animateAlgorithm,
    visualizeDjikstra,
    visualizeAStar,
    visualizeBreadthFirstSearch,
    sortAlgorithms,
    visualizeRecursiveDFSMaze,
    visualizePrim,
    nodes,
    startNode,
    endNode,
  };
}
