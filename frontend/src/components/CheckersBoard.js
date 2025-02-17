import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cell from "./Cell";

import CheckersPiece from "../classes/checkers/CheckersPiece";
import CheckersGame from "../classes/checkers/CheckersGame";
import GameOverComponent from "./GameOverComponent";

const game = new CheckersGame();

const CheckersBoard = () => {
	const { username, checkersPieceColor } = useSelector(state => state.user);
	const { socket } = useSelector(state => state.socket);
	const checkersSockets = useSelector(state => state.checkersSockets);

	const [board, setBoard] = useState([
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	]);

	const [gameOver, setGameOver] = useState({
		gameOver: false,
		winnerName: null,
		winnerColor: null
	});

	useEffect(() => {
		let tempBoard = board.map(r => r);

		for (let row = 0; row < tempBoard.length; row++) {
			for (let col = 0; col < tempBoard.length; col++) {
				if (row < 2) {
					if (row === 0 && col % 2 === 0) {
						tempBoard[row][col] = new CheckersPiece("white", [row, col]);
					} else if (row === 1 && col % 2 !== 0) {
						tempBoard[row][col] = new CheckersPiece("white", [row, col]);
					}
				}

				if (row > 5) {
					if (row === 6 && col % 2 === 0) {
						tempBoard[row][col] = new CheckersPiece("red", [row, col]);
					} else if (row === 7 && col % 2 !== 0) {
						tempBoard[row][col] = new CheckersPiece("red", [row, col]);
					}
				}
			}
		}

		setBoard(tempBoard);
	}, []);

	useEffect(() => {
		socket.on("opponentPlayedAMove", ({ cellsClicked }) => {
			let tempBoard = board.map(b => b);

			game.movePiece(tempBoard, cellsClicked);

			setBoard(tempBoard);
		});

		socket.on("gameHasEnded", gameOverObject => setGameOver(gameOverObject));
	}, [socket]);

	const getPlayerName = player => {
		// player can be self or opponent
		if (player === "self") return username;

		for (let i = 0; i < checkersSockets.length; i++) {
			if (
				checkersSockets[i].checkersPieceColor &&
				checkersSockets[i].checkersPieceColor !== checkersPieceColor
			) {
				return checkersSockets[i].username;
			}
		}
	};

	const showMoves = (row, col) => {
		if (!gameOver.gameOver) {
			let tempBoard = board.map(b => b);
			let cellsClicked = game.showValidMoves(
				checkersPieceColor,
				tempBoard,
				row,
				col
			);
			setBoard(tempBoard);

			if (cellsClicked && cellsClicked.rows.length === 2) {
				socket.emit("movePlayed", { cellsClicked });
			}

			let isGameOver = game.isGameOver(board);

			if (isGameOver) {
				let newGameOverObject = {
					gameOver: true,
					winnerColor: game.winner,
					winnerName:
						game.winner === checkersPieceColor
							? getPlayerName("self")
							: getPlayerName("opponent")
				};

				socket.emit("gameOver", newGameOverObject);

				setGameOver(newGameOverObject);
			}
		}
	};

	return (
		<div>
			<div>{getPlayerName("opponent")}</div>
			<div id="checkersBoard" style={{ position: "relative" }}>
				{gameOver.gameOver && (
					<GameOverComponent
						winnerColor={gameOver.winnerColor}
						winnerName={gameOver.winnerName}
					/>
				)}
				<div
					style={{
						display: "flex",
						flexDirection:
							checkersPieceColor === "red" ? "column" : "column-reverse"
					}}
				>
					{board.map((row, ri) => {
						return (
							<div
								style={{ margin: 0, padding: 0, display: "flex" }}
								key={`row${ri}`}
							>
								{row.map((col, ci) => {
									let color = (ri + ci) % 2 === 0 ? "black" : "red";

									let image = "";
									let piece = board[ri][ci];
									let blueDot;

									if (piece !== 0) {
										if (piece.color === "white") {
											if (piece.isKing)
												image = "images/checkers/WhiteKing.png";
											else image = "images/checkers/WhitePiece.png";
										} else if (piece === "dot") {
											blueDot = true;
										} else {
											if (piece.isKing)
												image = "images/checkers/RedKing.png";
											else image = "images/checkers/RedPiece.png";
										}
									}

									return (
										<Cell
											game="checkers"
											blueDot={blueDot}
											board={board}
											row={ri}
											col={ci}
											color={color}
											key={`row${ri}-col${ci}`}
											image={image}
											showMoves={showMoves}
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
			<div>{getPlayerName("self")}</div>
		</div>
	);
};

export default CheckersBoard;
