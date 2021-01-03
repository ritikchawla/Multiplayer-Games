class Piece {
	constructor(color, row, col) {
		this.color = color;
		this.row = row;
		this.col = col;
		this.moves = {};
		this.protectingMoves = {};
		this.isBeingAttacked = false;
		this.isClicked = false;
		this.pieceName = "";
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
			let { blackKingPos, pieceCheckingBlackKing } = kingParameters;
			console.log(pieceCheckingBlackKing);
			console.log(kingParameters);
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
				return newValidMoves;
			}
		}

		// get the cells between the king and the piece checking the king
		// this way we can check if a move exists that blocks the check
		const cellsBetweenPieces = pieceCheckingKing.getCellsBetweenPieces(kingPos);

		if (this.pieceName === "king") {
			console.log("inside if ");
			// if it is the king then it has to move
			Object.keys(this.moves).forEach(key => {
				if (!(key in cellsBetweenPieces)) {
					// if the move is not a check blocking move
					newValidMoves[key] = "valid";
				}

				// can only capture with the king if the piece being captured is not
				// being protected by one of it's own pieces
				if (key === this.getStr(pieceCheckingKing.row, pieceCheckingKing.col)) {
					newValidMoves[key] = "capturing";
				}
			});
		} else {
			// if it's not the king then it can block the check
			console.log("inside else");
			Object.keys(this.moves).forEach(key => {
				if (key in cellsBetweenPieces) {
					newValidMoves[key] = "valid";
				}
				if (key === this.getStr(pieceCheckingKing.row, pieceCheckingKing.col)) {
					newValidMoves[key] = "capturing";
				}
			});
		}

		return newValidMoves;
	};

	setRowCol = (row, col) => {
		this.row = row;
		this.col = col;
	};

	resetMoves = () => {
		this.moves = {};
		this.protectingMoves = {};
	};

	getStr = (row, col) => String(row) + "," + String(col);
}

export default Piece;
