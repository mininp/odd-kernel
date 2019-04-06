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

			} break;
		}
	}
}
