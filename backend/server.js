import express from "express";
import dotenv from "dotenv";
import path from "path";

import http from "http";
import { Server } from "socket.io";
import socketController from "./socketController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// this gives the absolute path
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.json({ message: "API Connected..." });
	});
}

server.listen(PORT, console.log(`Server listening at port : ${PORT}`));

const io = new Server(server);

io.on("connection", socket => socketController(socket, io));
