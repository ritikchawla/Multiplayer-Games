import React from "react";
import { motion } from "framer-motion";

const Cell = ({ image, row, col, color, isClicked, blueDot, redDot, showMoves }) => {
	const bgColor = isClicked ? "rgba(240, 147, 43, 0.5)" : null;

	const divStyles = {
		width: 75,
		height: 75,
		backgroundColor: color,
		padding: 0,
		margin: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative"
	};

	const innerDivStyles = {
		backgroundColor: bgColor ? bgColor : "transparent",
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative"
	};

	const imgStyle = {
		height: 70,
		width: 70
	};

	const dotStyle = {
		borderRadius: "50%",
		border: `3px solid ${blueDot ? "rgb(41, 128, 185)" : "rgba(255,63,52, 0.8)"}`,
		backgroundColor: `${blueDot ? "rgb(41, 128, 185)" : "rgba(255,63,52, 0.8)"}`,
		height: 20,
		width: 20,
		position: "absolute",
		top: 27.5,
		left: 27.5
	};

	return (
		<motion.div onClick={() => showMoves(row, col)} style={divStyles}>
			<motion.div style={innerDivStyles} whileHover={{ cursor: "pointer" }}>
				{(blueDot || redDot) && <div style={dotStyle}></div>}
				{image && <img src={image} style={imgStyle} draggable />}
			</motion.div>
		</motion.div>
	);
};

// rgb(0, 162, 232)

export default Cell;
