import { web3 } from "./network.js";

export function validation(elem, type) {
    elem.classList.remove("validation-error");

	if (type == undefined) {
		if (elem.value.trim() == "") {
            elem.classList.add("validation-error");
			return false;
		}
		return true;
	} else if (type == "address") {
        
		if (elem.value.trim() == "") {
			elem.classList.add("validation-error");
			return false;
		}
		if (!web3.utils.isAddress(elem.value)) {
			elem.classList.add("validation-error");
			return false;
		}
		return true;
	}
}
