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
			this.moves[String(this.row + adder * 2) + "," + String(this.col)] = true;
			board[this.row + adder * 2][this.col] = "1";
		}

		if (this.row + adder >= 0 && this.row + adder < 8) {
			if (board[this.row + adder][this.col] === 0) {
				this.moves[String(this.row + adder) + "," + String(this.col)] = true;
				board[this.row + adder][this.col] = "1";
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "P";
	}
}

export default Pawn;
