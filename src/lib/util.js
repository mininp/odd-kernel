Array.prototype.last = () => {
	return this[this.length - 1];
}

function isBinary(bin) {
	for (let i = 0; i < bin.length; i++) {
		if (bin[i] != "1" && bin[i] != "0")
			return false;
	}

	return true;
}

function simplifyChar(_char) {
	let char = _char.substring(1, 2);
	return decimalToBinary(char.codePointAt(0));
}

function simplifyString(_string) {
	let string = _string.substring(1, _string.length - 1);
	return string.split("").map(x => decimalToBinary(x.codePointAt(0)));
}

function charsToString(chars) {
	return String.fromCharCode.apply(this, chars.map(binaryToDecimal));
}

// hex operations
function hexToBinary(hex) {
	return parseInt(hex, 16).toString(2);
}
function hexToDecimal(hex) {
	return parseInt(hex, 16).toString(10);
}

// binary operations
function binaryToHex(bin) {
	return parseInt(bin, 2).toString(16);
}

function binaryToDecimal(bin) {
	return parseInt(bin, 2);
}

// decimal operations
function decimalToBinary(dec) {
	return dec.toString(2);
}

function decimalToHex(dec) {
	return dec.toString(16);
}
