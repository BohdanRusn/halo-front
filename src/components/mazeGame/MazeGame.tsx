import React, {useContext, useEffect, useState} from 'react';
import {SocketContext} from "../../utils/context/SocketContext";

const cellSize = 30;
const mazeWidth = 10;
const mazeHeight = 10;
const playerSize = 20;
const exitColor = 'green';
const player1Color = 'blue';
const player2Color = 'red';
const wallColor = 'black';

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCoordinates(mazeData: number[][], occupiedCoordinates: [{ x: number, y: number }]) {
	const mazeWidth = mazeData[0].length;
	const mazeHeight = mazeData.length;
	
	let randomX = 0, randomY = 0;
	do {
		randomX = getRandomInt(1, mazeWidth - 2); // Exclude the border walls
		randomY = getRandomInt(1, mazeHeight - 2); // Exclude the border walls
	} while (mazeData[randomY][randomX] !== 0 || occupiedCoordinates.some(coords => coords.x === randomX && coords.y === randomY));
	
	return {x: randomX, y: randomY};
}


const mazeData = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
	[1, 0, 1, 0, 0, 0, 0, 1, 1, 1],
	[1, 0, 0, 0, 1, 1, 0, 0, 0, 2],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const findWinner = (array: number[][], player1: { x: number, y: number}, player2: { x: number, y: number}) => {
	const flattenArray = array.flat();
	const index = flattenArray.indexOf(2);
	
	if (index !== -1) {
		const x = Math.floor(index / array[0].length);
		const y = index % array[0].length - 1;
		if ( player1.x === x && player1.y === y ){
			return 'Second player is WINNER'
		}
		if ( player2.x === x && player2.y === y )
		return 'First player is WINNER';
	}
	
	return '';
}

const MazeGame = () => {
	const socket = useContext(SocketContext);
	
	const [player1Position, setPlayer1Position] = useState(
		generateRandomCoordinates(mazeData, [{x: 0, y: 0}])
	);
	const [player2Position, setPlayer2Position] = useState(
		generateRandomCoordinates(mazeData, [player1Position])
	);
	const [winner, setWinner] = useState('')
	const [isPlayer1Disabled, set1Disabled] = useState(false);
	const [isPlayer2Disabled, set2Disabled] = useState(true);
	console.log(findWinner(mazeData, player1Position, player2Position), player1Position, player2Position)
	const handleKeyDown = (e: any) => {
		e.preventDefault();
		
		if (!winner){
			if (!winner) {
				socket.emit('player_move', {
					playerId: isPlayer1Disabled ? 2 : 1,
					move: e.key,
				});
			}
			const x1 = player1Position.x;
			const y1 = player1Position.y;
			
			const x2 = player2Position.x;
			const y2 = player2Position.y;
			
			if (!isPlayer1Disabled && isPlayer2Disabled) {
				// Handle player 2 movement
				console.log(e.key)
				switch (e.key) {
					case 'w':
						if (y2 > 0 && mazeData[y2 - 1][x2] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x, y: prevPos.y - 1}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 's':
						if (y2 < mazeHeight - 1 && mazeData[y2 + 1][x2] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x, y: prevPos.y + 1}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 'a':
						if (x2 > 0 && mazeData[y2][x2 - 1] === 0) {
							setPlayer2Position((prevPos) => ({x: prevPos.x - 1, y: prevPos.y}));
							set1Disabled(true);
							set2Disabled(false);
						}
						break;
					case 'd':
						if (x2 < mazeWidth - 1 && mazeData[y2][x2 + 1] === 0) {
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
						if (y1 > 0 && mazeData[y1 - 1][x1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x, y: prevPos.y - 1}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowDown':
						if (y1 < mazeHeight - 1 && mazeData[y1 + 1][x1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x, y: prevPos.y + 1}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowLeft':
						if (x1 > 0 && mazeData[y1][x1 - 1] === 0) {
							setPlayer1Position((prevPos) => ({x: prevPos.x - 1, y: prevPos.y}));
							set1Disabled(false);
							set2Disabled(true);
						}
						break;
					case 'ArrowRight':
						if (x1 < mazeWidth - 1 && mazeData[y1][x1 + 1] === 0) {
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
	
	useEffect(() => {
		// Draw the maze and players on the canvas
		const canvas: HTMLCanvasElement = document.getElementById('mazeCanvas')! as any;
		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw the maze
		for (let y = 0; y < mazeData.length; y++) {
			for (let x = 0; x < mazeData[y].length; x++) {
				ctx.beginPath();
				ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
				ctx.fillStyle =
					mazeData[y][x] === 1 ? wallColor : mazeData[y][x] === 0 ? 'white' : exitColor;
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
		const gameWinner = findWinner(mazeData, player1Position, player2Position);
		if (gameWinner){
			setWinner(gameWinner);
		}
	}, [player1Position, player2Position]);
	
	return (
		<div tabIndex={0} onKeyDown={handleKeyDown}>
			<p>{winner ? winner : isPlayer1Disabled ? "Now its opponent's turn" : "Now its your turn"}</p>
			<canvas
				id="mazeCanvas"
				width={mazeWidth * cellSize}
				height={mazeHeight * cellSize}
			></canvas>
		</div>
	);
};

export default MazeGame;