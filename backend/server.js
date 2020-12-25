import express from "express";
import http from "http";
import { Server } from "socket.io";
import colors from "./colors.js";

const app = express();
const PORT = 5000;
const server = http.createServer(app);

app.get("/", (req, res) => {
	res.json({ message: "you are now connected..." });
});

server.listen(PORT, console.log(`Server listening at port : ${PORT}`));

const io = new Server(server);
let colorIncrementor = 1;

io.on("connection", socket => {
	socket.on("newConnection", ({ username }) => {
		socket.username = username;
		socket.color = colors[colorIncrementor];

		socket.broadcast.emit("newMessageReceived", {
			newMessage: `${username} just joined the chat!`,
			username: "Bot",
			color: colors[0]
		});

		colorIncrementor =
			colorIncrementor + 1 === colors.length ? 1 : colorIncrementor + 1;
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
		socket.broadcast.emit("newMessageReceived", {
			newMessage: `${socket.username} just left the chat.`,
			username: "Bot",
			color: colors[0]
		});
	});
});
