import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Cell from "./Cell";
import Pawn from "../classes/chess/Pawn";
import Rook from "../classes/chess/Rook";
import Knight from "../classes/chess/Knight";
import Bishop from "../classes/chess/Bishop";
import King from "../classes/chess/King";
import Queen from "../classes/chess/Queen";
import ChessGame from "../classes/chess/ChessGame";

const game = new ChessGame();

const ChessBoard = () => {
	const [board, setBoard] = useState([
		[
			new Rook("black", 0, 0),
			new Knight("black", 0, 1),
			new Bishop("black", 0, 2),
			new King("black", 0, 3),
			new Queen("black", 0, 4),
			new Bishop("black", 0, 5),
			new Knight("black", 0, 6),
			new Rook("black", 0, 7)
		],
		[
			new Pawn("black", 1, 0),
			new Pawn("black", 1, 1),
			new Pawn("black", 1, 2),
			new Pawn("black", 1, 3),
			new Pawn("black", 1, 4),
			new Pawn("black", 1, 5),
			new Pawn("black", 1, 6),
			new Pawn("black", 1, 7)
		],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[
			new Pawn("white", 6, 0),
			new Pawn("white", 6, 1),
			new Pawn("white", 6, 2),
			new Pawn("white", 6, 3),
			new Pawn("white", 6, 4),
			new Pawn("white", 6, 5),
			new Pawn("white", 6, 6),
			new Pawn("white", 6, 7)
		],
		[
			new Rook("white", 7, 0),
			new Knight("white", 7, 1),
			new Bishop("white", 7, 2),
			new King("white", 7, 3),
			new Queen("white", 7, 4),
			new Bishop("white", 7, 5),
			new Knight("white", 7, 6),
			new Rook("white", 7, 7)
		]
	]);

	const { socket } = useSelector(state => state.socket);
	const { chessPieceColor } = useSelector(state => state.user);

	const [gameOver, setGameOver] = useState({
		gameOver: false,
		winnerName: null,
		winnerColor: null
	});

	useEffect(() => {
		socket.on("opponentPlayedAMove", ({ cellsClicked }) => {
			let tempBoard = board.map(b => b);
			game.movePiece(tempBoard, cellsClicked);
			setBoard(tempBoard);
		});
	}, [socket]);

	const showMoves = (row, col) => {
		let tempBoard = board.map(b => b);
		let tempCellsClicked = game.showValidMoves(chessPieceColor, tempBoard, row, col);

		// console.log(tempCellsClicked);
		setBoard(tempBoard);

		if (game.isGameOver(board)) {
			console.log("game over ", game.winner, " won");
		}

		// only return when len(tempCellsClicked.rows === 2) as we don't want to
		// show the opponent's moves to the player
		if (tempCellsClicked && false) {
			// cancelling for now
			if (tempCellsClicked.rows.length === 2) {
				socket.emit("movePlayed", { cellsClicked: tempCellsClicked });
			}
		}
	};

	const showChessBoard = () => {
		return board.map((row, ri) => {
			return (
				<div style={{ margin: 0, padding: 0, display: "flex" }} key={`row${ri}`}>
					{row.map((col, ci) => {
						let color =
							(ri + ci) % 2 === 0 ? "rgb(195,105,56)" : "rgb(239, 206,163)";

						let piece = board[ri][ci];
						let blueDot, redDot, isClicked;

						if (piece === "dot") {
							blueDot = true;
						}

						if (piece !== 0) {
							if (piece.isBeingAttacked) {
								redDot = true;
							}

							if (piece.isClicked) {
								isClicked = true;
							}
						}

						return (
							<Cell
								game="chess"
								blueDot={blueDot}
								redDot={redDot}
								isClicked={isClicked}
								row={ri}
								col={ci}
								color={color}
								key={`row${ri}-col${ci}`}
								image={piece.image ? piece.image : false}
								showMoves={showMoves}
							/>
						);
					})}
				</div>
			);
		});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: chessPieceColor === "white" ? "column" : "column-reverse"
			}}
		>
			{showChessBoard(chessPieceColor)}
		</div>
	);
};

export default ChessBoard;
