function onlyDigits(event) {
	let value = event.value;
	event.value = value.replace(/\D/g, "");
}
