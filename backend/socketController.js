import colors from "./colors.js";

let allSockets = [];
let colorIncrementor = 1;

const getUserString = () => {
	let usersString = "";

	allSockets.forEach(socket => {
		usersString += socket.username + ", ";
	});

	return usersString.trim().slice(0, usersString.length - 1); // to not send the trailing comma
};

const getPieceColor = game => {
	let chessColor = "white",
		checkersColor = "red";

	allSockets.forEach(socket => {
		if (game === "chess") {
			if (socket.chessPieceColor === "white") {
				chessColor = "black";
				return chessColor;
			}
		} else if (game === "checkers") {
			if (socket.checkersPieceColor === "white") {
				checkersColor = "black";
				return checkersColor;
			}
		}
	});

	return game === "chess" ? chessColor : game === "checkers" ? checkersColor : null;
};

const socketController = socket => {
	socket.on("newConnection", ({ username }) => {
		// set username and name color for the joined user
		console.log(username);
		socket.username = username;
		socket.color = colors[colorIncrementor];
		socket.chessPieceColor = getPieceColor("chess");

		// add user to the connected sockets
		allSockets.push({
			id: socket.id,
			username: socket.username,
			color: socket.color,
			chessPieceColor: socket.chessPieceColor
		});

		console.log(allSockets);

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;
	});

	socket.on("getChessPieceColor", () => {
		socket.emit("setChessPieceColor", { chessPieceColor: socket.chessPieceColor });
	});

	socket.on("newUserJoinsChat", ({ username }) => {
		socket.broadcast.emit("newMessageReceived", {
			newMessage: `${username} just joined the chat!`,
			username: "Bot",
			color: colors[0]
		});

		const allUsersString = getUserString();

		socket.emit("newMessageReceived", {
			newMessage: `Currently in the chat -\n ${allUsersString}`,
			username: "Bot",
			color: colors[0]
		});
	});

	// for sending a new message to all users
	socket.on("newMessage", ({ inputMessage }) => {
		console.log("server newMessage = ", inputMessage);

		socket.broadcast.emit("newMessageReceived", {
			newMessage: inputMessage,
			username: socket.username,
			color: socket.color
		});
	});

	socket.on("movePlayed", ({ cellsClicked }) => {
		console.log("opponentPlayedAMove", cellsClicked);
		socket.broadcast.emit("opponentPlayedAMove", { cellsClicked });
	});

	socket.on("disconnect", () => {
		allSockets = allSockets.filter(s => s.id !== socket.id);

		socket.broadcast.emit("newMessageReceived", {
			newMessage: `${socket.username} just left the chat.`,
			username: "Bot",
			color: colors[0]
		});
	});
};

export default socketController;
