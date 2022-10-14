import { web3, contractInstanse } from "./network.js";
import { account } from "./main.js";
import { getBalance } from "./getBalance.js";
import { renderHistory } from "./renderHistory.js";
import { errorCatch } from "./errorCatch.js";
import { validation } from "./validation.js";

export async function createTransfer() {
	let modal = document.querySelector("#modal-create-transfer");
	modal.style.display = "flex";
	modal.onclick = (event) => {
		let isModal = event.target.closest(".modal-auth");
		let isCloseBtn = event.target.closest(".close-modal");
		if (!isModal || isCloseBtn) {
			modal.style.display = "none";
		}
	};
	let transfer = document.querySelector(".transfer");
	let safeTransferBtn = document.querySelector(".safe-transfer");
	let categoriesSelect = document.querySelector("#category");
	let patternsSelect = document.querySelector("#pattern");
	let safeTransfer = false;
	let currentCategory, currentPattern;
	let categories = await contractInstanse.methods
		.showCategories()
		.call({ from: account });
	let patterns = await contractInstanse.methods
		.showPatterns()
		.call({ from: account });

	categoriesSelect.innerHTML = "<option value=''>Select category</option>";
	for (let elem of categories) {
		let opt = document.createElement("option");
		opt.innerHTML = elem[1];
		opt.value = elem[0];
		categoriesSelect.append(opt);
	}

	categoriesSelect.addEventListener("change", (event) => {
		currentCategory = event.target.value;
		patternsSelect.innerHTML = "<option value=''>...</option>";
		let currentPatternId = -1;
		for (let elem of patterns) {
			currentPatternId++;
			if (elem[0] == currentCategory) {
				let opt = document.createElement("option");
				opt.innerHTML = `${elem[1]}: ${elem[2]} coins`;
				opt.value = currentPatternId;
				patternsSelect.append(opt);
			}
		}
	});

	patternsSelect.addEventListener("change", (event) => {
		currentPattern = patterns[event.target.value];
		amountMoneyInp.value = currentPattern ? currentPattern[2] : "";
	});

	safeTransferBtn.addEventListener("click", () => {
		if (safeTransfer == false) {
			safeTransfer = true;
		} else {
			safeTransfer = false;
		}
	});

	transfer.onclick = async (event) => {
		event.preventDefault();

		let recieverInp = document.querySelector(".reciever");
		let recieverInpValid = validation(recieverInp, "address");
		let amountMoneyInp = document.querySelector(".money");
		let amountMoneyInpValid = validation(amountMoneyInp);
		let codewordInp = document.querySelector(".codeword");
		let codewordInpValid = validation(codewordInp);
		let categoriesSelectValid = validation(categoriesSelect);

		if (
			recieverInpValid &&
			amountMoneyInpValid &&
			codewordInpValid &&
			categoriesSelectValid
		) {
			try {
				let to = recieverInp.value.trim();
				let money = web3.utils.toWei(
					amountMoneyInp.value.trim(),
					"wei"
				);
				let codeword = await web3.utils.soliditySha3({
					type: "string",
					value: codewordInp.value.trim(),
				});

				await contractInstanse.methods
					.createTransaction(
						to,
						money,
						codeword,
						currentCategory,
						safeTransfer
					)
					.send({ value: money, from: account, gas: "6721975" });
				alert("Transaction succesfully created");

				recieverInp.value = "";
				amountMoneyInp.value = "";
				codewordInp = "";
				categoriesSelect.value = "";
				patternsSelect.value = "";

				getBalance(account);
				renderHistory();
			} catch (error) {
				errorCatch(error);
				getBalance(account);
			}
		}
	};
}
