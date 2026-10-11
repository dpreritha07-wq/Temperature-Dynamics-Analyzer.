const form = document.getElementById("modelForm");
let chart;

function drawChart(times, temperatures) {
  const ctx = document.getElementById("temperatureChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [{
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "#5eead4",
        backgroundColor: "rgba(94,234,212,.12)",
        borderWidth: 2.5,
        pointRadius: times.length > 35 ? 0 : 2,
        pointHoverRadius: 5,
        fill: true,
        tension: .3
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { title: { display: true, text: "Time (minutes)", color: "#94a7c2" }, ticks: { color: "#94a7c2", maxTicksLimit: 8 }, grid: { color: "rgba(148,167,194,.10)" } },
        y: { title: { display: true, text: "Temperature (°C)", color: "#94a7c2" }, ticks: { color: "#94a7c2" }, grid: { color: "rgba(148,167,194,.10)" } }
      }
    }
  });
}

async function runSimulation() {
  document.getElementById("error").textContent = "";
  const payload = {
    initial: Number(document.getElementById("initial").value),
    ambient: Number(document.getElementById("ambient").value),
    k: Number(document.getElementById("k").value),
    duration: Number(document.getElementById("duration").value),
    step: Number(document.getElementById("step").value)
  };
  try {
    const response = await fetch("/calculate", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to calculate.");
    document.getElementById("metricInitial").innerHTML = `${payload.initial.toFixed(1)}<span>°C</span>`;
    document.getElementById("metricFinal").innerHTML = `${result.final_temperature.toFixed(1)}<span>°C</span>`;
    const trend = result.trend.charAt(0).toUpperCase() + result.trend.slice(1);
    document.getElementById("metricTrend").textContent = trend;
    document.getElementById("durationLabel").textContent = `0–${payload.duration} minutes`;
    drawChart(result.times, result.temperatures);
    const tbody = document.getElementById("dataRows");
    tbody.innerHTML = result.times.map((t, i) => `<tr><td>${t}</td><td>${result.temperatures[i].toFixed(3)}</td><td>${(result.temperatures[i] - payload.ambient).toFixed(3)}</td></tr>`).join("");
  } catch (error) {
    document.getElementById("error").textContent = error.message;
  }
}
form.addEventListener("submit", event => { event.preventDefault(); runSimulation(); });
runSimulation();
