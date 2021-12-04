// data
var values = [3071.31, 1923.31, 4038.70, 1956.96, 959.50, 1598.10, 2106.83, 1199.70, 2720.00, 2099.98, 718.08, 2436.00, 2631.46, 855.40, 539.20, 2021.25, 1978.40, 2784.32, 1032.24, 1007.28, 3028.50, 7592.00, 1080.79, 2596.01, 1974.00, 538.48, 1317.76, 598.00, 2187.92, 1999.92, 3227.84, 2084.96, 1626.25, 2382.16, 3294.56, 2345.84, 568.32, 2197.91, 1088.70, 599.76];
var ticker = ['MRK', 'TRP', 'BBY', 'ALL', 'CI', 'T', 'LHX', 'TROW', 'VICI', 'AMT', 'OKE', 'EOG', 'ORCL', 'CAG', 'BXP', 'UGI', 'STOR', 'AMGN', 'KEY', 'BAH', 'JEPI', 'SCHD', 'AFG', 'CVX', 'TSN', 'OMC', 'IRM', 'NXST', 'SSB', 'LMT', 'ABBV', 'KMB', 'PNW', 'AFL', 'SNA', 'VST', 'HRB', 'SLGN', 'WHR', 'HPQ'];

// define upper and lower bound
var portfolio = 80007.70;
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