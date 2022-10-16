export function errorCatch(error) {
	let errorArray = error.message.split(" ");
	let index = errorArray.findIndex((i) => i == "reverted:");
	errorArray.splice(0, index + 1);
	let res = errorArray.join(" ");
	alert(res);
}
