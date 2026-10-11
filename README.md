# ThermoTrack — Temperature Dynamics Analyzer

A student prototype using HTML, CSS, JavaScript, Python, Flask, and Chart.js to model temperature changes with a first-order ODE.

## Model
Newton's law of cooling:
`dT/dt = -k(T - Ta)`

Analytical solution:
`T(t) = Ta + (T0 - Ta) * exp(-k*t)`

## Requirements
- Python 3.10 or newer
- Internet connection on first page load for Chart.js CDN (the calculator itself runs locally)

## Run locally
1. Extract this ZIP.
2. Open a terminal in the extracted `temperature_dynamics_project` folder.
3. Create a virtual environment if desired: `python -m venv .venv`
4. Activate it (Windows: `.venv\\Scripts\\activate`; macOS/Linux: `source .venv/bin/activate`)
5. Install dependencies: `pip install -r requirements.txt`
6. Start the app: `python app.py`
7. Open `http://127.0.0.1:5000` in your browser.

## Features
- User-entered initial and ambient temperatures
- Adjustable cooling constant, simulation duration, and time interval
- Python/Flask JSON API for calculations
- Interactive temperature-vs-time graph
- Output table and cooling/warming/equilibrium status

## Notes
This is an educational prototype, not a calibrated industrial monitoring tool. It uses an idealized constant ambient temperature and constant heat-transfer coefficient.
