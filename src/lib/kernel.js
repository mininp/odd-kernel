class Kernel {
	constructor(ramLength = 1024) {
		this.name = "odd";
		this.version = "0.1";

		this.events = []

		this.stack = []
		this.memory = {}

		for (let i = 0; i < ramLength; i++) {
			this.memory[i] = 0;
		}
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
		});
	}

	command(instruction) {
		switch (binaryToDecimal(instruction[0])) {
			// misc
			case 0: { // jmp
				// code
			} break;

			case 1: { // msg
				instruction.shift();

				let chars = instruction;

				if (instruction.length == 0)
					chars = this.stack.map(x => decimalToBinary(x));

				this.emit("message", charsToString(chars));
			} break;

			// stack
			case 2: this.stack.push(binaryToDecimal(instruction[1])); break;
			case 3: this.stack.pop(); break;
			case 4: this.stack = []; break;

			// memory
			case 12: { // mem
				let start = lastOf(this.stack, 2);
				let end = lastOf(this.stack);

				this.memory[start] = 2;
				this.memory[end] = 3;
				
				for (let i = start + 1; i < end; i++) {
					this.memory[i] = 65;
				}
			} break;

			case 13: { // umm
				let start = lastOf(this.stack, 2);
				let end = lastOf(this.stack);

				for (let i = start; i < end + 1; i++) {
					this.memory[i] = 0;
				}
			} break;

			case 14: break;
			case 15: break;

			default: this.panic("invalid instruction"); break; // will oops if in process
		}
	}

	oops(process, error) {
		console.warn(error);
		this.emit("oops", `error: ${error ? error : "no error"}`);
	}

	panic(error) {
		console.error(error);
		this.emit("panic", `error: ${error ? error : "no error"}`);
	}
}
