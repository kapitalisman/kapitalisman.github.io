// data
var values = [2252.80, 496.35, 2361.04, 2347.92, 2193.75, 1350.70, 1022.16, 1039.85, 575.35, 1018.64, 2409.02, 2336.32, 1275.56, 1264.50, 513.23, 559.31, 1050.50, 1227.28, 949.90, 2140.48, 1296.90, 2270.10, 3188.57, 584.34, 667.68, 639.92, 2257.36, 1185.36, 2049.25, 7435.06, 2199.50, 2457.73, 981.12, 3050.68, 1187.82, 2030.32, 2269.19, 498.24, 2188.90, 1089.65];
var ticker = ['ABBV', 'AFG', 'AFL', 'ALL', 'AMGN', 'AMT', 'BAH', 'BBY', 'BXP', 'CAG', 'CVX', 'EOG', 'HD', 'HII', 'HPQ', 'HRB', 'HRL', 'IRM', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'NXST', 'OKE', 'OMC', 'ORCL', 'PEP', 'PNW', 'SCHD', 'SLGN', 'SNA', 'SSB', 'T', 'TROW', 'TRP', 'UGI', 'VICI', 'VST', 'WHR'];

// define upper and lower bound
var portfolio = 67912.35;
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