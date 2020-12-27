class SketchIO {
	constructor(canvas, context, socket) {
		this.canvas = canvas;
		this.ctx = context;
		this.initialFillStyle = "white";
		this.initialStrokeStyle = "black";
		this.socket = socket;
		this.painting = false;
		this.filling = false;
		this.setInitialStyles();
	}

	toggleFillPaint = () => {
		this.painting = !this.painting;
		this.filling = !this.filling;
	};

	getPainting = () => this.painting;

	getFilling = () => this.filling;

	fill = (color = null) => {
		if (color === null) {
			this.ctx.fillStyle = this.initialFillStyle;
		} else {
			this.ctx.fillStyle = color;
		}

		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	setInitialStyles = () => {
		this.ctx.fillStyle = this.initialFillStyle;
		this.ctx.strokeStyle = this.initialStrokeStyle;
		this.fill(this.ctx.fillStyle);
	};

	changeCanvasColor = color => {
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;
	};

	beginPath = (x, y) => {
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
	};

	drawPath = (x, y, color) => {
		this.ctx.strokeStyle = color;
		this.ctx.lineTo(x, y);
		this.ctx.stroke();
	};

	onMouseMove = e => {
		let x = e.offsetX,
			y = e.offsetY;
		if (!this.painting) {
			this.beginPath(x, y);
			this.socket.emit("beganPath", { x, y });
		} else {
			this.drawPath(x, y, this.ctx.strokeStyle);
			this.socket.emit("strokedPath", { x, y, color: this.ctx.strokeStyle });
		}
	};

	handleCanvasClick = () => {
		if (this.filling) {
			this.fill(this.ctx.fillStyle);
			this.socket.emit("startedFilling", { color: this.ctx.fillStyle });
		}
	};

	setPaintingTrue = () => (this.painting = true);
	setPaintingFalse = () => (this.painting = false);

	enableCanvas = () => {
		this.canvas.addEventListener("mousemove", this.onMouseMove);
		this.canvas.addEventListener("mousedown", this.setPaintingTrue);
		this.canvas.addEventListener("mouseup", this.setPaintingFalse);
		this.canvas.addEventListener("mouseleave", this.setPaintingFalse);
		this.canvas.addEventListener("click", this.handleCanvasClick);
	};

	disableCanvas = () => {
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.canvas.removeEventListener("mousedown", this.setPaintingTrue);
		this.canvas.removeEventListener("mouseup", this.setPaintingFalse);
		this.canvas.removeEventListener("mouseleave", this.setPaintingFalse);
		this.canvas.removeEventListener("click", this.handleCanvasClick);
	};
}

export default SketchIO;
