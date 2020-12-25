import React from "react";
import ChessBoard from "../components/ChessBoard";

import Chat from "../components/Chat";

const ChessScreen = () => {
	const mainDivStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		minHeight: "100vh",
		minWidth: "85vw",
		flexWrap: "wrap"
	};

	return (
		<div style={mainDivStyles}>
			<ChessBoard />
			<Chat />
		</div>
	);
};

export default ChessScreen;
