// data
var values = [3210.76, 544.16, 2361.48, 2226.06, 2893.07, 1409.85, 1042.32, 3178.24, 568.20, 901.60, 1068.05, 2633.27, 2588.88, 1216.38, 515.61, 553.68, 1323.56, 3099.00, 1070.42, 2071.84, 1383.24, 1993.92, 3610.05, 599.72, 763.44, 544.64, 2782.26, 1612.25, 7751.00, 2130.60, 3265.88, 2186.52, 1098.56, 1768.20, 1301.28, 2218.10, 1999.25, 2127.09, 2940.12, 2311.62, 1054.15];
var ticker = ['ABBV', 'AFG', 'AFL', 'ALL', 'AMGN', 'AMT', 'BAH', 'BBY', 'BXP', 'CAG', 'CI', 'CVX', 'EOG', 'HII', 'HPQ', 'HRB', 'IRM', 'JEPI', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'NXST', 'OKE', 'OMC', 'ORCL', 'PNW', 'SCHD', 'SLGN', 'SNA', 'SSB', 'STOR', 'T', 'TROW', 'TRP', 'TSN', 'UGI', 'VICI', 'VST', 'WHR'];

// define upper and lower bound
var portfolio = 79918.32;
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