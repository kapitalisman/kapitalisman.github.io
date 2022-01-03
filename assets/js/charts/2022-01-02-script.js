// data
var values = [3791.20, 1098.56, 2921.59, 3060.37, 3149.58, 2340.00, 1530.16, 4065.35, 956.20, 1148.15, 2699.05, 2487.24, 640.39, 565.44, 1046.60, 3159.50, 1063.98, 2286.72, 2132.40, 2132.46, 3142.24, 1516.11, 705.12, 586.16, 2529.09, 1764.75, 8083.00, 2996.25, 3446.08, 2243.08, 2064.00, 1722.00, 1976.08, 1908.14, 2179.00, 2249.59, 3011.00, 2686.86, 1173.30];
var ticker = ['ABBV', 'AFG', 'AFL', 'ALL', 'AMGN', 'AMT', 'BAH', 'BBY', 'CAG', 'CI', 'CVX', 'EOG', 'HPQ', 'HRB', 'IRM', 'JEPI', 'KEY', 'KMB', 'LHX', 'LMT', 'MRK', 'NXST', 'OKE', 'OMC', 'ORCL', 'PNW', 'SCHD', 'SLGN', 'SNA', 'SSB', 'STOR', 'T', 'TROW', 'TRP', 'TSN', 'UGI', 'VICI', 'VST', 'WHR'];

// define upper and lower bound
var portfolio = 88256.79;
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