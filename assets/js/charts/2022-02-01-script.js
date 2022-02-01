// data
var values = [3121.44, 3020.59, 2117.65, 2334.78, 1653.80, 1152.76, 3141.00, 3340.68, 2363.48, 3134.60, 2272.25, 1785.00, 728.16, 602.88, 3137.42, 973.28, 3832.92, 3179.96, 1152.30, 1122.12, 1037.07, 1064.93, 2222.15, 1740.25, 2092.90, 4957.54, 624.41, 7862.00, 1134.78, 4155.75, 3049.50, 2202.40, 2573.58, 2862.00, 1042.24, 2923.57, 1902.60, 1834.96, 1050.95, 918.40, 2012.00, 3063.45];
var ticker = ['EOG', 'CVX', 'TRP', 'LMT', 'NXST', 'KEY', 'AFL', 'MRK', 'SSB', 'SLGN', 'TSN', 'T', 'OKE', 'OMC', 'ALL', 'CAG', 'ABBV', 'AMGN', 'CI', 'ALLY', 'BMY', 'TXN', 'UGI', 'PNW', 'LHX', 'BBY', 'HPQ', 'SCHD', 'HRB', 'SNA', 'JEPI', 'KMB', 'VST', 'VICI', 'AFG', 'ORCL', 'STOR', 'BAH', 'WHR', 'IRM', 'AMT', 'TROW'];

// define upper and lower bound
var portfolio = 96494.50;
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