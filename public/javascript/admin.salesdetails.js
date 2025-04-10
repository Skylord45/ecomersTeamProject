const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "janunary",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "octomber",
      "november",
      "december",
    ],
    datasets: [
      {
        label: "no. of sales",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

async function fetchdataofwearsales() {
  const response = await fetch("/admin/fetchdataofwearsales", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  const ctx3 = document.getElementById("barchart");
  new Chart(ctx3, {
    type: "pie",
    data: {
      labels: results.productname,
      datasets: [
        {
          label: "no. of sales",
          data: results.no,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
async function fetchdataofelectronicsales() {
  const response = await fetch("/admin/fetchdataofelectronicsales", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
  // console.log(results);
  const ctx2 = document.getElementById("pieChart");
  new Chart(ctx2, {
    type: "pie",
    data: {
      labels: results.productname,
      datasets: [
        {
          label: "no. of sales",
          data: results.no,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


async function fetchsalesdatacatwise() {
  const response = await fetch("/admin/fetchdatacatwise", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const json = await response.json();
  let results = json.data;
 
  const ctx4 = document.getElementById("catwisesales");
  new Chart(ctx4, {
    type: "line",
    data: {
      labels: results.cat_id,
      datasets: [
        {
          label: "no. of sales",
          data: results.total_order,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
fetchdataofelectronicsales();
fetchdataofwearsales()
fetchsalesdatacatwise()