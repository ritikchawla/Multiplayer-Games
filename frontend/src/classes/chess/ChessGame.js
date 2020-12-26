import Piece from "./ChessPiece";

class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
		this.whiteKingPos = [7, 3];
		this.blackKingPos = [0, 3];
		this.whiteKingInCheck = false;
		this.blackKingInCheck = false;
		this.pieceCheckingWhiteKing = null;
		this.pieceCheckingBlackKing = null;
		this.kingParams = {};
	}

	/*
    parameters to pass to validmoves function
    0. Board
    1. need to pass if kings are in check.
    2. position of the kings.
    3. piece that is chekcing the king.
    */

	setKingParams = () => {
		this.kingParams = {
			whiteKingInCheck: this.whiteKingInCheck,
			blackKingInCheck: this.blackKingInCheck,
			whiteKingPos: this.whiteKingPos,
			blackKingPos: this.blackKingPos,
			pieceCheckingWhiteKing: this.pieceCheckingWhiteKing,
			pieceCheckingBlackKing: this.pieceCheckingBlackKing
		};
	};

	clearDots = board => {
		for (let row = 0; row < board.length; row++) {
			for (let col = 0; col < board.length; col++) {
				if (board[row][col] === "dot") {
					board[row][col] = 0;
				}

				if (board[row][col] !== 0) {
					if (board[row][col].isBeingAttacked) {
						board[row][col].isBeingAttacked = false;
					}

					if (board[row][col].isClicked) {
						board[row][col].isClicked = false;
					}
				}
			}
		}
	};

	showDots = (board, moves) => {
		Object.keys(moves).forEach(key => {
			// key = row,col
			const [row, col] = key.split(",").map(k => Number(k));

			if (moves[key] === "valid") {
				board[row][col] = "dot";
			} else if (moves[key] === "capturing") {
				board[row][col].isBeingAttacked = true;
			}
		});
	};

	showValidMoves = (userColor, board, row, col) => {
		if (
			!userColor &&
			board[row][col] instanceof Piece &&
			this.numClicks === 0 &&
			board[row][col].color !== userColor
		)
			return;

		this.clearDots(board);

		if (board[row][col] !== 0 && board[row][col] !== "dot") {
			if (board[row][col].color === this.turn) {
				// console.log("calculating piece moves");

				let piece = board[row][col];

				this.showDots(board, piece.validMoves(board, this.kingParams));

				piece.isClicked = true;
			}
		}
		let tempCellsClicked = this.select(board, row, col);

		return tempCellsClicked;
	};

	setKingInCheck = (board, kingColor, lastMovedPiece) => {
		if (kingColor === "white") {
			let kingPos =
				String(this.whiteKingPos[0]) + "," + String(this.whiteKingPos[1]);

			if (kingPos in lastMovedPiece.validMoves(board)) {
				this.whiteKingInCheck = true;
			}
		} else if (kingColor === "black") {
			let kingPos =
				String(this.blackKingPos[0]) + "," + String(this.blackKingPos[1]);

			if (kingPos in lastMovedPiece.validMoves(board)) {
				// need to set this to false somewhere
				this.blackKingInCheck = true;
			}
		}

		if (this.whiteKingInCheck) {
			let [r, c] = this.whiteKingPos;
			board[r][c].isBeingAttacked = true;
		}

		if (this.blackKingInCheck) {
			let [r, c] = this.blackKingPos;
			board[r][c].isBeingAttacked = true;
		}

		this.setKingParams();
	};

	select = (board, row, col) => {
		// console.log("select called");
		if (this.numClicks === 0) {
			if (board[row][col] === 0) return;
			else if (board[row][col] === "dot") return;
			else if (board[row][col].color !== this.turn) return;
			else {
				this.cellsClicked.rows.push(row);
				this.cellsClicked.cols.push(col);
				this.numClicks++;
				return this.cellsClicked;
			}
		} else if (this.numClicks === 1) {
			// a piece has already been clicked

			if (board[row][col] instanceof Piece) {
				// if player clicked on another piece of his color, do not changeTurn

				if (board[row][col].color === this.turn) {
					this.cellsClicked.rows[0] = row;
					this.cellsClicked.cols[0] = col;
					return this.cellsClicked;
				}
			}

			let str = String(row) + "," + String(col);
			let piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];

			if (!(str in piece.validMoves(board))) {
				return;
			}

			// update this.cellsClicked for socket connection
			this.cellsClicked.rows.push(row);
			this.cellsClicked.cols.push(col);

			let tempCellsClicked = this.movePiece(board, this.cellsClicked);

			// check if king is in check
			// as the previous move might have been by white, and after movePiece()
			// changes the turn, now it's black's turn and we need to check if
			// black king is in check
			// the piece has moved and it's row and columns have been changed so there
			// is no point in passing the previously calculated moves to this function
			this.setKingInCheck(board, this.turn, piece);

			return tempCellsClicked;
		}
	};

	movePiece = (board, clickedCells) => {
		// clicked cells is basically this.cellsClicked, but we take it as a
		// parameter so that we can also use it for sockets

		let { rows, cols } = clickedCells;

		const [rowi, rowf] = rows;
		const [coli, colf] = cols;

		let piece = board[rowi][coli];

		// console.log(piece);

		piece.setRowCol(rowf, colf);

		// clicked cell is a valid move
		board[rowi][coli] = 0;
		board[rowf][colf] = piece;

		// set the king positions in order to help with checking for 'checks'
		if (piece.isKing) {
			if (piece.color === "white") {
				this.whiteKingPos = [piece.row, piece.col];
			} else {
				this.blackKingPos = [piece.row, piece.col];
			}
		}

		let tcc = this.cellsClicked;

		this.clearDots(board);
		this.changeTurn();

		return tcc;
	};

	changeTurn = () => {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;

		this.turn = this.turn === "white" ? "black" : "white";
	};
}

export default ChessGame;
