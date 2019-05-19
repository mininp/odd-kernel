# odd-kernel
A javascript kernel for ODD with a console.

Kernel itself located at `/src/lib/kernel.js`.

## docs
### commands/oasm
- stack
	- `00000010` | `psh x`
		- add x to stack
	- `00000011` | `pop`
		- removes value from top of stack
	- `00000100` | `clr`
		- clears current stack
		- is potetially dangerous

- math
	- `00000101` | `add`
		- mathematically adds two values on top of stack
		- outputs on top of stack
		- if not enough args/causes overflow, oops
	- `00000110` | `sub`
		- mathematically subtracts two values from top of stack
		- ordered`s[1] - s[0]`
		- outputs on top of stack
		- if not enough args/causes underflow, oops

- conditional
	- if true acts as jmp command, else ignored
	- compares values in order `s[1] >> s[0]`
	- if not enough args, oops
	- `00000111` | `igt x`
		- if greater than
	- `00001000` | `ilt x`
		- if less than
	- `00001001` | `ieg x`
		- if greater than or equal to
	- `00001010` | `iel x`
		- if greater than or equal to
	- `00001011` | `ieq x`
		- if equal to

- misc
	- `00000000` | `jmp x`
		- sets value of program counter to x
		- if x isn't specified, act as null
	- `00000001` | `msg x`
		- sends messages with string x
		- although x can be any type

### error handling
- oops
	- prints `oops: x` where x is the error
	- stops offending process, if it cannot, triggers a panic

- panic
	- prints `panic: x` where x is the error
	- freezes system, reboot required

### types
- binary
	- binary value
	- eg. `01`, `1`, `10`

- hex
	- hexadecimal value
	- begins with `0x`
	- converted to binary
	- eg. `0x01`, `0x1`, `0x2`

- char
	- represents an ascii character
	- one character long
	- surrounded with single quotes
	- converted to 8-bit value
	- eg. `'a'`, `'A'`

- string
	- represents a collection of ascii characters
	- surrounded with double quote
	- converted to multiple chars
	- eg. `"Hello, World!"`
