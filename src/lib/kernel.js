class Kernel {
	constructor() {
		this.version = "0.1";

		this.processes = [];

		this.events = [];
	}

	on(e, callback) {
		this.events.push({
			event: e,
			callback: callback,
		});
	}

	emit(e, arg) {
		this.events.forEach((event) => {
			if (event.event == e) {
				event.callback(arg);
			}
		})
	}

	command(command) {
		this.emit("message", `received command: ${command}`);
	}

	tick() {
		// placeholder
	}
}

class Process {
	constructor(instructions) {
		this.instructions = instructions;

		this.counter = 0;
	}
}

function toHex(decimal) {
	let hex = decimal.toString(16);

	return `0x${"0".repeat(4 - hex.length)}${hex}`;
}
