import Bishop from "./Bishop";
import Rook from "./Rook";
import Piece from "./ChessPiece";

class Queen extends Piece {
	constructor(color, row, col) {
		super(color, row, col);
		this.pieceName = "queen";
		this.rook = new Rook(this.color, this.row, this.col);
		this.bishop = new Bishop(this.color, this.row, this.col);
		this.image = `images/chess/${this.color}Queen.png`;
	}

	getCellsBetweenPieces = kingPos => {
		const rooks = this.rook.getCellsBetweenPieces(kingPos);
		const bishop = this.bishop.getCellsBetweenPieces(kingPos);

		return { ...rooks, ...bishop };
	};

	validMoves = (board, kingParameters) => {
		const rm = this.rook.validMoves(board, kingParameters);
		const bm = this.bishop.validMoves(board, kingParameters);

		this.moves = { ...rm, ...bm };

		// don't have to do this.checkIfKingInCheck as rook and bishop take care of that

		return this.moves;
	};

	setRowCol = (row, col) => {
		this.row = row;
		this.rook.row = row;
		this.bishop.row = row;

		this.col = col;
		this.rook.col = col;
		this.bishop.col = col;
	};

	display() {
		return this.color[0].toUpperCase() + "Q";
	}
}

export default Queen;
