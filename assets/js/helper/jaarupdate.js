var data = {
	labels: MONTHS,
	datasets: [{
		label: 'Portfolio',
		data: monthlyPortfolioPerformance,
		backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		hoverBackgroundColor: COLORS.bluehover,
		hoverBorderColor: COLORS.bluehover,
		borderWidth: 3,
	}, {
		label: 'Benchmark',
		data: monthlyBenchmarkPerformance,
		backgroundColor: COLORS.red,
		borderColor: COLORS.red,
		hoverBackgroundColor: COLORS.redhover,
		hoverBorderColor: COLORS.redhover,
		borderWidth: 3,
	}]
};

var options = {
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
		legend: {
			display: true
		},
		tooltip: {
			callbacks: {
				label: function(context) {
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

var ctx = document.getElementById('performance');

var config = {
  type: 'bar',
  data: data,
  options: options
};

var barChart = new Chart(
  ctx,
  config
);

var lineChartCtx = document.getElementById('cumulative');

var lineChartData = {
  labels: DATES,
  datasets: [{
    label: 'Portfolio',
    data: dailyPortfolioPerformance,
	backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
	hoverBackgroundColor: COLORS.bluehover,
	hoverBorderColor: COLORS.bluehover,
  }, {
    label: 'Benchmark',
    data: dailyBenchmarkPerformance,
	backgroundColor: COLORS.red,
    borderColor: COLORS.red,
	hoverBackgroundColor: COLORS.redhover,
	hoverBorderColor: COLORS.redhover,
  }]
};

var lineChartOptions = {
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
		legend: {
			display: true
		},
		tooltip: {
			callbacks: {
				label: function(context) {
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

var lineChartConfig = {
  type: 'line',
  data: lineChartData,
  options: lineChartOptions
};

var lineChart = new Chart(
  lineChartCtx,
  lineChartConfig
);