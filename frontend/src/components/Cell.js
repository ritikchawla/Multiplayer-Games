import React from "react";

const Cell = ({ image, row, col, tile, color, board, blueDot, showMoves }) => {
	const divStyles = {
		width: 75,
		height: 75,
		backgroundColor: color,
		padding: 0,
		margin: 0,
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
			{blueDot && (
				<div
					style={{
						borderRadius: "50%",
						border: "3px solid rgb(0, 162, 232)",
						backgroundColor: "rgb(0, 162, 232)",
						height: 10,
						width: 10
					}}
				></div>
			)}
			{image && <img src={image} style={imgStyle} draggable />}
		</div>
	);
};

// rgb(0, 162, 232)

export default Cell;
