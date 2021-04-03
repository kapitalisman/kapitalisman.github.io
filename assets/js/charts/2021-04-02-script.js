// data
var values = [1085.85, 2251.92, 2239.29, 1195.30, 2410.17, 2442.00, 1235.10, 1051.16, 1073.29, 1112.40, 1216.08, 2217.00, 2086.63, 607.92, 593.20, 1131.60, 2227.59, 2538.14, 3208.62, 1029.60, 2086.24, 2078.10, 2028.32, 2042.12, 2008.41];
var ticker = ['ABBV', 'AFL', 'AMGN', 'AMT', 'CVX', 'HD', 'HII', 'HRL', 'IRM', 'KMB', 'LHX', 'LMT', 'MRK', 'OKE', 'OMC', 'PEP', 'SLGN', 'SNA', 'T', 'TROW', 'VST', 'ALL', 'EOG', 'ORCL', 'UGI'];

// define upper and lower bound
var portfolio = 43196.05;
var upper = 0.05 * portfolio;
var lower = 0.02 * portfolio;

// define function to format financial numbers
function numFormat(n, currency) {
    return currency + n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

// sort tickers by value
tickerValues = ticker.map(function(d, i) {
    return {
        label: d,
        data: values[i] || 0
    };
});

sortedTickerValues = tickerValues.sort(function(a, b) {
    return -b.data + a.data;
});

sortedTicker = [];
sortedValues = [];
sortedTickerValues.forEach(function(d) {
    sortedTicker.push(d.label);
    sortedValues.push(d.data);
});

// define chart colors
var colors = {
    red: 'rgba(255, 88, 95, 0.2)',
    blue: 'rgba(0, 177, 255, 0.2)',
    green: 'rgba(0, 192, 96, 0.2)'
};

// define chart options
var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                    return numFormat(value, '$');
                }
            }
        }]
    },
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                return numFormat(Number(tooltipItem.yLabel), '$');
            }
        }
    },
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'bottom',
            formatter: function(value, context) {
                let sum = context.dataset.data.reduce(function(acc, val) {
                    return acc + val;
                }, 0);
                return (value * 100 / sum).toFixed(0) + '%';
            }
        }
    }
};

// get context
var ctx = document.getElementById('weights');

// initialize chart
var weights = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: sortedTicker,
        datasets: [{
            //label: 'Waarde',
            data: sortedValues,
            backgroundColor: Array(values.length).fill(colors.blue),
            borderColor: Array(values.length).fill(colors.blue),
            borderWidth: 1
        }]
    },
    options: options
});

// update colors
var dataset = weights.data.datasets[0];
for (var i = 0; i < dataset.data.length; i++) {
    if (dataset.data[i] > upper) {
        dataset.backgroundColor[i] = colors.red;
        dataset.borderColor[i] = colors.red;
    } else if (dataset.data[i] < lower) {
        dataset.backgroundColor[i] = colors.green;
        dataset.borderColor[i] = colors.green;
    }
}	
weights.update();