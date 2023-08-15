"use strict";

const insertionSort = async function () {
	document.getElementById("insertion").classList.toggle("active-btn");
	tempDisable();
	const barsEl = document.getElementById("bars");
	const sz = Number(barsEl.childElementCount);

	barsEl.children[0].style.backgroundColor = "green";
	let i, j;
	for (let i = 1; i < sz; ++i) {
		let barDefaultColor;
		barsEl.children[i].style.borderColor = "#FF2171";
		let j;
		for (j = i - 1; j >= 0; --j) {
			const barCrr = barsEl.children[j];
			const barNx = barsEl.children[j + 1];
			barDefaultColor = barCrr.style.backgroundColor;

			const barCrrHeight = Number(barCrr.style.height.slice(0, -1));
			const barNxHeight = Number(barNx.style.height.slice(0, -1));

			await waitforme(Number(speedSlider.value));

			if (barCrrHeight <= barNxHeight) break;

			barCrr.style.backgroundColor = "red";
			barNx.style.backgroundColor = "red";
			swap(barCrr, barNx);

			await waitforme(Number(speedSlider.value));

			barCrr.style.backgroundColor = barDefaultColor;
			barNx.style.backgroundColor = barDefaultColor;
		}
		barsEl.children[j + 1].style.backgroundColor = "green";
		barsEl.children[i].style.removeProperty("border-color");
	}
	document.getElementById("random-array").classList.remove("disabled");
	document.getElementById("reversed-array").classList.remove("disabled");
	document.getElementById("sorted-array").classList.remove("disabled");
	document.getElementById("size").classList.remove("disabled");
	document.getElementById("insertion").classList.toggle("active-btn");
};

const btnInsertionSort = document.getElementById("insertion");
btnInsertionSort.addEventListener("click", insertionSort);
