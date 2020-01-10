///////////////////////////////////////////
//        Prop 3 by DexieTheSheep        //
//   https://github.com/Lamby777/Prop    //
///////////////////////////////////////////

// Constants
const DEV = true; // Shows stats 4 nerds
const SHOW_FPS = true;

game = {
	ground: {
		height: 140
	},
}

level = {
	friction: 0.8,
	accel: 1.9,
	gravity: 1,
	maxfall: 10
}

// Initialize Variables
let lastFramecount, fps, cx, cy;

// Canvas
let canvas = document.getElementById("prop-canvas");
const c = canvas.getContext("2d");

// On page load, plus every time the page is resized
window.onload = window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	cx = canvas.width;
	cy = canvas.height;
}

class Prop {
	constructor(x, y, w, h) {
		this.x = x,
		this.y = y,
		this.w = w,
		this.h = h;
	}
	touching(rect) {
		return !(rect.x > (this.x + this.w) ||
				(rect.x + rect.w) < this.x ||
				rect.y > (this.y + this.h) ||
				(rect.y + rect.h) < this.y);
	}
	image(src) {
		//
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
}

function update() {
	clear();
	redrawSettings();
	redrawAmbient();
	redrawProps();
	if (SHOW_FPS) redrawFramecount();
}

function redrawProps() {
	for (prop of props) {}
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
	c.strokeColor = white;
	c.fillColor = black;
	c.strokeText(fps.toString(), cx-24, cy-24);
}

function redrawSettings() {}