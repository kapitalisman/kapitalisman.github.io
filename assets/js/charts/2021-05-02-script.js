// data
var values = [1115.00, 2364.12, 2282.40, 2156.76, 1273.85, 1031.74, 2370.61, 2061.92, 1299.63, 1273.92, 1016.40, 1163.48, 1012.48, 1066.56, 1255.38, 2283.36, 2011.50, 628.08, 658.08, 2197.91, 1153.28, 2079.11, 2235.01, 2613.60, 1025.63, 3329.46, 1075.20, 2030.79, 2141.79, 1990.66];
var ticker = ['ABBV', 'AFL', 'ALL', 'AMGN', 'AMT', 'CAG', 'CVX', 'EOG', 'HD', 'HII', 'HRL', 'IRM', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'OKE', 'OMC', 'ORCL', 'PEP', 'PNW', 'SLGN', 'SNA', 'SSB', 'T', 'TROW', 'TRP', 'UGI', 'VST'];

// define upper and lower bound
var portfolio = 50197.71;
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