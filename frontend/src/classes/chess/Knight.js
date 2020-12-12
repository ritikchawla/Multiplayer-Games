import Piece from "./ChessPiece";

class Knight extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.image = `images/chess/${this.color}Knight.png`;
	}
	validMoves = board => {
		let arrC = [-2, -1, 1, 2];
		let arrR = [1, 2, 2, 1];
		// -2 and 2 at -1 and 1
		// -1 and 1 at -2 and 2

		for (let i = 0; i < 4; i++) {
			if (this.col + arrC[i] >= 0 && this.col + arrC[i] < 8) {
				// ---

				if (this.row - arrR[i] >= 0) {
					if (board[this.row - arrR[i]][this.col + arrC[i]] === 0) {
						this.moves[
							String(this.row - arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row - arrR[i]][this.col + arrC[i]] = "dot";
					} else if (board[this.row - arrR[i]][this.col + arrC[i]].color !== this.color) {
						this.moves[
							String(this.row - arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row - arrR[i]][this.col + arrC[i]] = "dot";
					}
				}

				if (this.row + arrR[i] < 8) {
					if (board[this.row + arrR[i]][this.col + arrC[i]] === 0) {
						this.moves[
							String(this.row + arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row + arrR[i]][this.col + arrC[i]] = "dot";
					} else if (board[this.row + arrR[i]][this.col + arrC[i]].color !== this.color) {
						this.moves[
							String(this.row + arrR[i]) + "," + String(this.col + arrC[i])
						] = true;
						board[this.row + arrR[i]][this.col + arrC[i]] = "dot";
					}
				}
			}
		}

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "Kn";
	}
}

export default Knight;
