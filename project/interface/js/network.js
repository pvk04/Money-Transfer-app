import abi from "./abi.js";

export let web3, contractInstanse;
const contractAddress = "0x43f05e973694a740f78B5690eF5D641fD411CdFd";

export function network() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	contractInstanse = new web3.eth.Contract(abi, contractAddress);

	unlockAccs();
}
network();

async function unlockAccs() {
	let accounts = await web3.eth.getAccounts();

	for (let acc of accounts) {
		console.log(acc);

		await web3.eth.personal.unlockAccount(acc, "", 0);
	}
}
