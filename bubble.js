"use strict";

const speedSlider = document.getElementById("speed");

const bubbleSort = async function () {
	document.getElementById("bubble").classList.toggle("active-btn");
	tempDisable();
	const barsEl = document.getElementById("bars");
	const sz = Number(barsEl.childElementCount);

	for (let i = 0; i < sz; ++i) {
		let barDefaultColour;
		for (let j = 0; j < sz - i - 1; ++j) {
			const bar1 = barsEl.children[j];
			const bar2 = barsEl.children[j + 1];
			barDefaultColour = bar1.style.backgroundColor;

			const bar1Height = Number(bar1.style.height.slice(0, -1));
			const bar2Height = Number(bar2.style.height.slice(0, -1));

			await waitforme(Number(speedSlider.value));

			if (bar1Height > bar2Height) swap(bar1, bar2);

			bar1.style.backgroundColor = "red";
			bar2.style.backgroundColor = "red";

			await waitforme(Number(speedSlider.value));

			bar1.style.backgroundColor = barDefaultColour;
			bar2.style.backgroundColor = barDefaultColour;
		}
		barsEl.children[sz - i - 1].style.backgroundColor = "green";
	}
	document.getElementById("random-array").classList.remove("disabled");
	document.getElementById("reversed-array").classList.remove("disabled");
	document.getElementById("sorted-array").classList.remove("disabled");
	document.getElementById("size").classList.remove("disabled");
	document.getElementById("bubble").classList.toggle("active-btn");
};

const btnBubbleSort = document.getElementById("bubble");
btnBubbleSort.addEventListener("click", bubbleSort);
