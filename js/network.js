import abi from "./abi.js";

export let web3, contractInstanse;
const contractAddress = "0x80c9C90dd54e2ee589979420e57d607E44fFB334";

export function network() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	contractInstanse = new web3.eth.Contract(abi, contractAddress);
	console.log("Connected successfully!");
}
