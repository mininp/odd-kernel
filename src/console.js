const width = document.body.clientWidth;
const height = document.body.clientHeight;

let buffer = "Testing Testing 123\nHello, World!\n\n[x@y ~]$ _"

let c = document.createElement("canvas");
document.body.appendChild(c);
c.width = width;
c.height = height;

let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em monospace";

(function render() {
	window.requestAnimationFrame(render);

	ctx.fillStyle = "#161621";
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = "#ddd";

	buffer.split("\n").forEach((string, i) => {
		ctx.fillText(string, 0, em(i + 1));
	});
})();

function em(x = 1) {
	return x * parseFloat(getComputedStyle(document.body).fontSize);
}
