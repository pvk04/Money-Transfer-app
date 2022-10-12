import { web3, contractInstanse, network } from "./network.js";
import { getBalance } from "./getBalance.js";
import { createTransfer } from "./createTransfer.js";
import { renderHistory } from "./renderHistory.js";
import { renderCategoriesPage } from "./renderCategoriesPage.js";
import { renderVotingsPage } from "./renderVotingsPage.js";

export let account, accountRole;

async function main() {
	network();
	let modalAuth = document.querySelector("#modal-auth");
	if (JSON.parse(localStorage.getItem("accountinfo")) != undefined) {
		let accInfo = JSON.parse(localStorage.getItem("accountinfo"));
		account = accInfo.account;
		accountRole = accInfo.accountRole;
	} else {
		modalAuth.style.display = "flex";
		// REGISTRATION
		let btnReg = document.querySelector(".regBtn");
		btnReg.addEventListener("click", async (e) => {
			e.preventDefault();

			let addressAuthInp = document.querySelector(".authAddress");
			let addressValue = addressAuthInp.value;
			let passwordAuthInp = document.querySelector(".authPassword");
			let passwordValue = web3.utils.soliditySha3({
				type: "string",
				value: passwordAuthInp.value,
			});

			await contractInstanse.methods
				.registration(addressValue, passwordValue)
				.send({ from: addressValue }, function (error, result) {
					console.log("registration error: ", error);
					console.log("result: ", result);
					if (error === null) {
						alert("You have successfully registered!");
					}
				});
		});

		//LOGIN
		let btnLogin = document.querySelector(".login");
		btnLogin.addEventListener("click", async (event) => {
			event.preventDefault();
			let addressAuthInp = document.querySelector(".authAddress");
			let addressValue = addressAuthInp.value;
			let passwordAuthInp = document.querySelector(".authPassword");
			let passwordValue = web3.utils.soliditySha3({
				type: "string",
				value: passwordAuthInp.value,
			});

			try {
				let resp = await contractInstanse.methods
					.auth(addressValue, passwordValue)
					.call({ from: addressValue }, function (error, result) {
						console.log("registration error: ", error);
						console.log("result: ", result);
					});
				if (resp == true) {
					let modalAuth = document.querySelector("#modal-auth");
					account = addressValue;
					accountRole = await contractInstanse.methods
						.showRole(account)
						.call({ from: account });
					console.log(accountRole);
					modalAuth.style.display = "none";
					localStorage.setItem(
						"accountinfo",
						JSON.stringify({ account, accountRole })
					);
					passwordAuthInp.value = "";
					main();
				}
			} catch (error) {
				alert(error.name);
			}
		});
	}

	let accountAddressLab = document.querySelector(".account-address");
	accountAddressLab.innerHTML = `Address: ${account}`;

	let accountRoleLab = document.querySelector(".account-role");
	accountRoleLab.innerHTML = `Role: ${accountRole == 1 ? "admin" : "user"}`;

	let createTransferBtn = document.querySelector(".create-transfer");
	createTransferBtn.addEventListener("click", createTransfer);

	let exitBtn = document.querySelector(".exit");
	exitBtn.addEventListener("click", () => {
		localStorage.removeItem("accountinfo");
		modalAuth.style.display = "flex";
	});

	let menu = document.querySelector(".nav-list");
	menu.innerHTML = "";

	let transactionHistory = document.createElement("li");
	transactionHistory.classList.add("transaction-hist", "nav-elem");
	transactionHistory.innerHTML = "Transaction history";
	menu.append(transactionHistory);
	transactionHistory.onclick = async () => {
		renderHistory();
	};
	renderHistory();

	if (accountRole == 1) {
		let categories = document.createElement("li");
		categories.classList.add("nav-elem");
		categories.innerHTML = "Categories";
		menu.append(categories);
		categories.onclick = async () => {
			await renderCategoriesPage();
		};

		let votings = document.createElement("li");
		votings.classList.add("nav-elem");
		votings.innerHTML = "Votings";
		menu.append(votings);
		votings.onclick = async () => {
			await renderVotingsPage();
		};
	}

	getBalance(account);
}
main();
