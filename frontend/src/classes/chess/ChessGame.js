import Piece from "./ChessPiece";
class ChessGame {
	constructor() {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;
		this.turn = "white";
		this.selected = null;
	}

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

	showValidMoves = (board, row, col) => {
		this.clearDots(board);

		if (board[row][col] !== 0 && board[row][col] !== "dot") {
			if (board[row][col].color === this.turn) {
				let piece = board[row][col];

				let moves = piece.validMoves(board);

				piece.isClicked = true;

				console.log(moves);
			}
		}
		this.select(board, row, col);

		return board;
	};

	select = (board, row, col) => {
		console.log("select called");
		if (this.numClicks === 0) {
			if (board[row][col] === 0) return false;
			else if (board[row][col] === "dot") return false;
			else if (board[row][col].color !== this.turn) return false;
			else {
				this.cellsClicked.rows.push(row);
				this.cellsClicked.cols.push(col);
				this.numClicks++;
				return true;
			}
		} else if (this.numClicks === 1) {
			// a piece has already been clicked

			if (board[row][col] instanceof Piece) {
				// if player clicked on another piece of his color, do not changeTurn

				if (board[row][col].color === this.turn) {
					this.cellsClicked.rows[0] = row;
					this.cellsClicked.cols[0] = col;
					return;
				}
			}

			let str = String(row) + "," + String(col);
			console.log("str = ", str);
			let piece = board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]];
			console.log("piece = ", piece);

			if (!(str in piece.validMoves(board))) {
				return false;
			}

			// clicked cell is a valid move
			board[this.cellsClicked.rows[0]][this.cellsClicked.cols[0]] = 0;
			board[row][col] = piece;
			piece.setRowCol(row, col);

			this.clearDots(board);
			this.changeTurn();
		}

		return board;
	};

	changeTurn = () => {
		this.cellsClicked = { rows: [], cols: [] };
		this.numClicks = 0;

		this.turn = this.turn === "white" ? "black" : "white";
	};
}

export default ChessGame;
