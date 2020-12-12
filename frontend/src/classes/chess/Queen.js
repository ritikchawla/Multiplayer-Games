import Bishop from "./Bishop";
import Rook from "./Rook";
import Piece from "./ChessPiece";

class Queen extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.rook = new Rook(this.color, this.row, this.col);
		this.bishop = new Bishop(this.color, this.row, this.col);
		this.image = `images/chess/${this.color}Queen.png`;
	}

	validMoves = board => {
		const rm = this.rook.validMoves(board);
		const bm = this.bishop.validMoves(board);

		this.moves = Object.assign({}, rm, bm);

		return this.moves;
	};

	display() {
		return this.color[0].toUpperCase() + "Q";
	}
}

export default Queen;
