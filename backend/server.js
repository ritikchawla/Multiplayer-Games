import express from "express";
import http from "http";
import { Server } from "socket.io";
import socketController from "./socketController.js";

const app = express();
const PORT = 5000;
const server = http.createServer(app);

app.get("/", (req, res) => {
	res.json({ message: "you are now connected..." });
});

server.listen(PORT, console.log(`Server listening at port : ${PORT}`));

const io = new Server(server);

io.on("connection", socket => socketController(socket));
