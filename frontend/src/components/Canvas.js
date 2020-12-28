import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SketchIO from "../classes/sketch/SketchIO";
import "../styles/Canvas.css";

let sketchIO;

const Canvas = () => {
	const dispatch = useDispatch();
	const { socket } = useSelector(state => state.socket);
	const { username } = useSelector(state => state.user);
	const sketchIOSockets = useSelector(state => state.sketchIOSockets);

	const hideButtonAndColors = () => {
		const btnDiv = document.getElementById("sketchIOButton");
		const colorsDiv = document.querySelector(".colorsContainer");

		btnDiv.style.display = "none";
		colorsDiv.style.display = "none";
	};

	const showButtonAndColors = () => {
		const btnDiv = document.getElementById("sketchIOButton");
		const colorsDiv = document.querySelector(".colorsContainer");

		btnDiv.style.display = "block";
		colorsDiv.style.display = "flex";
	};

	const addPainterToPointsList = allSketchIOSockets => {
		const pointsList = document.getElementById("pointsList");
		pointsList.innerHTML = "<p id='pointsListHeading'>Players</p>";

		allSketchIOSockets.forEach(socket => {
			console.log("addPainterToPointsList");
			const div = document.createElement("div");
			div.className = "pointsListItem";
			div.innerHTML = `
                <p class = 'pointsListItemUsername'>${socket.username}</p> 
                <p class = 'pointsListItemPoints'>${socket.points}</p>
            `;

			pointsList.appendChild(div);
		});
	};

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
		canvas.width = 500;
		canvas.height = 400;
		const ctx = canvas.getContext("2d");
		sketchIO = new SketchIO(canvas, ctx, socket);
		sketchIO.enableCanvas();

		return () => {
			sketchIO.disableCanvas();
		};
	}, [socket]);

	useEffect(() => {
		socket.on("sketchioPlayerUpdate", ({ allSketchIOSockets }) => {
			dispatch({ type: "UPDATE_PAINTERS", payload: allSketchIOSockets });
			addPainterToPointsList(allSketchIOSockets);
		});

		socket.on("painterHasBeenChosen", ({ painter, word }) => {
			// painter = username of the current painter
			// word = random word to paint

			const sketchInfo = document.getElementById("sketchInfo");

			let text;

			if (painter === username) {
				text = `You are the painter. Paint ${word}`;
				showButtonAndColors();
			} else {
				text = `${painter} is painting`;
				sketchIO.disableCanvas();
				hideButtonAndColors();
			}

			sketchInfo.innerText = text;
		});

		socket.on("someoneFilled", ({ color }) => {
			sketchIO.fill(color);
		});

		socket.on("someoneBeganPath", ({ x, y }) => {
			sketchIO.beginPath(x, y);
		});

		socket.on("someoneStrokedPath", ({ x, y, color }) => {
			sketchIO.drawPath(x, y, color);
		});
	}, [socket, dispatch, addPainterToPointsList]);

	return (
		<div className="canvasSuperContainer">
			<div id="pointsList"></div>
			<div className="canvasContainer">
				<div id="sketchInfo"></div>
				<canvas id="drawingCanvas"></canvas>
				<div id="sketchIOButton">
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
		</div>
	);
};

export default Canvas;
