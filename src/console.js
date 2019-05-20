const emu = new Kernel();

const width = document.body.clientWidth;
const height = document.body.clientHeight;

document.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "Backspace": {
			if (inputBuffer.length > 0) {
				inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
			}
		} break;

		case "Enter": {
			buffer += `\n${ps1}${inputBuffer}\n`;
	
			emu.command(parse(inputBuffer));
			lastBuffer = inputBuffer;
			inputBuffer = "";
		} break;

		case "ArrowUp": {
			let x = lastBuffer;
			lastBuffer = inputBuffer;
			inputBuffer = x;
		} break;

		default: {
			if (e.key.length == 1) {
				inputBuffer += e.key;
			}
		}
	}

	blink = true;
});

emu.on("message", (m) => {
	buffer += `${m}\n`;
});

emu.on("oops", (m) => {
	buffer += `${m}\n`;
});

emu.on("panic", (m) => {
	buffer += `${m}\n`;
});

// initialize canvas
let c = document.createElement("canvas");
document.body.appendChild(c);
c.width = width;
c.height = height;

let ctx = c.getContext("2d");
ctx.lineWidth = 2;
ctx.font = "1em monospace";

// temp
let frame = 0;
let blink = false;

let lastBuffer = "";
let inputBuffer = "";
let buffer = [
	"ODD Kernel Console",
	`Running Kernel odd-${emu.version}`,
].join("\n") + "\n";
let ps1 = "$ ";

(function render() {
	frame++;

	if (frame % 30 == 0)
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

function parse(command) {
	let instruction = command.match(/[^\s"]+|"[^"]*"/g) || [];
	let fInstruction = [];

	switch (instruction[0]) {
		// misc
		case "jmp": instruction[0] = "0"; break;
		case "msg": instruction[0] = "1"; break;

		// stack
		case "psh": instruction[0] = "10"; break;
		case "pop": instruction[0] = "11"; break;
		case "clr": instruction[0] = "100"; break;

		// math
		case "add": instruction[0] = "101"; break;
		case "sub": instruction[0] = "110"; break;

		// conditional
		case "igt": instruction[0] = "111"; break;
		case "ilt": instruction[0] = "1000"; break;
		case "ieg": instruction[0] = "1001"; break;
		case "iel": instruction[0] = "1010"; break;
		case "ieq": instruction[0] = "1011"; break;
	}

	for (let i = 0; i < instruction.length; i++) {
		let arg = instruction[i];

		if (arg.startsWith("'") && arg.endsWith("'")) {
			arg = simplifyChar(arg);
			fInstruction.push(arg);
		} else if (arg.startsWith(`"`) && arg.endsWith(`"`)) {
			arg = simplifyString(arg);
			fInstruction = fInstruction.concat(arg);
		} else if (arg.startsWith("0x")) {
			arg = hexToBinary(arg);
			fInstruction.push(arg);
		} else {
			fInstruction.push(arg);
		}
	}

	return fInstruction;
}

function em(x = 1) {
	return x * parseFloat(getComputedStyle(document.body).fontSize);
}
