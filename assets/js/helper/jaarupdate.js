var monthlyPerformanceData = {
	labels: MONTHS,
	datasets: [{
		label: 'Kapitalisman',
		data: monthlyPortfolioPerformance,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		hoverBackgroundColor: COLORS.bluehover,
		hoverBorderColor: COLORS.bluehover,
		borderWidth: 3,
	}, {
		label: 'S&P 500 TR Index',
		data: monthlyBenchmarkPerformance,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
		hoverBackgroundColor: COLORS.redhover,
		hoverBorderColor: COLORS.redhover,
		borderWidth: 3,
	}]
};

var monthlyPerformanceOptions = {
	locale: 'nl-NL',
	scales: {
		y: {
			ticks: {
				beginAtZero: false,
				callback: (value, index, ticks) => {
					return value + '%';
				}
			}
		},
		x: {
			type: 'time',
			time: {
				unit: 'month'
			},
			ticks: {
				callback: (value, index, ticks) => {
					return new Date(value).toLocaleString([], {
						month: 'short'
					});
				}
			}
		}
	},
	plugins: {
		datalabels: {
			display: false
		},
		title: {
			display: true,
			text: 'Rendement per maand'
		},
		legend: {
			display: true
		},
		tooltip: {
			mode: 'index',
			position: 'nearest',
			callbacks: {
				label: function (context) {
					return pctFormat(Number(context.parsed.y));
				},
				title: context => {
					const d = new Date(context[0].parsed.x);
					const f = d.toLocaleString([], {
						month: 'long'
					});
					return f;
				}
			}
		}
	}
};

var monthlyPerformanceCtx = document.getElementById('monthlyPerformance');

var monthlyPerformanceConfig = {
	type: 'bar',
	data: monthlyPerformanceData,
	options: monthlyPerformanceOptions
};

var monthlyPerformanceChart = new Chart(
	monthlyPerformanceCtx,
	monthlyPerformanceConfig
);

var dailyPerformanceData = {
	labels: DATES,
	datasets: [{
		label: 'Kapitalisman',
		data: dailyPortfolioPerformance,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		hoverBackgroundColor: COLORS.bluehover,
		hoverBorderColor: COLORS.bluehover,
	}, {
		label: 'S&P 500 TR Index',
		data: dailyBenchmarkPerformance,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
		hoverBackgroundColor: COLORS.redhover,
		hoverBorderColor: COLORS.redhover,
	}]
};

var dailyPerformanceOptions = {
	elements: {
		point: {
			radius: 0,
			hitRadius: 4
		}
	},
	scales: {
		y: {
			ticks: {
				beginAtZero: false,
				callback: (value, index, ticks) => {
					return value + '%';
				}
			}
		},
		x: {
			type: 'timeseries',
			time: {
				unit: 'month'
			},
			ticks: {
				callback: (value, index, ticks) => {
					return new Date(value).toLocaleString([], {
						day: 'numeric',
						month: 'short'
					});
				}
			}
		}
	},
	plugins: {
		datalabels: {
			display: false
		},
		title: {
			display: true,
			text: 'Cumulatief rendement per dag'
		},
		legend: {
			display: true
		},
		tooltip: {
			mode: 'index',
			position: 'nearest',
			callbacks: {
				label: function (context) {
					return pctFormat(Number(context.parsed.y));
				},
				title: context => {
					const d = new Date(context[0].parsed.x);
					const f = d.toLocaleString([], {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					});
					return f;
				}
			}
		}
	}
};

var dailyPerformanceCtx = document.getElementById('dailyPerformance');

var dailyPerformanceConfig = {
	type: 'line',
	data: dailyPerformanceData,
	options: dailyPerformanceOptions
};

var dailyPerformanceChart = new Chart(
	dailyPerformanceCtx,
	dailyPerformanceConfig
);

