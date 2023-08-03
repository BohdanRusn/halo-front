import React, {useEffect, useState} from 'react';
import {Button, GameButtons} from "../../utils/styles";
import {useGenerateMaze} from "../../utils/hooks/useGenerateMaze";

const cellSize = 30;
const mazeWidth = 10;
const mazeHeight = 10;
const playerSize = 20;
const exitColor = 'green';
const player1Color = 'blue';
const player2Color = 'red';
const wallColor = 'black';

const findWinner = (array: number[][], player1: { x: number, y: number}, player2: { x: number, y: number}) => {
	const flattenArray = array.flat();
	const index = flattenArray.indexOf(2);
	
	if (index !== -1) {
		const exitX = Math.floor(index % array[0].length);
		const exitY = Math.floor(index / array[0].length);
		
		if (player1.x === exitX && Math.abs(player1.y - exitY) <= 1) {
			return 'First player is WINNER';
		}
		
		if (player1.y === exitY && Math.abs(player1.x - exitX) <= 1) {
			return 'First player is WINNER';
		}
		
		if (player2.x === exitX && Math.abs(player2.y - exitY) <= 1) {
			return 'Second player is WINNER';
		}
		
		if (player2.y === exitY && Math.abs(player2.x - exitX) <= 1) {
			return 'Second player is WINNER';
		}
	}
	
	return '';
}

const MazeGame = () => {
	const { maze, recreateMaze, generateRandomCoords } = useGenerateMaze(mazeWidth, mazeHeight);
	const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 });
	const [player2Position, setPlayer2Position] = useState({ x: 0, y: 0 });
	const [winner, setWinner] = useState('');
	const [isPlayer1Disabled, set1Disabled] = useState(false);
	const [isPlayer2Disabled, set2Disabled] = useState(true);
	
	useEffect(() => {
		const player1Coords = generateRandomCoords();
		const player2Coords = generateRandomCoords();
		
		setPlayer1Position(player1Coords);
		setPlayer2Position(player2Coords);
	}, [generateRandomCoords]);
	
	const handleGiveUp = () => {
		if (!winner) {
			if (isPlayer1Disabled && !isPlayer2Disabled) {
				setWinner('Second player is the WINNER');
			} else if (!isPlayer1Disabled && isPlayer2Disabled) {
				setWinner('First player is the WINNER');
			}
		}
	};
	
	const resetGame = () => {
		setWinner('');
		recreateMaze(mazeWidth, mazeHeight);
		
		const newPlayer1Position = generateRandomCoords();
		const newPlayer2Position = generateRandomCoords();
		
		setPlayer1Position(newPlayer1Position);
		setPlayer2Position(newPlayer2Position);
		
		set1Disabled(false);
		set2Disabled(true);
	};
	
	const drawMazeAndPlayers = () => {
		const canvas: HTMLCanvasElement = document.getElementById('mazeCanvas')! as any;
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw the maze
		for (let y = 0; y < maze.length; y++) {
			for (let x = 0; x < maze[y].length; x++) {
				ctx.beginPath();
				ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
				ctx.fillStyle = maze[y][x] === 1 ? wallColor : maze[y][x] === 0 ? 'white' : exitColor;
				ctx.fill();
				ctx.strokeStyle = 'black';
				ctx.stroke();
				ctx.closePath();
			}
		}
		
		// Draw player 1
		ctx.beginPath();
		ctx.rect(
			player1Position.x * cellSize + (cellSize - playerSize) / 2,
			player1Position.y * cellSize + (cellSize - playerSize) / 2,
			playerSize,
			playerSize
		);
		ctx.fillStyle = player1Color;
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.closePath();
		
		// Draw player 2
		ctx.beginPath();
		ctx.rect(
			player2Position.x * cellSize + (cellSize - playerSize) / 2,
			player2Position.y * cellSize + (cellSize - playerSize) / 2,
			playerSize,
			playerSize
		);
		ctx.fillStyle = player2Color;
		ctx.fill();
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.closePath();
		
		const gameWinner = findWinner(maze, player1Position, player2Position);
		if (gameWinner) {
			setWinner(gameWinner);
		}
	};
	
	useEffect(drawMazeAndPlayers, [player1Position, player2Position]);
	
	const handleKeyDown = (e: any) => {
		e.preventDefault();
		
		if (!winner){
			const x1 = player1Position.x;
			const y1 = player1Position.y;
			
			const x2 = player2Position.x;
			const y2 = player2Position.y;
			
			if (!isPlayer1Disabled && isPlayer2Disabled) {
				// Handle player 2 movement
				switch (e.key) {
					case 'w':
						if (y2 > 0 && maze[y2 - 1][x2] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x, y: prevPos.y - 1}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 's':
						if (y2 < mazeHeight - 1 && maze[y2 + 1][x2] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x, y: prevPos.y + 1}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 'a':
						if (x2 > 0 && maze[y2][x2 - 1] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x - 1, y: prevPos.y}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 'd':
						if (x2 < mazeWidth - 1 && maze[y2][x2 + 1] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x + 1, y: prevPos.y}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					default:
						break;
				}
			} else {
				// Handle player 1 movement
				switch (e.key) {
					case 'ArrowUp':
						if (y1 > 0 && maze[y1 - 1][x1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x, y: prevPos.y - 1}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowDown':
						if (y1 < mazeHeight - 1 && maze[y1 + 1][x1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x, y: prevPos.y + 1}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowLeft':
						if (x1 > 0 && maze[y1][x1 - 1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x - 1, y: prevPos.y}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowRight':
						if (x1 < mazeWidth - 1 && maze[y1][x1 + 1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x + 1, y: prevPos.y}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					default:
						break;
				}
			}
		}
		
	};
	
	return (
		<div tabIndex={0} onKeyDown={handleKeyDown}>
			<p>{winner ? winner : isPlayer1Disabled ? "Now its opponent's turn" : "Now its your turn"}</p>
			<canvas
				id="mazeCanvas"
				width={mazeWidth * cellSize}
				height={mazeHeight * cellSize}
			/>
			<GameButtons>
				<Button disabled={!!winner} onClick={handleGiveUp}>Give Up</Button>
				<Button disabled={!winner} onClick={resetGame}>Reset Game</Button>
			</GameButtons>
		</div>
	);
};

export default MazeGame;