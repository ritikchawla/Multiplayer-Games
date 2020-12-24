import React, { useState } from "react";
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

	const showMoves = (row, col) => {
		let tempBoard = board.map(b => b);
		game.showValidMoves(tempBoard, row, col);

		// game.select(tempBoard, row, col);
		// console.log("cells clicked = ", game.cellsClicked);
		// console.log("numClicks = ", game.numClicks);
		// console.log("turn = ", game.turn);
		// console.table(tempBoard);
		setBoard(tempBoard);
	};

	return (
		<div>
			{board.map((row, ri) => {
				return (
					<div
						style={{ margin: 0, padding: 0, display: "flex" }}
						key={`row${ri}`}
					>
						{row.map((col, ci) => {
							let color =
								(ri + ci) % 2 === 0
									? "rgb(195,105,56)"
									: "rgb(239, 206,163)";

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
			})}
		</div>
	);
};

export default ChessBoard;