var dividendIncomeData = {
	labels: MONTHS,
	datasets: [{
		label: 'Verwacht dividend',
		type: 'line',
		data: projectedMonthlyDividendIncome,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
		hoverBackgroundColor: COLORS.redhover,
		hoverBorderColor: COLORS.redhover,
	}, {
		label: 'Ontvangen dividend',
		type: 'bar',
		data: actualMonthlyDividendIncome,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		hoverBackgroundColor: COLORS.bluehover,
		hoverBorderColor: COLORS.bluehover,
		borderWidth: 3,
	}]
};

var dividendIncomeOptions = {
	locale: 'nl-NL',
	scales: {
		x: {
			grid: {
				display: false
			},
			type: 'time',
			time: {
				unit: 'month'
			},
			ticks: {
				callback: (value, index, ticks) => {
					return new Date(value).toLocaleString([], {
						month: 'short'
					});
				}
			}
		},
		y: {
			ticks: {
				beginAtZero: true,
				callback: function (value, index, ticks) {
					return numFormat(value, '$');
				}
			}
		},
	},
	plugins: {
		datalabels: {
			display: false
		},
		title: {
			display: true,
			text: 'Dividend'
		},
		legend: {
			display: true
		},
		tooltip: {
			mode: 'index',
			position: 'nearest',
			callbacks: {
				label: function (context) {
					return numFormat(Number(context.parsed.y), '$');
				},
				title: context => {
					const d = new Date(context[0].parsed.x);
					const f = d.toLocaleString([], {
						month: 'long'
					});
					return f;
				}
			}
		}
	}
};

var dividendIncomeCtx = document.getElementById('dividendIncome');

var dividendIncomeConfig = {
	data: dividendIncomeData,
	options: dividendIncomeOptions
};

var dividendIncomeChart = new Chart(
	dividendIncomeCtx,
	dividendIncomeConfig
);

var marketValueData = {
	labels: MONTHS,
	datasets: [{
		label: 'Ontvangen dividend',
		data: dividendsReceived,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		hoverBackgroundColor: COLORS.bluehover,
		hoverBorderColor: COLORS.bluehover,
		borderWidth: 3,
	}, {
		label: 'Eigen middelen',
		data: currentCapital,
		backgroundColor: COLORS.grey,
		borderColor: COLORS.grey,
		hoverBackgroundColor: COLORS.greyhover,
		hoverBorderColor: COLORS.greyhover,
		borderWidth: 3,
	}, {
		label: 'Koersverlies',
		data: capitalLoss,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
		hoverBackgroundColor: COLORS.redhover,
		hoverBorderColor: COLORS.redhover,
		borderWidth: 3,
	}, {
		label: 'Koerswinst',
		data: capitalGain,
		backgroundColor: COLORS.green,
		borderColor: COLORS.green,
		hoverBackgroundColor: COLORS.greenhover,
		hoverBorderColor: COLORS.greenhover,
		borderWidth: 3,
	}]
};

var marketValueOptions = {
	locale: 'nl-NL',
	scales: {
		x: {
			grid: {
				display: false
			},
			type: 'time',
			time: {
				unit: 'month'
			},
			ticks: {
				callback: (value, index, ticks) => {
					return new Date(value).toLocaleString([], {
						month: 'short'
					});
				}
			},
			stacked: true
		},
		y: {
			ticks: {
				beginAtZero: true,
				callback: function (value, index, ticks) {
					return numFormat(value, '$');
				}
			},
			stacked: true
		},
	},
	plugins: {
		datalabels: {
			display: false
		},
		title: {
			display: true,
			text: 'Marktwaarde'
		},
		legend: {
			display: true,
			reverse: true
		},
		tooltip: {
			mode: 'index',
			position: 'nearest',
			itemSort: function (a, b) {
				return b.datasetIndex - a.datasetIndex
			},
			callbacks: {
				label: function (context) {
					return numFormat(Number(context.parsed.y), '$');
				},
				title: context => {
					const d = new Date(context[0].parsed.x);
					const f = d.toLocaleString([], {
						month: 'long'
					});
					return f;
				}
			}
		},
	}
};

var marketValueCtx = document.getElementById('marketValue');

var marketValueConfig = {
	type: 'bar',
	data: marketValueData,
	options: marketValueOptions
};

var marketValueChart = new Chart(
	marketValueCtx,
	marketValueConfig
);