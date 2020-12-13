import React from "react";

const Cell = ({ image, row, col, tile, color, isClicked, blueDot, redDot, showMoves }) => {
	const bgColor = blueDot
		? "rgba(0, 162, 232, 0.5)"
		: redDot
		? "rgba(255,63,52, 0.8)"
		: isClicked
		? "rgba(240, 147, 43, 0.5)"
		: null;

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
		alignItems: "center"
	};

	const imgStyle = {
		height: 70,
		width: 70
	};

	return (
		<div onClick={() => showMoves(row, col)} style={divStyles}>
			<div style={innerDivStyles}>
				{/* {(blueDot || redDot) && (
				<div
					style={{
						borderRadius: "50%",
						border: `3px solid ${blueDot ? "rgb(0, 162, 232)" : "#ff3f34"}`,
						backgroundColor: `${blueDot ? "rgb(0, 162, 232)" : "#ff3f34"}`,
						height: 10,
						width: 10,
						position: "absolute",
						top: 30,
						left: 30
					}}
				></div>
			)} */}
				{image && <img src={image} style={imgStyle} draggable />}
			</div>
		</div>
	);
};

// rgb(0, 162, 232)

export default Cell;
