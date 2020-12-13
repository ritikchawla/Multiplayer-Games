// import Piece from "ChessPiece";

import Piece from "./ChessPiece";

class Pawn extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.hasMoved = false;
		this.image = `images/chess/${this.color}Pawn.png`;
	}

	validMoves = board => {
		const adder = this.color === "black" ? 1 : -1;

		if (!this.hasMoved) {
			if (board[this.row + adder * 2][this.col] === 0) {
				this.moves[String(this.row + adder * 2) + "," + String(this.col)] = true;
				board[this.row + adder * 2][this.col] = "dot";
			}
		}

		if (this.row + adder >= 0 && this.row + adder < 8) {
			if (board[this.row + adder][this.col] === 0) {
				this.moves[String(this.row + adder) + "," + String(this.col)] = true;
				board[this.row + adder][this.col] = "dot";
			}

			// capturing moves
			if (this.col + 1 < 8) {
				if (board[this.row + adder][this.col + 1] !== 0) {
					if (board[this.row + adder][this.col + 1].color !== this.color) {
						this.moves[String(this.row + adder) + "," + String(this.col + 1)] = true;
						board[this.row + adder][this.col + 1].isBeingAttacked = true;
					}
				}
			}
			if (this.col - 1 >= 0) {
				if (board[this.row + adder][this.col - 1] !== 0) {
					if (board[this.row + adder][this.col - 1].color !== this.color) {
						this.moves[String(this.row + adder) + "," + String(this.col - 1)] = true;
						board[this.row + adder][this.col - 1].isBeingAttacked = true;
					}
				}
			}
		}

		return this.moves;
	};

	setRowCol = (row, col) => {
		this.row = row;
		this.col = col;
		this.hasMoved = true;
	};

	display() {
		return this.color[0].toUpperCase() + "P";
	}
}

export default Pawn;
