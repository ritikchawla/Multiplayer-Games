import React from "react";
import Canvas from "../components/Canvas";
import Chat from "../components/Chat";

const SketchIOScreen = () => {
	const mainDivStyles = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "100vh",
		minWidth: "85vw",
		flexWrap: "wrap"
	};

	return (
		<div style={mainDivStyles}>
			<Canvas />
			<Chat />
		</div>
	);
};

export default SketchIOScreen;
