import React, { useState, useEffect } from "react";
import Cell from "../components/Cell";

import CheckersPiece from "../classes/checkers/Piece";
import move_piece from "../classes/checkers/checkersLogic";

const CheckersScreen = ({ updateCellsClicked, cellsClicked }) => {
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

	let numClick = 0;

	useEffect(() => {
		let tempBoard = board.map(r => r);

		for (let row = 0; row < tempBoard.length; row++) {
			for (let col = 0; col < tempBoard.length; col++) {
				if (row < 2) {
					if (row === 0 && col % 2 === 0) {
						tempBoard[row][col] = new CheckersPiece("W", [row, col]);
					} else if (row === 1 && col % 2 !== 0) {
						tempBoard[row][col] = new CheckersPiece("W", [row, col]);
					}
				}

				if (row > 5) {
					if (row === 6 && col % 2 === 0) {
						tempBoard[row][col] = new CheckersPiece("R", [row, col]);
					} else if (row === 7 && col % 2 !== 0) {
						tempBoard[row][col] = new CheckersPiece("R", [row, col]);
					}
				}
			}
		}

		setBoard(tempBoard);
		console.log(board);
	}, []);

	const showMoves = (row, col) => {
		let allMoves;

		let tempBoard = board.map(r => r);

		for (let row = 0; row < tempBoard.length; row++) {
			for (let col = 0; col < tempBoard.length; col++) {
				if (tempBoard[row][col] === "dot") {
					tempBoard[row][col] = 0;
				}
			}
		}

		if (tempBoard[row][col] !== 0 && numClick === 0) {
			allMoves = tempBoard[row][col].get_valid_moves(tempBoard);
			for (let i = 0; i < allMoves.length; i++) {
				tempBoard[allMoves[i][0]][allMoves[i][1]] = "dot";
			}
			numClick++;
		}

		setBoard(tempBoard);

		updateCellsClicked(row, col);

		if (numClick === 2) {
			// call the move function
			tempBoard = board.map(r => r);
			let movedBoard = move_piece(tempBoard, cellsClicked); //cells cellsClicked)
			setBoard(movedBoard);
			numClick = 0;
			updateCellsClicked(null, null, true);
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				minWidth: "100vw",
				paddingRight: "2rem"
			}}
		>
			<div>
				{board.map((row, ri) => {
					return (
						<div
							style={{ margin: 0, padding: 0, display: "flex" }}
							key={`row${ri}`}
						>
							{row.map((col, ci) => {
								let color = (ri + ci) % 2 === 0 ? "black" : "red";

								let image = null;
								let piece = board[ri][ci];
								let blueDot;

								if (piece !== 0) {
									if (piece.color === "W") {
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
	);
};

export default CheckersScreen;
