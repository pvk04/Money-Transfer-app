import { web3 } from "./network.js";

export async function getBalance(account) {
	if (account != undefined) {
		let balance = await web3.eth.getBalance(account);
		balance = await web3.utils.fromWei(balance, "ether");
		let accountBalanceLab = document.querySelector(".account-balance");
		accountBalanceLab.innerHTML = `Balance: ${balance} eth`;
	}
}
