"use strict";

const selectionSort = async function () {
	document.getElementById("selection").classList.toggle("active-btn");
	tempDisable();
	const barsEl = document.getElementById("bars");
	const sz = Number(barsEl.childElementCount);

	for (let i = 0; i < sz; ++i) {
		let barDefaultColor;
		let barDefaultBorderColor = barsEl.children[0].style.borderColor;
		let mxInd = 0;

		barsEl.children[0].children[0].style.backgroundColor = "#FF2171";
		barsEl.children[0].style.borderColor = "#FF2171";

		for (let j = 1; j < sz - i; ++j) {
			const barCrr = barsEl.children[j];
			const barMx = barsEl.children[mxInd];
			barDefaultColor = barCrr.style.backgroundColor;

			const barCrrHeight = Number(barCrr.style.height.slice(0, -1));
			const barMxHeight = Number(barMx.style.height.slice(0, -1));

			await waitforme(Number(speedSlider.value));

			let chng = false;
			let tmpSave;
			if (barCrrHeight > barMxHeight) {
				chng = true;
				tmpSave = mxInd;
				mxInd = j;
			}
			barCrr.style.backgroundColor = "red";
			barMx.style.backgroundColor = "red";

			await waitforme(Number(speedSlider.value));

			if (chng) {
				barsEl.children[tmpSave].children[0].style.removeProperty(
					"background-color"
				);
				barsEl.children[tmpSave].style.borderColor =
					barDefaultBorderColor;

				barsEl.children[mxInd].children[0].style.backgroundColor =
					"#FF2171";
				barsEl.children[mxInd].style.borderColor = "#FF2171";
			}

			barCrr.style.backgroundColor = barDefaultColor;
			barMx.style.backgroundColor = barDefaultColor;
		}

		const temp = barsEl.children[sz - i - 1].style.height;
		const t2 = barsEl.children[sz - i - 1].children[0].innerText;
		barsEl.children[sz - i - 1].style.height =
			barsEl.children[mxInd].style.height;
		barsEl.children[sz - i - 1].children[0].innerText =
			barsEl.children[mxInd].children[0].innerText;
		barsEl.children[mxInd].style.height = temp;
		barsEl.children[mxInd].children[0].innerText = t2;
		barsEl.children[sz - i - 1].style.backgroundColor = "green";
		barsEl.children[mxInd].children[0].style.removeProperty(
			"background-color"
		);
		barsEl.children[mxInd].style.borderColor = barDefaultBorderColor;
	}
	document.getElementById("random-array").classList.remove("disabled");
	document.getElementById("reversed-array").classList.remove("disabled");
	document.getElementById("sorted-array").classList.remove("disabled");
	document.getElementById("size").classList.remove("disabled");
	document.getElementById("selection").classList.toggle("active-btn");
};

const btnSelectionSort = document.getElementById("selection");
btnSelectionSort.addEventListener("click", selectionSort);
