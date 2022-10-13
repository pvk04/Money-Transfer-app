import abi from "./abi.js";

export let web3, contractInstanse;
const contractAddress = "0xA6dc4004C5e70080B4cb6b03Bb816Eb73daab882";

export function network() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	contractInstanse = new web3.eth.Contract(abi, contractAddress);
}
