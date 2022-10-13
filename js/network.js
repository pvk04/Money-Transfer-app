import abi from "./abi.js";

export let web3, contractInstanse;
const contractAddress = "0x03EA929eAB1b615762CAE1154805397F68BD2F9d";

export function network() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	contractInstanse = new web3.eth.Contract(abi, contractAddress);
	console.log("Connected successfully!");
}
