const contractAddress = "0xF5F28b843B91666231E968aE13D17b7FF3f389e1";

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_transaction",
				"type": "uint256"
			}
		],
		"name": "cancelTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount_money",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "codeword",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "pattern",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "safe_transfer",
				"type": "bool"
			}
		],
		"name": "createTransaction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "proposedRole",
				"type": "uint256"
			}
		],
		"name": "nominate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_transaction",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "codeword",
				"type": "bytes32"
			}
		],
		"name": "receiveTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "password",
				"type": "bytes32"
			}
		],
		"name": "registration",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "adminVote",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "password",
				"type": "bytes32"
			}
		],
		"name": "auth",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "checkAttempts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "convert",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "showCategory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"internalType": "struct Storage.Category",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pattern_id",
				"type": "uint256"
			}
		],
		"name": "showPattern",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "category",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "money",
						"type": "uint256"
					}
				],
				"internalType": "struct Storage.TransferPattern",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "showVoting",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "password",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "role",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3, contractInstanse, account;

function network() {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	contractInstanse = new web3.eth.Contract(abi, contractAddress);
	console.log("Connected successfully!");
}
network();

async function getAccount() {
	let accounts = await web3.eth.getAccounts();
	return accounts;
}
getAccount().then((accounts) => {
	const accountsList = document.querySelector("#address");
	for (acc of accounts) {
		let opt = document.createElement("option");
		opt.value = acc;
		opt.innerHTML = acc;
		accountsList.append(opt);
	}
	let input = document.querySelector(".address");
	input.addEventListener("input", () => {
		let accountContainer = document.querySelector(".account");
		accountContainer.innerHTML = input.value;
		account = input.value;
		getBalance(account);
	});
});

async function getBalance(account) {
	let balanceContainer = document.querySelector(".balance");
	try {
		let balance = await web3.eth.getBalance(account);
		balanceContainer.innerHTML = `Ваш баланс: ${web3.utils.fromWei(
			balance,
			"ether"
		)} eth`;
	} catch (err) {
		balanceContainer.innerHTML = "Ошибка: " + err.message;
	}
}

// async function callTest() {
// 	let mts = await contractInstanse.methods
// 		.showCategory(0)
// 		.call({ from: account }, (result) => {
//             console.log(result);
// 		});
// 	console.log(mts);
// }

// let test = document.querySelector(".test");
// test.addEventListener("click", () => {
// 	callTest();
// });


// REGISTRATION
let btnReg = document.querySelector(".regBtn");
btnReg.addEventListener("click", async (e)=>{
	e.preventDefault();

	let addressAuthInp = document.querySelector(".authAddress");
	let addressValue = addressAuthInp.value;
	let passwordAuthInp = document.querySelector(".authPassword");
	let passwordValue = passwordAuthInp.value;
	console.log(passwordValue)
	let test = web3.eth.abi.encodeParameter('bytes32', passwordValue);
	console.log(test)
	
	// await contractInstanse.methods.registration(addressValue, passwordValue).send({from: addressValue}, function(error, result){
    // 	console.log("registration error: ", error);
	// 	console.log("result: ", result);
	// });
});

//LOGIN
let btnLogin = document.querySelector(".loginBtn");
btnLogin.addEventListener("click", (e)=>{
	e.preventDefault();
	let addressAuthInp = document.querySelector(".authAddress");
	let addressValue = addressAuthInp.value;
	let passwordAuthInp = document.querySelector(".authPassword");
	let passwordValue = passwordAuthInp.value;

})