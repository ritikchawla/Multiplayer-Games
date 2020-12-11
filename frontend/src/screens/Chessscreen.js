import React, { useState, useEffect } from "react";
import Cell from "../components/Cell";

const Chessscreen = () => {
	const [board, setBoard] = useState([
		["BR", "BKn", "BB", "BK", "BQ", "BB", "BKn", "BR"],
		["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
		["WR", "WKn", "WB", "WK", "WQ", "WB", "WKn", "WR"]
	]);

	useEffect(() => {
		let tempBoard = board.map(r => r);

		for (let row = 0; row < tempBoard.length; row++) {
			for (let col = 0; col < tempBoard.length; col++) {
				// if (row < 2) {
				// 	if (row === 0 && col % 2 === 0) {
				// 		tempBoard[row][col] = new CheckersPiece("W", [row, col]);
				// 	} else if (row === 1 && col % 2 !== 0) {
				// 		tempBoard[row][col] = new CheckersPiece("W", [row, col]);
				// 	}
				// }
				// if (row > 5) {
				// 	if (row === 6 && col % 2 === 0) {
				// 		tempBoard[row][col] = new CheckersPiece("R", [row, col]);
				// 	} else if (row === 7 && col % 2 !== 0) {
				// 		tempBoard[row][col] = new CheckersPiece("R", [row, col]);
				// 	}
				// }
			}
		}

		setBoard(tempBoard);

		console.log(board);
	}, []);
	return (
		<div>
			{board.map((row, ri) => {
				return (
					<div style={{ margin: 0, padding: 0, display: "flex" }} key={`row${ri}`}>
						{row.map((col, ci) => {
							let color =
								(ri + ci) % 2 === 0 ? "rgb(195,105,56)" : "rgb(239, 206,163)";

							let image = null;
							let piece = board[ri][ci];
							let blueDot;

							// if (piece !== 0) {
							// 	if (piece.color === "W") {
							// 		if (piece.isKing) image = "images/WhiteKing.png";
							// 		else image = "images/WhitePiece.png";
							// 	} else if (piece === "dot") {
							// 		blueDot = true;
							// 	} else {
							// 		if (piece.isKing) image = "images/RedKing.png";
							// 		else image = "images/RedPiece.png";
							// 	}
							// }

							return (
								<Cell
									blueDot={blueDot}
									board={board}
									row={ri}
									col={ci}
									color={color}
									key={`row${ri}-col${ci}`}
									image={image}
									// showMoves={showMoves}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default Chessscreen;
