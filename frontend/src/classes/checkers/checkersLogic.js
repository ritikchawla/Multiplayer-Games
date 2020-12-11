import CheckersPiece from "./Piece";

const get_all_valid_moves = (board, color) => {
	let all_moves_for_a_color = {};

	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board.length; j++) {
			if (board[i][j] !== 0 && board[i][j].color === color) {
				all_moves_for_a_color[`(${i},${j})`] = board[i][j].get_valid_moves();
			}
		}
	}
};

const move_piece = (board, cells_clicked) => {
	// row[0], col[0] is the initial position
	// row[1], col[1] is the final position

	const rowi = cells_clicked["rows"][0];
	const rowf = cells_clicked["rows"][1];
	const coli = cells_clicked["cols"][0];
	const colf = cells_clicked["cols"][1];

	let did_piece_move = false;
	let was_piece_captured = false;
	let was_promoted_to_king = false;
	let piece_captured_row, piece_captured_col;
	const clicked_piece = board[rowi][coli];

	// # all_moves is now a dictionary
	console.log(clicked_piece);
	const all_moves = get_all_valid_moves(board, clicked_piece.color);

	// # not a capturing move
	if (rowi - 1 <= rowf <= rowi + 1) {
		let temp = board[rowi][coli];
		board[rowi][coli] = board[rowf][colf];
		board[rowf][colf] = temp;

		board[rowf][colf].current_row = rowf;
		board[rowf][colf].current_col = colf;
		did_piece_move = true;
	} else if (rowi - 2 <= rowf <= rowi + 2) {
		let temp = board[rowi][coli];
		board[rowi][coli] = board[rowf][colf];
		board[rowf][colf] = temp;
		board[rowf][colf].current_row = rowf;
		board[rowf][colf].current_col = colf;

		if (rowf < rowi) {
			piece_captured_row = rowi - 1;
			piece_captured_col = colf < coli ? coli - 1 : coli + 1;
		} else {
			piece_captured_row = rowi + 1;
			piece_captured_col = colf < coli ? coli - 1 : coli + 1;
		}

		// was_piece_captured, which piece was captured (red or black)
		was_piece_captured = [true, board[piece_captured_row][piece_captured_col]];

		if (board[piece_captured_row][piece_captured_col].isKing) {
			board[rowf][colf].isKing = true;
		}

		board[piece_captured_row][piece_captured_col] = 0;
		did_piece_move = true;
	}
	if (did_piece_move) {
		if (board[rowf][colf].row < 2 && rowf == 7 && !board[rowf][colf].isKing) {
			board[rowf][colf].isKing = true;
			was_promoted_to_king = [true, board[rowf][colf]];
		}

		if (board[rowf][colf].row > 2 && rowf == 0 && !board[rowf][colf].isKing) {
			board[rowf][colf].isKing = true;
			was_promoted_to_king = [true, board[rowf][colf]];
		}
	}

	// return did_piece_move, clicked_piece, was_piece_captured, was_promoted_to_king;
	console.log(board);
	return board;
};

export default move_piece;
