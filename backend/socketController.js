import colors from "./colors.js";
import { getUserString } from "./helpers.js";
import { addSocketToList, chooseNewPainter } from "./socketHelpers.js";

let allSockets = {};
let colorIncrementor = 1;
let wordToPaint = null;
let currentPainter = null;

const sendSketchIOPlayerUpdate = (socket, io) => {
	io.to(socket.room).emit("sketchioPlayerUpdate", {
		allSketchIOSockets: allSockets[socket.room]
	});
};

const socketController = (socket, io) => {
	socket.on("newConnection", ({ username, room }) => {
		// set username and name color for the joined user
		socket.username = username;
		socket.color = colors[colorIncrementor];
		socket.room = room;
		socket.join(room);

		allSockets = addSocketToList(allSockets, socket);

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;

		if (socket.room === "sketchio") {
			sendSketchIOPlayerUpdate(socket, io);
		}

		if (socket.room === "sketchio" && allSockets[socket.room].length > 1) {
			// only start the game when there are atleast two members
			[currentPainter, wordToPaint] = chooseNewPainter(allSockets, socket, io);
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
		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: inputMessage,
			username: socket.username,
			color: socket.color
		});

		// word was guessed correctly in the sketchio game
		if (socket.room === "sketchio") {
			if (inputMessage.toLowerCase() === wordToPaint) {
				socket.points += 5;

				allSockets[socket.room] = allSockets[socket.room].map(s => {
					if (s.id === socket.id) {
						s.points += 5;
					}

					return s;
				});

				io.to(socket.room).emit("newMessageReceived", {
					newMessage: `${socket.username} guessed the word correctly.\n Word was ${wordToPaint}`,
					username: "Bot",
					color: colors[0]
				});

				sendSketchIOPlayerUpdate(socket, io);

				[currentPainter, wordToPaint] = chooseNewPainter(allSockets, socket, io);
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
