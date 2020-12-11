export default class CheckersPiece {
	constructor(color, pos) {
		this.color = color;
		this.isKing = false;
		this.row = pos[0];
		this.col = pos[1];
		this.opp_color = this.color === "B" ? "R" : "B";
		this.current_row = pos[0];
		this.current_col = pos[1];
		this.moves = [];
	}

	getCaptuingMoves = board => {
		let cr = this.current_row;
		let cc = this.current_col;
		let capturing_moves = [];

		if (this.row < 2) {
			if (cr + 2 < 8) {
				if (cc + 2 < 8) {
					if (board[cr + 1][cc + 1] !== 0 && board[cr + 2][cc + 2] === 0) {
						if (board[cr + 1][cc + 1].color === this.opp_color) {
							capturing_moves.push([cr + 2, cc + 2]);
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr + 1][cc - 1] !== 0 && board[cr + 2][cc - 2] === 0) {
						if (board[cr + 1][cc - 1].color === this.opp_color) {
							capturing_moves.push([cr + 2, cc - 2]);
						}
					}
				}
			}

			if (this.isKing && cr - 2 >= 0) {
				if (cc + 2 < 8) {
					if (board[cr - 1][cc + 1] !== 0 && board[cr - 2][cc + 2] === 0) {
						if (board[cr - 1][cc + 1].color === this.opp_color) {
							capturing_moves.push([cr - 2, cc + 2]);
						}
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] !== 0 && board[cr - 2][cc - 2] === 0) {
						if (board[cr - 1][cc - 1].color === this.opp_color) {
							capturing_moves.push([cr - 2, cc - 2]);
						}
					}
				}
			}
		} else {
			if (cr - 2 >= 0) {
				if (cc + 2 < 8) {
					if (board[cr - 1][cc + 1] !== 0 && board[cr - 2][cc + 2] === 0) {
						if (board[cr - 1][cc + 1].color === this.opp_color) {
							capturing_moves.push([cr - 2, cc + 2]);
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr - 1][cc - 1] !== 0 && board[cr - 2][cc - 2] === 0) {
						if (board[cr - 1][cc - 1].color === this.opp_color) {
							capturing_moves.push([cr - 2, cc - 2]);
						}
					}
				}
			}

			if (this.isKing && cr + 2 < 8) {
				if (cc + 2 < 8) {
					if (board[cr + 1][cc + 1] !== 0 && board[cr + 2][cc + 2] === 0) {
						if (board[cr + 1][cc + 1].color === this.opp_color) {
							capturing_moves.push([cr + 2, cc + 2]);
						}
					}
				}

				if (cc - 2 >= 0) {
					if (board[cr + 1][cc - 1] !== 0 && board[cr + 2][cc - 2] === 0) {
						if (board[cr + 1][cc - 1].color === this.opp_color) {
							capturing_moves.push([cr + 2, cc - 2]);
						}
					}
				}
			}
		}
	};

	get_valid_moves = board => {
		this.moves = []; // list of lists
		let cr = this.current_row;
		let cc = this.current_col;

		if (this.row < 2) {
			if (cr + 1 < 8) {
				if (cc + 1 < 8) {
					if (board[cr + 1][cc + 1] === 0) {
						this.moves.push([cr + 1, cc + 1]);
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr + 1][cc - 1] === 0) {
						this.moves.push([cr + 1, cc - 1]);
					}
				}
			}

			if (this.isKing && cr - 1 >= 0) {
				if (cc + 1 < 8) {
					if (board[cr - 1][cc + 1] === 0) {
						this.moves.push([cr - 1, cc + 1]);
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] === 0) {
						this.moves.push([cr - 1, cc - 1]);
					}
				}
			}
		} else {
			if (cr - 1 >= 0) {
				if (cc + 1 < 8) {
					if (board[cr - 1][cc + 1] === 0) {
						this.moves.push([cr - 1, cc + 1]);
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr - 1][cc - 1] === 0) {
						this.moves.push([cr - 1, cc - 1]);
					}
				}
			}

			if (this.isKing && cr + 1 < 8) {
				if (cc + 1 < 8) {
					if (board[cr + 1][cc + 1] === 0) {
						this.moves.push([cr + 1, cc + 1]);
					}
				}

				if (cc - 1 >= 0) {
					if (board[cr + 1][cc - 1] === 0) {
						this.moves.push([cr + 1, cc - 1]);
					}
				}
			}
		}

		return this.moves;
	};
}
