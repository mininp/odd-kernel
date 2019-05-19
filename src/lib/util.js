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

function binaryToDecimal(bin) {
	return parseInt(bin, 2);
}

function decimalToBinary(dec) {
	return dec.toString(2);
}
