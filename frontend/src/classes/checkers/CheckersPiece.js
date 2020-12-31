export default class CheckersPiece {
	constructor(color, pos) {
		this.color = color;
		this.isKing = false;
		this.row = pos[0];
		this.col = pos[1];
		this.opp_color = this.color === "red" ? "white" : "red";
		this.current_row = pos[0];
		this.current_col = pos[1];
		this.moves = {};
	}

	getStr = (row, col) => String(row) + "," + String(col);

	makeKing = () => (this.isKing = true);

	setRowCol = (row, col) => {
		this.current_row = row;
		this.current_col = col;

		if (this.row < 2) {
			if (this.current_row === 7) {
				this.makeKing();
			}
		} else {
			if (this.current_row === 0) {
				this.makeKing();
			}
		}
	};

	getCaptuingMoves = board => {
		let cr = this.current_row;
		let cc = this.current_col;

		if (this.row < 2) {
			if (cr + 2 < 8) {
				if (cc + 2 < 8) {
					if (board[cr + 1][cc + 1] !== 0 && board[cr + 2][cc + 2] === 0) {
						if (board[cr + 1][cc + 1].color === this.opp_color) {
							this.moves[this.getStr(cr + 2, cc + 2)] = [
								"capturing",
								{ row: cr + 1, col: cc + 1 }
							];
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr + 1][cc - 1] !== 0 && board[cr + 2][cc - 2] === 0) {
						if (board[cr + 1][cc - 1].color === this.opp_color) {
							this.moves[this.getStr(cr + 2, cc - 2)] = [
								"capturing",
								{ row: cr + 1, col: cc - 1 }
							];
						}
					}
				}
			}

			if (this.isKing && cr - 2 >= 0) {
				if (cc + 2 < 8) {
					if (board[cr - 1][cc + 1] !== 0 && board[cr - 2][cc + 2] === 0) {
						if (board[cr - 1][cc + 1].color === this.opp_color) {
							this.moves[this.getStr(cr - 2, cc + 2)] = [
								"capturing",
								{ row: cr - 1, col: cc + 1 }
							];
						}
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] !== 0 && board[cr - 2][cc - 2] === 0) {
						if (board[cr - 1][cc - 1].color === this.opp_color) {
							this.moves[this.getStr(cr - 2, cc - 2)] = [
								"capturing",
								{ row: cr - 1, col: cc - 1 }
							];
						}
					}
				}
			}
		} else {
			if (cr - 2 >= 0) {
				if (cc + 2 < 8) {
					if (board[cr - 1][cc + 1] !== 0 && board[cr - 2][cc + 2] === 0) {
						if (board[cr - 1][cc + 1].color === this.opp_color) {
							this.moves[this.getStr(cr - 2, cc + 2)] = [
								"capturing",
								{ row: cr - 1, col: cc + 1 }
							];
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr - 1][cc - 1] !== 0 && board[cr - 2][cc - 2] === 0) {
						if (board[cr - 1][cc - 1].color === this.opp_color) {
							this.moves[this.getStr(cr - 2, cc - 2)] = [
								"capturing",
								{ row: cr - 1, col: cc - 1 }
							];
						}
					}
				}
			}

			if (this.isKing && cr + 2 < 8) {
				if (cc + 2 < 8) {
					if (board[cr + 1][cc + 1] !== 0 && board[cr + 2][cc + 2] === 0) {
						if (board[cr + 1][cc + 1].color === this.opp_color) {
							this.moves[this.getStr(cr + 2, cc + 2)] = [
								"capturing",
								{ row: cr + 1, col: cc + 1 }
							];
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr + 1][cc - 1] !== 0 && board[cr + 2][cc - 2] === 0) {
						if (board[cr + 1][cc - 1].color === this.opp_color) {
							this.moves[this.getStr(cr + 2, cc - 2)] = [
								"capturing",
								{ row: cr + 1, col: cc - 1 }
							];
						}
					}
				}
			}
		}
	};

	validMoves = board => {
		this.moves = {};
		let cr = this.current_row;
		let cc = this.current_col;

		if (this.row < 2) {
			if (cr + 1 < 8) {
				if (cc + 1 < 8) {
					if (board[cr + 1][cc + 1] === 0) {
						this.moves[this.getStr(cr + 1, cc + 1)] = "valid";
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr + 1][cc - 1] === 0) {
						this.moves[this.getStr(cr + 1, cc - 1)] = "valid";
					}
				}
			}

			if (this.isKing && cr - 1 >= 0) {
				if (cc + 1 < 8) {
					if (board[cr - 1][cc + 1] === 0) {
						this.moves[this.getStr(cr - 1, cc + 1)] = "valid";
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] === 0) {
						this.moves[this.getStr(cr - 1, cc - 1)] = "valid";
					}
				}
			}
		} else {
			if (cr - 1 >= 0) {
				if (cc + 1 < 8) {
					if (board[cr - 1][cc + 1] === 0) {
						this.moves[this.getStr(cr - 1, cc + 1)] = "valid";
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] === 0) {
						this.moves[this.getStr(cr - 1, cc - 1)] = "valid";
					}
				}
			}

			if (this.isKing && cr + 1 < 8) {
				if (cc + 1 < 8) {
					if (board[cr + 1][cc + 1] === 0) {
						this.moves[this.getStr(cr + 1, cc + 1)] = "valid";
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr + 1][cc - 1] === 0) {
						this.moves[this.getStr(cr + 1, cc - 1)] = "valid";
					}
				}
			}
		}

		this.getCaptuingMoves(board);

		return this.moves;
	};
}
