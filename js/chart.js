// create pie gender chart
function createChart(male, female) {
  let options = {
    segmentShowStroke : false,
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var allData = data.datasets[tooltipItem.datasetIndex].data;
          var tooltipLabel = data.labels[tooltipItem.index];
          var tooltipData = allData[tooltipItem.index];
          var total = 0;

          for (let i in allData) {
            total += allData[i];
          }
          let tooltipPercentage = Math.round((tooltipData / total) * 100);

          return tooltipLabel + ": " + tooltipPercentage + "%";
        }
      }
    },
    legend: {
      onClick: function(event, legendItem) {}
    }
  };

  let data = {
    labels: [
      "Male",
      "Female"
    ],
    datasets: [
    {
      data: [male, female],
      backgroundColor: [
        "#36A2EB",
        "#999"
      ],
      hoverBackgroundColor: [
        "#36A2EB",
        "#999"
      ]
    }]
  };

  // get chart canvas
  let chart = $("#chart");

  // create chart
  let genderChart = new Chart(chart, {
    type: "pie",
    data: data,
    options: options
  });
}