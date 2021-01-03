import colors from "./colors.js";
import { getPieceColor, getUserString } from "./helpers.js";
import { addSocketToList, chooseNewPainter } from "./socketHelpers.js";

let allSockets = {};
let colorIncrementor = 1;
let wordToPaint = null;

const sendInviteScreenPlayerUpdate = (socket, io) => {
	io.to(socket.room).emit(`${socket.roomName}PlayerUpdate`, {
		allSocketsForRoom: allSockets[socket.room]
	});
};

const sendPlayerLeaveUpdate = socket => {
	// to show players leaveing on the InvitePlayers screen
	socket.to(socket.room).broadcast.emit("playerLeaveUpdate", {
		allRoomSockets: allSockets[socket.room]
	});
};

const socketController = (socket, io) => {
	socket.on("newConnection", ({ username, room }) => {
		// set username and name color for the joined user
		socket.username = username;
		socket.color = colors[colorIncrementor];
		socket.room = room;
		socket.roomName = room.split("_")[0];
		socket.join(room);

		allSockets = addSocketToList(allSockets, socket);

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;

		sendInviteScreenPlayerUpdate(socket, io);
	});

	// ========================= for all games ====================================
	socket.on("redirectToGame", ({ game }) => {
		socket.to(socket.room).broadcast.emit("redirectedToGame", { game });
	});

	// send chess or checkers move
	socket.on("movePlayed", ({ cellsClicked }) => {
		socket.to(socket.room).broadcast.emit("opponentPlayedAMove", { cellsClicked });
	});

	// chess and checkers game over
	socket.on("gameOver", gameOverObject => {
		socket.to(socket.room).broadcast.emit("gameHasEnded", gameOverObject);
	});

	// ========================= for all games ====================================

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
		if (socket.roomName === "sketchio") {
			console.log("wordToPaint =", wordToPaint);
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

				sendInviteScreenPlayerUpdate(socket, io);

				[currentPainter, wordToPaint] = chooseNewPainter(allSockets, socket, io);
			}
		}
	});
	// ===================== end for Chat ======================================

	// ================== for chess ===================================
	socket.on("getChessPieceColor", () => {
		socket.emit("setChessPieceColor", {
			chessPieceColor: socket.chessPieceColor
		});
	});

	socket.on("castlingDone", ({ cellsClicked }) => {
		socket.to(socket.room).broadcast.emit("opponentCastled", { cellsClicked });
	});

	// ================== end for chess ===================================

	// =================== for CHECKERS =================================================
	socket.on("getCheckersPieceColor", () => {
		socket.emit("setCheckersPieceColor", {
			checkersPieceColor: socket.checkersPieceColor
		});
	});
	// =================== end for CHECKERS =================================================

	// ================ for sketchIO ===============================
	socket.on("startSketchIO", () => {
		if (socket.roomName === "sketchio" && allSockets[socket.room].length > 1) {
			// only start the game when there are atleast two members
			// chooseNewPainter emits an event called 'painter has been chosen'
			setTimeout(() => {
				[currentPainter, wordToPaint] = chooseNewPainter(allSockets, socket, io);
			}, 2000);
		}
	});

	socket.on("startedFilling", ({ color }) => {
		socket.to(socket.room).broadcast.emit("someoneFilled", { color });
	});

	socket.on("beganPath", ({ x, y }) => {
		socket.to(socket.room).broadcast.emit("someoneBeganPath", { x, y });
	});

	socket.on("strokedPath", ({ x, y, color }) => {
		socket.to(socket.room).broadcast.emit("someoneStrokedPath", { x, y, color });
	});
	// ================ end for sketchIO ===============================

	socket.on("disconnect", () => {
		if (allSockets && allSockets[socket.room]) {
			allSockets[socket.room] = allSockets[socket.room].filter(
				s => s.id !== socket.id
			);
		}

		sendPlayerLeaveUpdate(socket);

		socket.to(socket.room).broadcast.emit("newMessageReceived", {
			newMessage: `${socket.username} just left the chat.`,
			username: "Bot",
			color: colors[0]
		});
	});
};

export default socketController;
