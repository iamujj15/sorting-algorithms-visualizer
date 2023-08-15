"use scrict";

const swapQuick = async function (i, j) {
	const bar1 = barsEl.children[i];
	const bar2 = barsEl.children[j];

	const bar1Height = Number(bar1.style.height.slice(0, -1));
	const bar2Height = Number(bar2.style.height.slice(0, -1));
	const temp = bar1Height;
	const t2 = bar1.children[0].innerText;
	bar1.style.height = `${bar2Height}%`;
	bar1.children[0].innerText = bar2.children[0].innerText;
	bar2.style.height = `${temp}%`;
	bar2.children[0].innerText = t2;

	const temp2 = bars[i];
	bars[i] = bars[j];
	bars[j] = temp2;
};

const partition = async function (l, r) {
	const sz2 = Number(barsEl.childElementCount);
	for (let j = 0; j < sz2; ++j)
		if (j < l || j > r) barsEl.children[j].style.opacity = "0.5";

	let barDefaultColor = barsEl.children[0].style.backgroundColor;
	let barDefaultBorderColor = barsEl.children[0].style.borderColor;

	const pvt = bars[r];
	let i = l - 1;
	barsEl.children[i + 1].children[0].style.backgroundColor = "#FF2171";
	barsEl.children[i + 1].style.borderColor = "blue";

	for (let j = l; j < r; ++j) {
		if (bars[j] < pvt) {
			++i;

			barsEl.children[i].style.backgroundColor = "red";
			barsEl.children[j].style.backgroundColor = "red";

			swapQuick(i, j);

			await waitforme(Number(speedSlider.value));

			barsEl.children[i].children[0].style.backgroundColor =
				barDefaultColor;
			barsEl.children[i].style.borderColor = barDefaultBorderColor;
			barsEl.children[i].style.backgroundColor = barDefaultColor;
			barsEl.children[j].style.backgroundColor = barDefaultColor;

			barsEl.children[i + 1].children[0].style.backgroundColor =
				"#FF2171";
			barsEl.children[i + 1].style.borderColor = "blue";
		}
	}
	barsEl.children[i + 1].style.backgroundColor = "red";
	barsEl.children[r].style.backgroundColor = "red";

	swapQuick(i + 1, r);

	await waitforme(Number(speedSlider.value));

	barsEl.children[i + 1].children[0].style.backgroundColor = barDefaultColor;
	barsEl.children[i + 1].style.borderColor = barDefaultBorderColor;
	barsEl.children[i + 1].style.backgroundColor = barDefaultColor;
	barsEl.children[r].style.backgroundColor = barDefaultColor;

	barsEl.children[i + 1].children[0].style.backgroundColor = barDefaultColor;
	barsEl.children[i + 1].style.borderColor = barDefaultBorderColor;

	for (let j = 0; j < sz2; ++j)
		if (j < l || j > r) barsEl.children[j].style.opacity = "1.0";

	return i + 1;
};

const quickS = async function (l, r) {
	if (l >= r) return;

	let pi = await partition(l, r);

	await quickS(l, pi - 1);
	await quickS(pi + 1, r);
};

const quickSort = async function () {
	document.getElementById("quick").classList.toggle("active-btn");
	tempDisable();
	const barsEl = document.getElementById("bars");
	const sz = Number(barsEl.childElementCount);

	await quickS(0, Number(sz - 1)).then(() => doGreen(sz));
	document.getElementById("random-array").classList.remove("disabled");
	document.getElementById("reversed-array").classList.remove("disabled");
	document.getElementById("sorted-array").classList.remove("disabled");
	document.getElementById("size").classList.remove("disabled");
	document.getElementById("quick").classList.toggle("active-btn");
};

const btnQuickSort = document.getElementById("quick");
btnQuickSort.addEventListener("click", quickSort);
