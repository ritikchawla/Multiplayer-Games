import React, { useEffect, useState } from "react";
import SketchIO from "../classes/sketch/SketchIO";

import "../styles/Canvas.css";

let sketchIO;

const Canvas = () => {
	const handleButtonClick = e => {
		const btn = document.querySelector(".paint-fill");
		sketchIO.toggleFillPaint();

		if (sketchIO.getPainting()) {
			btn.innerText = "Fill";
		}

		if (sketchIO.getFilling()) {
			btn.innerText = "Paint";
		}
	};

	const changeCanvasColor = e => {
		sketchIO.changeCanvasColor(e.target.style.backgroundColor);
	};

	useEffect(() => {
		const canvas = document.getElementById("drawingCanvas");
		const ctx = canvas.getContext("2d");
		const canvasContainer = document.querySelector(".canvasContainer");
		canvas.width = canvasContainer.clientWidth;
		canvas.height = canvasContainer.clientHeight;
		sketchIO = new SketchIO(canvas, ctx);
		sketchIO.enableCanvas();

		return () => {
			sketchIO.disableCanvas();
		};
	}, []);

	return (
		<div className="canvasContainer">
			<canvas id="drawingCanvas"></canvas>
			<div>
				<button className="paint-fill" onClick={handleButtonClick}>
					Fill
				</button>
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
