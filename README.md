# odd-kernel
A javascript kernel for ODD with a console.

Kernel itself located at `/src/lib/kernel.js`.

## docs
### commands/dasm
- stack
	- `0x0001` `psh x`
		- add decval or hexval x to stack
		- if decval, converted to hexval
	- `0x0002` `pop`
		- removes value from top of stack
	- `0x0003` `clr`
		- clears current stack
		- is potetially hazerdous

- math
	- `0x0010` `add`
		- mathematically adds two hexvals on top of stack
		- outputs on top of stack
		- if not enough args/causes overflow, oops
	- `0x0011` `sub`
		- mathematically subtracts two hexvals from top of stack
		- `s[1] - s[0]`
		- outputs on top if stack
		- if not enough args/causes underflow, oops

- conditional
	- acts as jmp command, else ignored
	- compares values in order `s[1] >> s[0]`
	- `0x0020` `igt x`
		- if greater than
	- `0x0021` `ilt x`
		- if less than
	- `0x0022` `ieg x`
		- if greater than or equal to
	- `0x0023` `iel x`
		- if greater than or equal to
	- `0x0024` `ieq x`
		- if equal to

- misc
	- `0x0000` `jmp x`
		- sets hexval of program counter to x
		- if type of x isn't hexval, oops

### error handling
- oops
	- prints `oops: x` where x is the error
	- stops offending process, if it cannot, triggers a panic

- panic
	- prints `panic: x` where x is the error
	- freezes system, reboot required

### types
- decval
	- decimal value
	- three digits
	- range of `0` through `255`
	- eg. `013`, `231`, invalid: `13`, `275`

- hexval
	- hexadecimal value
	- 6 digits
	- begins with `0x`
	- remaining four characters can be in the range of `0` through `9`, `a` through `f`
	- eg. `0x0001`, `0xf046`

- char
	- represents an ascii character
	- evaluates to decval
	- eg. `a`, `A`
