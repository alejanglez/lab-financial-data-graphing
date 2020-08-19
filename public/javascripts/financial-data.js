const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`

axios
    .get(apiUrl)
    .then(response => {
        console.log('Response from API is: ', response);
        printTheChart(response.data);
        console.log('a single days details: ', dayDetail);
    })
    .catch(err => console.log(`error while getting the data`, err));

function printTheChart(stockData) {
    const dailyData = stockData.bpi;

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map((date) => {
        return dailyData[date];
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    const lineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: stockDates,
            datasets: [{
                label: "Bitcoin price index",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                data: stockPrices,
            }, ],
        },
    }); // closes chart = new Chart()
} // closes printTheChart() 


document.querySelector("#btnUpdate").onclick = () => {
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  if (startDate && endDate) {
      axios
          .get(`${apiUrl}?start=${startDate}&end=${endDate}`)
          .then((response) => {
              printTheChart(response.data);
          })
          .catch((err) => {
              console.log(`Error returning filtered data: ${err}`)
          })
  }
} 