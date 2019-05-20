class Kernel {
	constructor() {
		this.version = "0.1";

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

	command(instruction) {
		switch (binaryToDecimal(instruction[0])) {
			case 1: {
				instruction.shift();

				this.emit("message", charsToString(instruction));
			} break;

			default: this.panic("invalid instruction"); break; // will oops if in process
		}
	}

	oops(process, error) {
		this.emit("oops", `error: ${error ? error : "no error"}`);
	}

	panic(error) {
		this.emit("panic", `error: ${error ? error : "no error"}`);
	}
}
