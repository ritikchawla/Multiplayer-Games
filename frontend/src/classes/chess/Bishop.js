import Piece from "./ChessPiece";

class Bishop extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.image = `images/chess/${this.color}Bishop.png`;
	}

	upperRight = board => {
		let c = this.col;
		for (let r = this.row - 1; r >= 0; r--) {
			if (c === 7) break;
			else c++;

			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = "capturing";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = "valid";
		}
	};

	lowerRight = board => {
		let c = this.col;
		for (let r = this.row + 1; r < 8; r++) {
			if (c === 7) break;
			else c++;

			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = "capturing";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = "valid";
		}
	};

	upperLeft = board => {
		let c = this.col;
		for (let r = this.row - 1; r >= 0; r--) {
			if (c === 0) break;
			else c--;

			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = "capturing";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = "valid";
		}
	};

	lowerLeft = board => {
		let c = this.col;
		for (let r = this.row + 1; r < 8; r++) {
			if (c === 0) break;
			else c--;

			if (board[r][c] !== 0) {
				if (board[r][c].color === this.color) {
					return;
				} else {
					this.moves[String(r) + "," + String(c)] = "capturing";
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = "valid";
		}
	};

	handleKingInCheck = (board, kingParameters) => {
		// the king of the same color is in check
		let { kingPos, pieceCheckingKing } = kingParameters;
	};

	validMoves = (board, kingParameters) => {
		this.resetMoves();

		this.upperRight(board);
		this.lowerRight(board);
		this.upperLeft(board);
		this.lowerLeft(board);

		let { whiteKingInCheck, blackKingInCheck } = kingParameters;

		if (this.color === "white" && whiteKingInCheck) {
			let { whiteKingPos, pieceCheckingWhiteKing } = kingParameters;
			this.handleKingInCheck(board, {
				kingPos: whiteKingPos,
				pieceCheckingKing: pieceCheckingWhiteKing
			});
		}

		if (this.color === "black" && blackKingInCheck) {
			let { blackKingPos, pieceCheckingBlackKing } = kingParameters;
			this.handleKingInCheck(board, {
				kingPos: blackKingPos,
				pieceCheckingKing: pieceCheckingBlackKing
			});
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "B";
	}
}

export default Bishop;
