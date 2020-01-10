///////////////////////////////////////////
//        Prop 3 by DexieTheSheep        //
//   https://github.com/Lamby777/Prop    //
///////////////////////////////////////////

// Constants
const DEV = true; // Shows stats 4 nerds
const SHOW_FPS = true;
const MAX_FPS = 60;
const FRAMETIME = Math.floor(1000/MAX_FPS);

game = {
	ground: {
		height: 140
	},
}

level = {
	friction: 0.8,
	accel: 1.9,
	gravity: 1,
	maxfall: 10,
}

// Initialize Variables
let lastFramecount, fps, cx, cy,
	props = [];

// Canvas
let canvas = document.getElementById("prop-canvas");
const c = canvas.getContext("2d");

// On page load, plus every time the page is resized
window.onload = window.onresize = function() {
	canvas.width  = cx = window.innerWidth;
	canvas.height = cy = window.innerHeight;
}

class Prop {
	constructor(x=0, y=0, w=16, h=16) {
		this.x = x, this.y = y,
		this.w = w, this.h = h,
		this.img = null,
		this.sheet = null,
		props.push(this);
	}
	meta = {
		enabled: false,
		flipped: false,
		screenWrap: false,
		borderBypass: false,
	};
	touching(rect) {
		return !(rect.x > (this.x + this.w) ||
				(rect.x + rect.w) < this.x ||
				rect.y > (this.y + this.h) ||
				(rect.y + rect.h) < this.y);
	}
	image(src) {
		if (!src) this.img = null;
		else {
			this.img = new Image();
			this.img.src = "src/" + this.color;
		}
	}
	prepareUpdate() {
		if (this.meta.physics) {
			this.y += gravity - yvel;
		}
		if (this.sheet) this.animate();
		this.x += this.xvel;
		this.y -= this.yvel;
		if (!this.meta.borderBypass) {
			if (this.x + this.w > cx) {
				this.x = cx - this.w;
			}
			if (this.x < 0) {
				this.x = 0;
			}
		}
		if (this.meta.screenWrap) {
			if (this.x + this.w >= cx) {
				this.x = 1;
			} else if (this.x <= 0) {
				this.x = (cx - this.w) - 1;
			}
		}
	}
	update() {
		if (this.sheet) {
			c.drawImage(this.img,
				(this.frame * (this.img.width / this.frames)),
				0, (this.img.width / this.frames),
				this.img.height,
				this.x, this.y,
				this.w,
				this.h);
		} else {
			c.drawImage(this.img, this.x, this.y, this.w, this.h);
		}
	}
}

function update() {
	c.clearRect(0,0,cx,cy);
	redrawSettings();
	//redrawAmbient();
	redrawProps();
	if (SHOW_FPS) redrawFramecount();
}

function redrawProps() {
	for (prop of props) {
		prop.update();
	}
}

function redrawFramecount() {
	if(!lastFramecount) {
		lastFramecount = performance.now();
		fps = 0;
		return;
	}
	let delta = (performance.now() - lastFramecount)/1000;
	lastFramecount = performance.now();
	fps = 1/delta;
	c.strokeColor = "white";
	c.fillColor = "black";
	c.fillText(fps.toString(), cx-24, cy-24);
	c.stroke();
}

function redrawSettings() {}

// USER WRITTEN CODE

setInterval(update, FRAMETIME)
