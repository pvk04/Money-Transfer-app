import { account } from "./main.js";
import { contractInstanse } from "./network.js";

export async function renderVotingsPage() {
	let main = document.querySelector(".main-content");
	main.innerHTML = "";

	let addVoting = document.createElement("button");
	addVoting.innerHTML = "New voting";
	addVoting.classList.add("create-voting");
	main.append(addVoting);

	let adminCount = document.createElement("p");
	adminCount.innerHTML = "Admin count: 1";
	main.append(adminCount);

	addVoting.onclick = async () => {
		let modal = document.querySelector("#modal-create-voting");
		modal.style.display = "flex";

		modal.onclick = () => {
			let isModal = event.target.closest(".modal-auth");
			let isCloseBtn = event.target.closest(".close-modal");
			if (!isModal || isCloseBtn) {
				modal.style.display = "none";
			}
		};

		let addBtn = modal.querySelector(".nominate");
		addBtn.onclick = async (event) => {
			event.preventDefault();
			let userInp = modal.querySelector(".user");
			let user = userInp.value;
			await contractInstanse.methods
				.nominate(user, 1)
				.send({ from: account, gas: "6721975" });
			alert("Voting created");

			userInp.value = "";
			renderVotingsPage();
			modal.style.display = "none";
		};
	};

	let div = document.createElement("div");
	div.classList.add("content");
	main.append(div);

	let ul = document.createElement("ul");
	ul.classList.add("content-list");
	div.append(ul);

	let votings = await contractInstanse.methods
		.showVotings()
		.call({ from: account }, function (error, res) {
			console.log(error);
			console.log(res);
		});

	let idVoting = 0;
	for (let elem of votings) {
		let li = document.createElement("li");
		li.classList.add("content-elem");
		ul.append(li);

		let liHeader = document.createElement("header");
		liHeader.classList.add("li-header");
		liHeader.innerHTML = `<p>Give ${elem[0]} admin role</p>`;
		li.append(liHeader);

		let divBtns = document.createElement("div");
		divBtns.id = idVoting;
		divBtns.classList.add("vote-btns");
		if (elem[3] == true) {
			liHeader.append(divBtns);
		}

		let voteFalse = document.createElement("img");
		voteFalse.src = "./assets/cross.svg";
		voteFalse.classList.add("cancel-vote");
		divBtns.append(voteFalse);

		voteFalse.onclick = () => {
			vote(divBtns.id, false, elem[2]);
			renderVotingsPage();
		};

		let voteTrue = document.createElement("img");
		voteTrue.src = "./assets/check-mark.svg";
		voteTrue.classList.add("accept-vote");
		divBtns.append(voteTrue);

		voteTrue.onclick = () => {
			vote(divBtns.id, true, elem[2]);
			renderVotingsPage();
		};

		idVoting++;

		let votingInfo = document.createElement("ul");
		li.append(votingInfo);

		let status = document.createElement("p");
		status.innerHTML = `Status:  ${
			elem[3] == true ? "Voting in progress" : "Voting is over"
		}`;
		votingInfo.append(status);
	}
}

async function vote(id, value, votes) {
	let error = false;
	for (let vote of votes) {
		if (vote[0] == account) {
			alert("You already voted!");
			return (error = true);
		}
	}

	if (error == false) {
		console.log(id);
		let resp = await contractInstanse.methods
			.vote(id, value)
			.send({ from: account, gas: "6721975" });
		console.log(resp);
	}
}
