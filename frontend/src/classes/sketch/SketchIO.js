class SketchIO {
	constructor(canvas, context) {
		this.canvas = canvas;
		this.ctx = context;
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

	fill = () => {
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	setInitialStyles = () => {
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
		this.fill();
	};

	changeCanvasColor = color => {
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;
	};

	onMouseMove = e => {
		console.log("onMouseMove");
		console.log("onMouseMove, if condtion");
		let x = e.offsetX,
			y = e.offsetY;
		if (!this.painting) {
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
		} else {
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}
	};

	handleCanvasClick = () => {
		if (this.filling) {
			this.fill();
		}
	};

	onMouseDown = () => (this.painting = true);
	onMouseUp = () => (this.painting = false);

	enableCanvas = () => {
		this.canvas.addEventListener("mousemove", this.onMouseMove);
		this.canvas.addEventListener("mousedown", this.onMouseDown);
		this.canvas.addEventListener("mouseup", this.onMouseUp);
		this.canvas.addEventListener("click", this.handleCanvasClick);
	};

	disableCanvas = () => {
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.canvas.removeEventListener("mousedown", this.onMouseDown);
		this.canvas.removeEventListener("mouseup", this.onMouseUp);
		this.canvas.removeEventListener("click", this.handleCanvasClick);
	};
}

export default SketchIO;
