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
