import React, { useEffect, useState } from "react";

import "../styles/Canvas.css";

let canv, ctx;

const Canvas = () => {
	const [filling, setFilling] = useState(false);
	const [painting, setPainting] = useState(true);

	const handleButtonClick = e => {
		if (filling) {
			setFilling(false);
			setPainting(true);
		} else if (painting) {
			setPainting(false);
			setFilling(true);
		}
	};

	const fill = () => {
		ctx.fillRect(0, 0, canv.width, canv.height);
	};

	const handleCanvasClick = () => {
		if (filling) {
			fill();
		}
	};

	const startPainting = () => setPainting(true);
	const stopPainting = () => setPainting(false);

	const disableCanvas = () => {
		// canvas.removeEventListener("mousemove", onMouseMove);
		canv.removeEventListener("mousedown", startPainting);
		canv.removeEventListener("mouseup", stopPainting);
		canv.removeEventListener("mouseleave", stopPainting);
		canv.removeEventListener("click", handleCanvasClick);
	};

	const enableCanvas = () => {
		// canvas.addEventListener("mousemove", onMouseMove);
		canv.addEventListener("mousedown", startPainting);
		canv.addEventListener("mouseup", stopPainting);
		canv.addEventListener("mouseleave", stopPainting);
		canv.addEventListener("click", handleCanvasClick);
	};

	const changeCanvasColor = e => {
		ctx.strokeStyle = e.target.style.backgroundColor;
		ctx.fillStyle = e.target.style.backgroundColor;
	};

	useEffect(() => {
		canv = document.getElementById("drawingCanvas");
		ctx = canv.getContext("2d");
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.fillRect(0, 0, canv.width, canv.height);
		enableCanvas();
	}, []);

	return (
		<div className="canvasContainer">
			<canvas id="drawingCanvas"></canvas>
			<div>
				<button className="paint-fill" onClick={e => handleButtonClick(e)}>
					{filling ? "Paint" : "Fill"}
				</button>
				<span>Now {filling ? "Filling" : painting ? "Painting" : "None"}</span>
			</div>
			<div className="colorsContainer">
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "white" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "black" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "#27ae60" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "#2980b9" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "#16a085" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "#d63031" }}
				></div>
				<div
					onClick={changeCanvasColor}
					className="color"
					style={{ backgroundColor: "#f1c40f" }}
				></div>
			</div>
		</div>
	);
};

export default Canvas;
