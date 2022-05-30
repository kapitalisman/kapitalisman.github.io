const YEARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const DIVIDENDS_PRINCIPAL = [350, 375, 401, 429, 459, 491, 525, 562, 601, 643, 689] 
const DIVIDENDS_REINVEST = [0, 12, 27, 43, 63, 86, 112, 142, 177, 216, 261]

var dividendProjectionData = {
  labels: YEARS,
  datasets: [{
      label: 'Dividend hoofdsom',
      data: DIVIDENDS_PRINCIPAL,
      backgroundColor: COLORS.blue,
      borderColor: COLORS.blue,
      hoverBackgroundColor: COLORS.bluehover,
      hoverBorderColor: COLORS.bluehover,
      borderWidth: 3,
  }, {
    label: 'Dividend herbelegging',
      data: DIVIDENDS_REINVEST,
      backgroundColor: COLORS.red,
      borderColor: COLORS.red,
      hoverBackgroundColor: COLORS.redhover,
      hoverBorderColor: COLORS.redhover,
      borderWidth: 3,
  }]
}

var dividendProjectionOptions = {
  locale: 'nl-NL',
  scales: {
      x: {
        grid: {
          display: false
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
      }
  },
  plugins: {
		datalabels: {
      anchor: (context) => {
        if (context.datasetIndex == 0) return 'center'
        return 'end'
      },
      align: (context) => {
        if (context.datasetIndex == 0) return 'center'
        return 'top'
      },
      formatter: (value, context) => {
        const datasetArray = []
        context.chart.data.datasets.forEach(dataset => {
          datasetArray.push(dataset.data[context.dataIndex])
        })
        let sum = datasetArray.reduce((acc, val) => {
          return acc + val
        }, 0)
        if (context.datasetIndex == 0) return value
        return sum
      }
    },
		title: {
			display: true,
			text: 'Beleggen in dividendgroei'
		},
		legend: {
			display: true
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
					return `Na ${context[0].parsed.x} jaar`
				}
			}
		}
	}
}

var dividendProjectionCtx = document.getElementById('dividendProjection');

var dividendProjectionConfig = {
	type: 'bar',
	data: dividendProjectionData,
  plugins: [ChartDataLabels],
	options: dividendProjectionOptions
};

const dividendProjectionChart = new Chart(
	dividendProjectionCtx,
	dividendProjectionConfig
);