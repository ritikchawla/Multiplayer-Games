import colors from "./colors.js";
import { getPieceColor, getUserString } from "./helpers.js";
import { getRandomWord } from "./words.js";

let allSockets = {};
let colorIncrementor = 1;
let currentPainterIndex = 0;
let currentPainter = null;
let wordToPaint = null;

const addSocketToList = socket => {
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
};

const socketController = (socket, io) => {
	socket.on("newConnection", ({ username, room }) => {
		// set username and name color for the joined user
		socket.username = username;
		socket.color = colors[colorIncrementor];
		socket.room = room;
		socket.join(room);

		addSocketToList(socket);

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;

		if (socket.room === "sketchio") {
			currentPainter = allSockets["sketchio"][currentPainterIndex].username;

			wordToPaint = getRandomWord();

			currentPainterIndex =
				currentPainterIndex + 1 === allSockets["sketchio"].length
					? 0
					: currentPainterIndex + 1;

			io.to(socket.room).emit("painterHasBeenChosen", {
				painter: currentPainter,
				word: wordToPaint
			});
		}
	});

	// ===================== for Chat ======================================
	socket.on("newUserJoinsChat", ({ username }) => {
		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: `${username} just joined the chat!`,
			username: "Bot",
			color: colors[0]
		});

		const allUsersString = getUserString(allSockets, socket.room);

		// no need to do socket.to() here as we're sending message to only one socket
		socket.emit("newMessageReceived", {
			newMessage: `Currently in the chat -\n ${allUsersString}`,
			username: "Bot",
			color: colors[0]
		});
	});

	// for sending a new message to all users
	socket.on("newMessage", ({ inputMessage }) => {
		console.log("server newMessage = ", inputMessage);

		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: inputMessage,
			username: socket.username,
			color: socket.color
		});

		// word was guessed correctly in the sketchio game
		if (socket.room === "sketchio") {
			if (inputMessage === wordToPaint) {
				socket.points += 5;
				io.to(socket.room).emit("newMessageReceived", {
					newMessage: `${socket.username} guessed the word correctly.\n Word was ${wordToPaint}`,
					username: "Bot",
					color: colors[0]
				});
			}
		}
	});
	// ===================== end for Chat ======================================

	// ================== for chess ===================================
	socket.on("getChessPieceColor", () => {
		socket.emit("setChessPieceColor", { chessPieceColor: socket.chessPieceColor });
	});

	socket.on("movePlayed", ({ cellsClicked }) => {
		console.log("opponentPlayedAMove", cellsClicked);
		socket.broadcast.emit("opponentPlayedAMove", { cellsClicked });
	});
	// ================== end for chess ===================================

	// ================ for sketchIO ===============================
	socket.on("startedFilling", ({ color }) => {
		socket.broadcast.emit("someoneFilled", { color });
	});

	socket.on("beganPath", ({ x, y }) => {
		socket.broadcast.emit("someoneBeganPath", { x, y });
	});

	socket.on("strokedPath", ({ x, y, color }) => {
		socket.broadcast.emit("someoneStrokedPath", { x, y, color });
	});
	// ================ end for sketchIO ===============================

	socket.on("disconnect", () => {
		if (allSockets && allSockets[socket.room])
			allSockets = allSockets[socket.room].filter(s => s.id !== socket.id);

		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: `${socket.username} just left the chat.`,
			username: "Bot",
			color: colors[0]
		});
	});
};

export default socketController;
