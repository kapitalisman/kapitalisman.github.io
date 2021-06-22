// data
var values = [-153, -53, 0, 47, 47, 47]

// define chart colors
var colors = {
    red: 'rgba(255, 88, 95, 0.2)',
    blue: 'rgba(0, 177, 255, 0.2)',
    green: 'rgba(0, 192, 96, 0.2)'
};

// define chart options
var options = {
	title: {
        display: true,
        text: 'Pfizer $35 Put Optie'
    },
	responsive: true,
    scales: {
        yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Winst'
			},
            ticks: {
                beginAtZero: true,
                callback: function(value, index, values) {
                    return '$' + value;
                },
			min: -200,
			max: 100,
			stepSize: 100
            }
        }],
		xAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Aandeelprijs'
			},
			ticks: {
                callback: function(value, index, values) {
                    return '$' + value;
                },
				stepSize: 1
            },
			type: 'linear'
		}]
    },
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
			title: function(tooltipItem, data) {
				return 'Aandeelprijs: $' + tooltipItem[0].label;
			},
            label: function(tooltipItem, data) {
				var label = data.datasets[tooltipItem.datasetIndex].label || '';
				if (label) {
                    label += ': ';
                }
				label += '$' + Number(tooltipItem.value);
                return label;
            }
        }
    },
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'bottom',
            formatter: function(value, context) {
                return '$' + value.y;
            }
        }
    }
};

// get context
var ctx = document.getElementById('payoff');

// initialize chart
var payoff = new Chart(ctx, {
    type: 'line',
    data: {
		datasets: [{
			label: 'Winst',
			lineTension: 0,
            data: [{
                x: 33,
                y: -153
            }, {
                x: 34,
                y: -53
            }, {
                x: 34.53,
                y: 0
            }, {
                x: 35,
                y: 47
            }, {
                x: 36,
                y: 47
            }, {
                x: 37,
                y: 47
            }],
            backgroundColor: Array(values.length).fill(colors.blue),
            borderColor: Array(values.length).fill(colors.blue),
            borderWidth: 1
        }]
    },
    options: options
});