function numFormat(n, currency, dec = 0) {
	return currency + n.toFixed(dec).replace(/./g, function (c, i, a) {
		return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
	});
}

function pctFormat(n) {
	return n < 0 ? '(' + Math.abs(n).toFixed(2) + '%)' : n.toFixed(2) + '%'
}

function sortTickers(tickers, values) {
	tickerValues = tickers.map(function (d, i) {
		return {
			label: d,
			data: values[i] || 0
		};
	});

	result = tickerValues.sort(function (a, b) {
		return -b.data + a.data;
	});

	return result;
}

const COLORS = {
	red: 'rgba(255, 88, 95, 0.2)',
	redhover: 'rgba(255, 88, 95, 0.5)',
	blue: 'rgba(0, 177, 255, 0.2)',
	bluehover: 'rgba(0, 177, 255, 0.5)',
	green: 'rgba(0, 192, 96, 0.2)',
	greenhover: 'rgba(0, 192, 96, 0.5)',
	grey: 'rgba(107, 114, 128, 0.2)',
	greyhover: 'rgba(107, 114, 128, 0.5)',
};