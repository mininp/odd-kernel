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
		switch (instruction[0]) {
			case "0x0001": {
				this.emit("message", "hi")
			} break;

			default: this.panic("invalid instruction"); break; // will oops if in process
		}
	}

	oops(process, error) {
		this.emit("oops", `panic: ${error ? error : "no error"}`);

		// placeholder
	}

	panic(error) {
		this.emit("message", `panic: ${error ? error : "no error"}`);

		//while (true) {
		//	this.emit("message", "");
		//}
	}
}
