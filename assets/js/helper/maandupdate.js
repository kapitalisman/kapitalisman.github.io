const sortedTickerValues = sortTickers(TICKERS, VALUES);

sortedTickers = [];
sortedValues = [];
sortedTickerValues.forEach(function (d) {
    sortedTickers.push(d.label);
    sortedValues.push(d.data);
});

var data = {
    labels: sortedTickers,
    datasets: [{
        data: sortedValues,
        backgroundColor: Array(VALUES.length).fill(COLORS.blue),
        borderColor: Array(VALUES.length).fill(COLORS.blue),
        hoverBackgroundColor: Array(VALUES.length).fill(COLORS.bluehover),
        hoverBorderColor: Array(VALUES.length).fill(COLORS.bluehover),
        borderWidth: 3,
    }]
};

var options = {
    locale: 'nl-NL',
    scales: {
        x: {
            grid: {
                display: false
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
            anchor: 'end',
            align: 'bottom',
            formatter: function (value, context) {
                let sum = context.dataset.data.reduce((a, b) => a + b, 0);
                return (value * 100 / sum).toFixed(0) + '%';
            }
        },
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return numFormat(Number(context.parsed.y), '$');
                }
            }
        }
    }
};

var ctx = document.getElementById('weights');

var config = {
    type: 'bar',
    data: data,
    options: options
};

var barChart = new Chart(
    ctx,
    config
);

const PORTFOLIO = VALUES.reduce((a, b) => a + b, 0);
const UPPER = 0.05 * PORTFOLIO;
const LOWER = 0.02 * PORTFOLIO;
var dataset = barChart.data.datasets[0];
for (let i = 0; i < dataset.data.length; i++) {
    if (dataset.data[i] > UPPER) {
        dataset.backgroundColor[i] = COLORS.red;
        dataset.borderColor[i] = COLORS.red;
        dataset.hoverBackgroundColor[i] = COLORS.redhover;
        dataset.hoverBorderColor[i] = COLORS.redhover;
    } else if (dataset.data[i] < LOWER) {
        dataset.backgroundColor[i] = COLORS.green;
        dataset.borderColor[i] = COLORS.green;
        dataset.hoverBackgroundColor[i] = COLORS.greenhover;
        dataset.hoverBorderColor[i] = COLORS.greenhover;
    }
}
barChart.update();