"use scrict";

const merge = async function (l, m, r) {
	const sz2 = Number(barsEl.childElementCount);
	for (let i = 0; i < sz2; ++i)
		if (i < l || i > r) barsEl.children[i].style.opacity = "0.5";

	const n1 = Number(m - l + 1);
	const n2 = Number(r - m);

	const L = [];
	const R = [];

	for (let i = 0; i < n1; i++) L.push(bars[l + i]);
	for (let j = 0; j < n2; j++) R.push(bars[m + 1 + j]);

	let i = 0,
		j = 0,
		k = l;

	while (i < n1 && j < n2) {
		if (L[i] <= R[j]) {
			bars[k] = L[i];
			barsEl.children[k].style.height = `${L[i] * 0.94}%`;
			// barsEl.children[k].children[0].innerText = L[i];
			i++;
		} else {
			bars[k] = R[j];
			barsEl.children[k].style.height = `${R[j] * 0.94}%`;
			// barsEl.children[k].children[0].innerText = R[j];
			j++;
		}
		k++;
		await waitforme(Number(speedSlider.value));
	}

	while (i < n1) {
		bars[k] = L[i];
		barsEl.children[k].style.height = `${L[i] * 0.94}%`;
		// barsEl.children[k].children[0].innerText = L[i];
		i++;
		k++;
		await waitforme(Number(speedSlider.value));
	}

	while (j < n2) {
		bars[k] = R[j];
		barsEl.children[k].style.height = `${R[j] * 0.94}%`;
		// barsEl.children[k].children[0].innerText = R[j];
		j++;
		k++;
		await waitforme(Number(speedSlider.value));
	}

	for (let i = 0; i < sz2; ++i)
		if (i < l || i > r) barsEl.children[i].style.opacity = "1.0";
};

const mergeS = async function (l, r) {
	if (l >= r) {
		return;
	}
	const m = l + Math.trunc((r - l) / 2);

	await mergeS(l, m);
	await mergeS(m + 1, r);

	await merge(l, m, r);
};

const doGreen = async function (sz) {
	for (let i = 0; i < sz; ++i) {
		barsEl.children[i].style.backgroundColor = "green";
		await waitforme(Number(speedSlider.value));
	}
};

const mergeSort = async function () {
	document.getElementById("merge").classList.toggle("active-btn");
	tempDisable();
	const barsEl = document.getElementById("bars");
	const sz = Number(barsEl.childElementCount);

	await mergeS(0, Number(sz - 1)).then(() => doGreen(sz));
	document.getElementById("random-array").classList.remove("disabled");
	document.getElementById("reversed-array").classList.remove("disabled");
	document.getElementById("sorted-array").classList.remove("disabled");
	document.getElementById("size").classList.remove("disabled");
	document.getElementById("merge").classList.toggle("active-btn");
};

const btnMergeSort = document.getElementById("merge");
btnMergeSort.addEventListener("click", mergeSort);
