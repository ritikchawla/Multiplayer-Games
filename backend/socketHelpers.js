import { getPieceColor } from "./helpers.js";
import { getRandomWord } from "./words.js";

let currentPainterIndex = 0;

export const chooseNewPainter = (allSockets, socket, io) => {
	let currentPainter = allSockets[socket.room][currentPainterIndex].username;

	let word = getRandomWord();

	currentPainterIndex =
		currentPainterIndex + 1 === allSockets[socket.room].length
			? 0
			: currentPainterIndex + 1;

	io.to(socket.room).emit("painterHasBeenChosen", {
		painter: currentPainter,
		word
	});

	return [currentPainter, word];
};

export const addSocketToList = (allSockets, socket) => {
	if (!allSockets[socket.room]) {
		allSockets[socket.room] = [];
	}

	let object1 = {
		id: socket.id,
		username: socket.username,
		color: socket.color,
		room: socket.room,
		roomName: socket.roomName
	};

	let object2 = {};

	switch (socket.roomName) {
		case "sketchio":
			object2["points"] = 0;
			break;

		case "checkers":
			let socketRoom = socket.room;
			let tempAllSockets = {};

			tempAllSockets[socketRoom] = [...allSockets[socketRoom], object1];

			const pieceColor = getPieceColor(tempAllSockets, socketRoom, "checkers");

			object2["checkersPieceColor"] = pieceColor;
			socket.checkersPieceColor = pieceColor;

		default:
			break;
	}

	// add user to the connected sockets
	allSockets[socket.room].push({ ...object1, ...object2 });

	return allSockets;
};
