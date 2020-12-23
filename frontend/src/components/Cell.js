import React from "react";
import { motion } from "framer-motion";

const Cell = ({ image, row, col, color, isClicked, blueDot, redDot, showMoves }) => {
	const bgColor = isClicked ? "rgba(240, 147, 43, 0.5)" : null;

	const divStyles = {
		width: 70,
		height: 70,
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
		position: "relative",
		boxShadow: redDot ? "inset 0px 0px 20px 5px rgb(255, 0, 0)" : ""
	};

	const imgStyle = {
		height: 70,
		width: 70
	};

	const dotStyle = {
		borderRadius: "50%",
		border: `3px solid ${blueDot && "rgb(41, 128, 185)"}`,
		backgroundColor: `${blueDot && "rgb(41, 128, 185)"}`,
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

export default Cell;
