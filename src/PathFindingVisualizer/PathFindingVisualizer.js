import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Node from "./Node/Node.js";
import { setGrid, resetGrid } from "./redux/gridReducer";
import "./PathFindingVisualizer.css";
import visualizeAlgo from "./redux/hooks/visualizeAlgo.js";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch.js";
import { aStar } from "../algorithms/astar.js";
import Navbar from "./Navbar/Navbar.js";
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathFindingVisualizer = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.grid);
  const { getNewGridWithWallToggled, clearBoard, getNodesInShortestPathOrder } =
    visualizeAlgo();
  const [click, setClick] = useState(false);
  const key = useSelector((state) => state.menu.algo);

  useEffect(() => {
    dispatch(setGrid());
  }, []);

  function handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(nodes, row, col);
    dispatch(setGrid(newGrid));
    setClick(true);
  }

  function handleMouseUp() {
    setClick(false);
  }

  function handleMouseEnter(row, col) {
    if (click === false) return;
    const newGrid = getNewGridWithWallToggled(nodes, row, col);
    dispatch(setGrid(newGrid));
  }

  function animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
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
    const grid = nodes;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    //set time out later
    const newGrid = grid.slice();
    dispatch(setGrid(newGrid));
  }

  function visualizeAStar() {
    const grid = nodes;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function visualizeBreadthFirstSearch() {
    const grid = nodes;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function sortAlgorithms() {
    if (key === "astar") {
      visualizeAStar();
    } else if (key === "djikstra") {
      visualizeDjikstra();
    } else if (key === "breadthFirstSearch") {
      visualizeBreadthFirstSearch();
    } else {
      console.log(`no algorithm has been set!`);
    }
  }

  return nodes !== undefined ? (
    <>
      <Navbar></Navbar>
      <button
        onClick={() => {
          sortAlgorithms();
        }}
      >
        Visualize!
      </button>
      <button
        onClick={() => {
          dispatch(resetGrid());
          clearBoard();
        }}
      >
        Clear Board
      </button>
      <div className="main">
        <div className="grid">
          {nodes.map((row, rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((node, colIdx) => {
                  const {
                    col,
                    row,
                    isStart,
                    isFinish,
                    isWall,
                    key,
                    id,
                    distance,
                  } = node;
                  return (
                    <Node
                      distance={distance}
                      id={id}
                      row={row}
                      col={col}
                      key={key}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      onMouseDown={(row, col) => handleMouseDown(row, col)}
                      onMouseUp={handleMouseUp}
                      onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <div className="loading">loading</div>
  );
};

export default PathFindingVisualizer;
