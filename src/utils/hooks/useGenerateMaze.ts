import {useCallback, useState} from "react";

const generateMazeData = (width: number, height: number) => {
	const maze = Array.from({ length: height }, () => Array(width).fill(1));
	
	function carvePassage(x: number, y: number) {
		maze[y][x] = 0;
		
		const directions = [
			[x, y - 2],
			[x, y + 2],
			[x - 2, y],
			[x + 2, y],
		];
		
		shuffleArray(directions);
		
		for (const [nextX, nextY] of directions) {
			if (nextX >= 0 && nextX < width && nextY >= 0 && nextY < height && maze[nextY][nextX] === 1) {
				maze[nextY][nextX] = 0;
				maze[(y + nextY) / 2][(x + nextX) / 2] = 0;
				carvePassage(nextX, nextY);
			}
		}
	}
	
	function shuffleArray(array: number[][]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	
	// Generate the maze without the '2'
	const startX = Math.floor(Math.random() * (width - 1)) + 1;
	const startY = Math.floor(Math.random() * (height - 1)) + 1;
	
	carvePassage(startX, startY);
	
	// Find a valid exit position connected to the maze
	let exitPosition = null;
	for (let x = 1; x < width - 1; x++) {
		if (maze[1][x] === 0) {
			exitPosition = { x, y: 0 };
			break;
		}
		if (maze[height - 2][x] === 0) {
			exitPosition = { x, y: height - 1 };
			break;
		}
	}
	for (let y = 1; y < height - 1; y++) {
		if (maze[y][1] === 0) {
			exitPosition = { x: 0, y };
			break;
		}
		if (maze[y][width - 2] === 0) {
			exitPosition = { x: width - 1, y };
			break;
		}
	}
	
	// Place the exit '2' on the valid exit position
	if (exitPosition) {
		maze[exitPosition.y][exitPosition.x] = 2;
	}
	
	return maze;
};

const generateRandomCoordinates = (maze: number[][], occupiedCoordinates: { x: number, y: number }[]) => {
	const mazeWidth = maze[0].length;
	const mazeHeight = maze.length;
	
	let randomX = 0, randomY = 0;
	do {
		randomX = Math.floor(Math.random() * (mazeWidth - 2)) + 1; // Exclude the border walls
		randomY = Math.floor(Math.random() * (mazeHeight - 2)) + 1; // Exclude the border walls
	} while (maze[randomY][randomX] !== 0 || occupiedCoordinates.some(coords => coords.x === randomX && coords.y === randomY));
	
	return { x: randomX, y: randomY };
};

interface GenerateMazeRes {
	maze: number[][];
	recreateMaze: (newWidth: number, newHeight: number) => void;
	generateRandomCoords: () => {x: number, y: number } ;
}

export const useGenerateMaze = (initialWidth: number, initialHeight: number): GenerateMazeRes => {
	const [maze, setMaze] = useState(() => generateMazeData(initialWidth, initialHeight));
	
	const recreateMaze = useCallback((newWidth: number, newHeight: number) => {
		setMaze(generateMazeData(newWidth, newHeight));
	}, []);
	
	const generateRandomCoords = useCallback(() => {
		const occupiedCoords = [{ x: 0, y: 0 }]; // Add any other occupied coordinates if needed
		return generateRandomCoordinates(maze, occupiedCoords);
	}, [maze]);
	
	return { maze, recreateMaze, generateRandomCoords  };
}