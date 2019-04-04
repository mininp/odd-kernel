const width = document.body.clientWidth;
const height = document.body.clientHeight;
const maxchar = document.body.clientWidth / em();

let inputBuffer = "";
let buffer = "ODD Kernel Console\n";
let ps1 = "$ ";

document.addEventListener("keydown", (e) => {
	if (e.code == "Backspace") {
		if (inputBuffer.length > 0) {
			inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
		}
	} else {
		if (e.key.length == 1) {
			inputBuffer += e.key;
		}
	}

	blink = true;
});

let c = document.createElement("canvas");
document.body.appendChild(c);
c.width = width;
c.height = height;

let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em monospace";

let frame = 0;
let blink = false;

(function render() {
	frame++;

	if (frame % 60 == 0)
		blink = !blink;

	window.requestAnimationFrame(render);

	ctx.fillStyle = "#161621";
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = "#ddd";

	{ // draw text
		let index;
	
		// buffer
		buffer.split("\n").forEach((string, i) => {
			index = i;
			ctx.fillText(string, 0, em(i + 1));
		});
	
		// prompt
		let p = ps1 + inputBuffer;
	
		if (blink)
			p += "|";
	
		ctx.fillText(p, 0, em(index + 2));
	}
})();

function em(x = 1) {
	return x * parseFloat(getComputedStyle(document.body).fontSize);
}
