const width = document.body.clientWidth;
const height = document.body.clientHeight;

let c = document.createElement("canvas");
document.body.appendChild(c);
c.width = width;
c.height = height;

let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em Arial";

(function render() {
	window.requestAnimationFrame(render);

	ctx.fillStyle = "#161621";
	ctx.fillRect(0, 0, width, height);
})();
