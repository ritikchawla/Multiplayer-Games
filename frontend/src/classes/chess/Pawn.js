import Piece from "./ChessPiece";

class Pawn extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.hasMoved = false;
		this.pieceName = "pawn";
		this.image = `images/chess/${this.color}Pawn.png`;
	}

	capturingMoves = board => {
		let capturingMoves = {};
		const adder = this.color === "black" ? 1 : -1;
	};

	validMoves = (board, kingParameters) => {
		this.resetMoves();

		const adder = this.color === "black" ? 1 : -1;

		if (!this.hasMoved) {
			if (board[this.row + adder * 2][this.col] === 0) {
				this.moves[String(this.row + adder * 2) + "," + String(this.col)] =
					"valid";
			}
		}

		if (this.row + adder >= 0 && this.row + adder < 8) {
			if (board[this.row + adder][this.col] === 0) {
				this.moves[this.getStr(this.row + adder, this.col)] = "valid";
			}

			// capturing moves
			if (this.col + 1 < 8) {
				if (board[this.row + adder][this.col + 1] !== 0) {
					if (board[this.row + adder][this.col + 1].color !== this.color) {
						this.moves[this.getStr(this.row + adder, this.col + 1)] =
							"capturing";
					} else {
						this.protectingMoves[
							this.getStr(this.row + adder, this.col + 1)
						] = "protecting";
					}
				}
			}
			if (this.col - 1 >= 0) {
				if (board[this.row + adder][this.col - 1] !== 0) {
					if (board[this.row + adder][this.col - 1].color !== this.color) {
						this.moves[this.getStr(this.row + adder, this.col - 1)] =
							"capturing";
					} else {
						this.protectingMoves[
							this.getStr(this.row + adder, this.col - 1)
						] = "protecting";
					}
				}
			}
		}

		this.checkIfKingInCheck(kingParameters);

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
