import React from "react";
import ChessBoard from "../components/ChessBoard";

const ChessScreen = () => {
	const mainDivStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		minHeight: "100vh",
		minWidth: "85vw"
	};
	return (
		<div style={mainDivStyles}>
			<ChessBoard />
		</div>
	);
};

export default ChessScreen;
