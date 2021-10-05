// data
var values = [3040.69, 503.32, 2293.72, 2291.58, 1913.85, 1327.05, 952.20, 2748.46, 541.75, 948.36, 1000.80, 2333.35, 2247.56, 1158.36, 465.12, 600.00, 1260.05, 2980.50, 994.52, 2119.04, 1321.44, 2070.60, 3079.51, 607.84, 695.88, 579.68, 2526.77, 1809.00, 7424.00, 2033.08, 2298.45, 2090.76, 1048.84, 1890.70, 1180.20, 1971.69, 1973.50, 2088.38, 1931.88, 2017.80, 1019.30];
var ticker = ['ABBV', 'AFG', 'AFL', 'ALL', 'AMGN', 'AMT', 'BAH', 'BBY', 'BXP', 'CAG', 'CI', 'CVX', 'EOG', 'HII', 'HPQ', 'HRB', 'IRM', 'JEPI', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'NXST', 'OKE', 'OMC', 'ORCL', 'PNW', 'SCHD', 'SLGN', 'SNA', 'SSB', 'STOR', 'T', 'TROW', 'TRP', 'TSN', 'UGI', 'VICI', 'VST', 'WHR'];

// define upper and lower bound
var portfolio = 73379.58;
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