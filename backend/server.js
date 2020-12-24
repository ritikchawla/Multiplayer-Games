import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 5000;

const server = http.createServer(app);

app.get("/", (req, res) => {
	res.json({ message: "you are now connected..." });
});

server.listen(PORT, console.log(`Server listening at port : ${PORT}`));

const io = new Server(server);

io.on("connection", socket => {
	// console.log("you're now connected to socket");

	socket.on("nc", () => console.log("new connection found"));

	// for sending a new message to all users
	socket.on("newMessage", ({ inputMessage }) => {
		console.log("server newMessage = ", inputMessage);
		io.emit("newMessageReceived", { newMessage: inputMessage });
	});
});
