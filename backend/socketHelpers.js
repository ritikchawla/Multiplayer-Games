import { getPieceColor } from "./helpers.js";
import { getRandomWord } from "./words.js";

let currentPainterIndex = 0;

export const chooseNewPainter = (allSockets, socket, io) => {
	let currentPainter = allSockets["sketchio"][currentPainterIndex].username;

	let word = getRandomWord();

	currentPainterIndex =
		currentPainterIndex + 1 === allSockets["sketchio"].length
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
		room: socket.room
	};

	let object2 = {};

	switch (socket.room) {
		case "chess":
			socket.chessPieceColor = getPieceColor(allSockets, "chess");
			object2["chessPieceColor"] = socket.chessPieceColor;
			break;

		case "sketchio":
			object2["points"] = 0;
			break;

		default:
			break;
	}

	// add user to the connected sockets
	allSockets[socket.room].push({ ...object1, ...object2 });

	return allSockets;
};
