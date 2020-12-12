import React from "react";
import ChessGame from "./classes/chess/ChessGame";
import Chessscreen from "./screens/Chessscreen";

const App = () => {
	const getChessGameObj = () => {
		const game = new ChessGame();
		return game;
	};

	return (
		<div className="App">
			<Chessscreen getChessGameObj={getChessGameObj} />
		</div>
	);
};

export default App;
