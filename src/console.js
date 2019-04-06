const emu = new Kernel();

const width = document.body.clientWidth;
const height = document.body.clientHeight;
const maxchar = document.body.clientWidth / em();

let inputBuffer = "";
let buffer = [
	`ODD Kernel Console v${emu.version}`,
].join("\n") + "\n";
let ps1 = "$ ";

document.addEventListener("keydown", (e) => {
	if (e.code == "Backspace") {
		if (inputBuffer.length > 0) {
			inputBuffer = inputBuffer.substring(0, inputBuffer.length - 1);
		}
	} else if (e.code == "Enter") {
		buffer += `\n${ps1}${inputBuffer}\n`;

		emu.command(parse(inputBuffer));
		inputBuffer = "";
	} else {
		if (e.key.length == 1) {
			inputBuffer += e.key;
		}
	}

	blink = true;
});

emu.on("message", (m) => {
	buffer += `${m}\n`;
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

function parse(command) {
	let instruction = command.split('"');

	instruction.forEach((v, i) => {
		if (i == 0) {
			switch (v) {
				// misc
				case "jmp": instruction[0] = "0x0000"; break;
				case "msg": instruction[0] = "0x0001"; break;

				// stack
				case "psh": instruction[0] = "0x0002"; break;
				case "pop": instruction[0] = "0x0003"; break;
				case "clr": instruction[0] = "0x0004"; break;

				// math
				case "add": instruction[0] = "0x0010"; break;
				case "sub": instruction[0] = "0x0011"; break;

				// conditional
				case "igt": instruction[0] = "0x0020"; break;
				case "ilt": instruction[0] = "0x0021"; break;
				case "ieg": instruction[0] = "0x0022"; break;
				case "iel": instruction[0] = "0x0023"; break;
				case "ieq": instruction[0] = "0x0024"; break;

				default: instruction[0] = "0xffff"; break;
			}
		} else {
			
		}
	});

	return instruction;
}

function isHex(hex) {
	return hex.length == 6 &&
	       hex.startsWith("0x") &&
	       /[0-9a-f]/i.test(hex[2]) &&
	       /[0-9a-f]/i.test(hex[3]) &&
	       /[0-9a-f]/i.test(hex[4]) &&
	       /[0-9a-f]/i.test(hex[5]);
}

function isChar(char) {
	return char.length == 3 &&
	       char.startsWith("'") &&
	       char.endsWith("'");
}

function isString(string) {
	return string.startsWith('"') && string.endsWith('"');
}

function charToHex(char) {
	return decimalToHex(char.charCodeAt(0));
}

function hexToChar(hex) {
	return String.fromCharCode(parseInt(hex));
}

function decimalToHex(decimal) {
	let hex = decimal.toString(16);

	return `0x${"0".repeat(4 - hex.length)}${hex}`;
}

function em(x = 1) {
	return x * parseFloat(getComputedStyle(document.body).fontSize);
}
