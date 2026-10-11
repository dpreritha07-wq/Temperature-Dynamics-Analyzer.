from flask import Flask, render_template, request, jsonify
import math

app = Flask(__name__)

def temperature_at_time(t0, ta, k, time):
    """Newton's law of cooling: T(t) = Ta + (T0 - Ta) * exp(-k*t)."""
    return ta + (t0 - ta) * math.exp(-k * time)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json(force=True)
    try:
        initial = float(data["initial"])
        ambient = float(data["ambient"])
        k = float(data["k"])
        duration = float(data["duration"])
        step = float(data.get("step", 1))
        if k < 0 or duration <= 0 or step <= 0:
            raise ValueError("Cooling constant must be non-negative; duration and interval must be positive.")
        count = int(duration / step)
        times = [round(i * step, 6) for i in range(count + 1)]
        if not times or times[-1] < duration:
            times.append(duration)
        temps = [temperature_at_time(initial, ambient, k, t) for t in times]
        trend = "cooling" if initial > ambient else ("warming" if initial < ambient else "at equilibrium")
        return jsonify({
            "times": times,
            "temperatures": [round(x, 3) for x in temps],
            "trend": trend,
            "final_temperature": round(temperature_at_time(initial, ambient, k, duration), 3),
            "formula": "T(t) = Ta + (T0 - Ta) e^(-kt)"
        })
    except (KeyError, TypeError, ValueError) as exc:
        return jsonify({"error": str(exc) or "Please enter valid numeric values."}), 400

if __name__ == "__main__":
    app.run(debug=True)
