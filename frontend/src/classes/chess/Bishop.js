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
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c].isBeingAttacked = true;
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "dot";
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
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c].isBeingAttacked = true;
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "dot";
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
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c].isBeingAttacked = true;
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "dot";
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
					this.moves[String(r) + "," + String(c)] = true;
					board[r][c].isBeingAttacked = true;
					return;
				}
			}

			this.moves[String(r) + "," + String(c)] = true;
			board[r][c] = "dot";
		}
	};

	validMoves = board => {
		this.upperRight(board);
		this.lowerRight(board);
		this.upperLeft(board);
		this.lowerLeft(board);
		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "B";
	}
}

export default Bishop;
