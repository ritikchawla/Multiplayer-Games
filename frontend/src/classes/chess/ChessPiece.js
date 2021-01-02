class Piece {
	constructor(color, row, col) {
		this.color = color;
		this.row = row;
		this.col = col;
		this.moves = {};
		this.isBeingAttacked = false;
		this.isClicked = false;
	}

	checkIfKingInCheck = kingParameters => {
		let { whiteKingInCheck, blackKingInCheck } = kingParameters;

		if (this.color === "white" && whiteKingInCheck) {
			console.log(kingParameters);
			let { whiteKingPos, pieceCheckingWhiteKing } = kingParameters;
			this.moves = this.handleKingInCheck({
				kingPos: whiteKingPos,
				pieceCheckingKing: pieceCheckingWhiteKing
			});
		}

		if (this.color === "black" && blackKingInCheck) {
			console.log(kingParameters);
			let { blackKingPos, pieceCheckingBlackKing } = kingParameters;
			this.moves = this.handleKingInCheck({
				kingPos: blackKingPos,
				pieceCheckingKing: pieceCheckingBlackKing
			});
		}
	};

	handleKingInCheck = kingParameters => {
		// the king of the same color is in check
		let { kingPos, pieceCheckingKing } = kingParameters;
		let newValidMoves = {};

		// handle king is being checked by every piece
		if (
			pieceCheckingKing.pieceName === "knight" ||
			pieceCheckingKing.pieceName === "pawn"
		) {
			// only way to escape a Knight's or a Pawn's check is to either move the king,
			// or to capture the Knight or Pawn
			if (
				!(this.getStr(pieceCheckingKing.row, pieceCheckingKing.col) in this.moves)
			) {
				return {};
			} else {
				let move = this.getStr(pieceCheckingKing.row, pieceCheckingKing.col);
				newValidMoves[move] = "capturing";
				console.log("new valide moves = ", newValidMoves);
				return newValidMoves;
			}
		}

		// get the cells between the king and the piece checking the king
		// this way we can check if a move exists that blocks the check
		const cellsBetweenPieces = pieceCheckingKing.getCellsBetweenPieces(kingPos);

		Object.keys(this.moves).forEach(key => {
			if (key in cellsBetweenPieces) {
				newValidMoves[key] = "valid";
			}
			if (key === this.getStr(pieceCheckingKing.row, pieceCheckingKing.col)) {
				newValidMoves[key] = "capturing";
			}
		});

		return newValidMoves;
	};

	setRowCol = (row, col) => {
		this.row = row;
		this.col = col;
	};

	resetMoves = () => {
		this.moves = {};
	};

	getStr = (row, col) => String(row) + "," + String(col);
}

export default Piece;
