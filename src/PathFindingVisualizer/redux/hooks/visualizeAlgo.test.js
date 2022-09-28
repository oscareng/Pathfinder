// UNIT TESTS USING JEST
// RUN `npm test` to run tests

import { createNode, getInitialGrid } from "./visualizeAlgo";

// testing createNode function
describe("createNode", () => {
	it("should be defined", () => {
		expect(createNode).toBeDefined();
	});
	it("should return an object", () => {
		expect(typeof createNode()).toBe("object");
	});
	it("should return an object with 8 properties", () => {
		expect(Object.keys(createNode()).length).toBe(8);
	});
	it("should set 'col' and 'row' properties from respective arguments", () => {
		expect(createNode(1, 2).col).toBe(1);
		expect(createNode(1, 2).row).toBe(2);
	});
	it("should be able to take in any positive number for arguments without boundary", () => {
		expect(createNode(Infinity, 100).col).toBe(Infinity);
		expect(createNode(100, Infinity).row).toBe(Infinity);
	});
	it("should be able to handle negative values for arguments without boundary", () => {
		expect(createNode(-1, -2).col).toBe(-1);
		expect(createNode(-1, -2).row).toBe(-2);
		expect(createNode(-Infinity, -2).col).toBe(-Infinity);
		expect(createNode(-1, -Infinity).row).toBe(-Infinity);
	});
	it("should be able to take in '0' as a col or row value", () => {
		expect(createNode(0, 0).col).toBe(0);
		expect(createNode(0, 0).row).toBe(0);
	});
	it("should set 'isStart' property to false if row and col do not match start node", () => {
		expect(createNode(1, 1).isStart).toBe(false);
	});
});

// testing getInitialGrid function
describe("getInitialGrid", () => {
	it("should be defined", () => {
		expect(getInitialGrid).toBeDefined();
	});
	it("should return an array", () => {
		expect(Array.isArray(getInitialGrid())).toBe(true);
	});
	it("should return an array with 20 subarrays", () => {
		expect(getInitialGrid().length).toBe(20);
	});
	it("should return 51 elements in each subarray", () => {
		expect(getInitialGrid()[0].length).toBe(51);
	});
	it("should render start node at row 10, col 15", () => {
		const grid = getInitialGrid();
		const startNode = grid[10][15];
		expect(getInitialGrid()[10][15]).toEqual(startNode);
	});
	it("should render finish node at row 10, col 35", () => {
		const grid = getInitialGrid();
		const finishNode = grid[10][35];
		expect(getInitialGrid()[10][35]).toEqual(finishNode);
	});
});
