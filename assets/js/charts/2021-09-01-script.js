// data
var values = [2391.60, 547.12, 2511.96, 2475.18, 2005.02, 1427.50, 980.16, 3019.01, 565.45, 925.40, 1053.40, 2268.72, 1949.64, 1241.94, 491.64, 619.68, 1344.73, 3058.90, 960.94, 2181.60, 1393.20, 2171.94, 3128.30, 594.56, 646.08, 585.52, 2591.15, 1932.75, 7774.00, 2245.08, 2499.64, 1975.12, 1899.10, 1335.90, 1942.58, 1993.36, 2277.03, 2036.84, 2204.24, 1129.70];
var ticker = ['ABBV', 'AFG', 'AFL', 'ALL', 'AMGN', 'AMT', 'BAH', 'BBY', 'BXP', 'CAG', 'CI', 'CVX', 'EOG', 'HII', 'HPQ', 'HRB', 'IRM', 'JEPI', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'NXST', 'OKE', 'OMC', 'ORCL', 'PNW', 'SCHD', 'SLGN', 'SNA', 'SSB', 'T', 'TROW', 'TRP', 'TSN', 'UGI', 'VICI', 'VST', 'WHR'];

// define upper and lower bound
var portfolio = 74375.68;
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