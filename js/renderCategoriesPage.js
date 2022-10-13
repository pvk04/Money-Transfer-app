import { contractInstanse } from "./network.js";
import { account } from "./main.js";
import { errorCatch } from "./errorCatch.js";
import { validation } from "./validation.js";

export async function renderCategoriesPage() {
	let main = document.querySelector(".main-content");
	main.innerHTML = "";

	let addCategory = document.createElement("button");
	addCategory.innerHTML = "New category";
	addCategory.classList.add("create-category");
	main.append(addCategory);
	addCategory.onclick = () => {
		let modal = document.querySelector("#modal-category");
		modal.style.display = "flex";

		modal.onclick = (event) => {
			let isModal = event.target.closest(".modal-auth");
			let isCloseBtn = event.target.closest(".close-modal");
			if (!isModal || isCloseBtn) {
				modal.style.display = "none";
			}
		};

		let addBtn = modal.querySelector(".add-category");
		addBtn.onclick = async (event) => {
			event.preventDefault();
			let nameInp = modal.querySelector(".name-category");
			let nameInpValid = validation(nameInp);

			if (nameInpValid) {
				try {
					let name = nameInp.value;
					let resp = await contractInstanse.methods
						.addCategory(name)
						.send({ from: account, gas: "6721975" });
					alert("Category successfully created");
					nameInp.value = "";
					renderCategoriesPage();
				} catch (error) {
					errorCatch(error);
				}
			}
		};
	};

	let div = document.createElement("div");
	div.classList.add("content");
	main.append(div);

	let ul = document.createElement("ul");
	ul.classList.add("content-list");
	div.append(ul);

	let categories = await contractInstanse.methods
		.showCategories()
		.call({ from: account });
	let patterns = await contractInstanse.methods
		.showPatterns()
		.call({ from: account });

	for (let category of categories) {
		let li = document.createElement("li");
		li.classList.add("content-elem");
		ul.append(li);

		let liHeader = document.createElement("header");
		liHeader.classList.add("li-header");
		liHeader.innerHTML = `<p>${category[1]}</p>`;

		li.append(liHeader);

		let addPattern = document.createElement("button");
		addPattern.innerHTML = "Add";
		addPattern.classList.add("add-pattern");
		liHeader.append(addPattern);
		addPattern.onclick = () => {
			let modal = document.querySelector("#modal-pattern");
			modal.style.display = "flex";
			let categoryName = document.querySelector(".category-name");
			categoryName.innerHTML = category[1];

			modal.onclick = (event) => {
				let isModal = event.target.closest(".modal-auth");
				let isCloseBtn = event.target.closest(".close-modal");
				if (!isModal || isCloseBtn) {
					modal.style.display = "none";
				}
			};

			let addBtn = modal.querySelector(".add-pattern");
			addBtn.onclick = async (event) => {
				event.preventDefault();
				let nameInp = modal.querySelector(".name-pattern");
				let nameInpValid = validation(nameInp);
				let valueInp = modal.querySelector(".value-pattern");
				let valueInpValid = validation(valueInp);

				if (nameInpValid && valueInpValid) {
					try {
						let name = nameInp.value.trim();
						let value = valueInp.value.trim();
						await contractInstanse.methods
							.addPattern(category[0], name, value)
							.send({ from: account, gas: "6721975" });
						alert("Pattern successfully created");
						nameInp.value = "";
						valueInp.value = "";
						renderCategoriesPage();
					} catch (error) {
						errorCatch(error);
					}
				}
			};
		};

		let imgArrow = document.createElement("img");
		imgArrow.classList.add("open-patterns");
		imgArrow.src = "./assets/arrow.svg";
		liHeader.prepend(imgArrow);

		let categoryPatternsUl = document.createElement("ul");
		categoryPatternsUl.classList.add("patterns-list");
		categoryPatternsUl.classList.add("hide");
		li.append(categoryPatternsUl);

		liHeader.onclick = (event) => {
			let isBtn = event.target.closest(".add-pattern");
			if (!isBtn) {
				imgArrow.classList.toggle("rotate");
				categoryPatternsUl.classList.toggle("hide");
			}
		};

		for (let pattern of patterns) {
			if (pattern[0] == category[0]) {
				let liPattern = document.createElement("li");
				liPattern.classList.add("pattern-elem");
				liPattern.innerHTML = pattern[1] + ": " + pattern[2] + " coins";
				categoryPatternsUl.append(liPattern);
			}
		}
	}
}
