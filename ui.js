/* ================================
   SPEEDOMETER UI (JG-WORKS)
   ================================ */

/* ---------- RPM DRAW ---------- */
function drawRPM(rpm) {
    const canvas = document.getElementById("rpmCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clamp rpm 0.0 - 1.0
    rpm = Math.max(0, Math.min(1, rpm));

    const startAngle = Math.PI;
    const endAngle = Math.PI + rpm * Math.PI;

    ctx.beginPath();
    ctx.arc(100, 100, 80, startAngle, endAngle);
    ctx.strokeStyle = rpm > 0.85 ? "#ff3b3b" : "#00b0ff";
    ctx.lineWidth = 6;
    ctx.stroke();
}

/* ---------- UPDATE UI ---------- */
function updateSpeedo(speed, rpm, gear, fuel, engine) {
    const speedEl = document.getElementById("speedValue");
    const gearEl = document.getElementById("gear");
    const fuelEl = document.getElementById("fuel");
    const engineEl = document.getElementById("engine");

    if (speedEl) speedEl.innerText = speed;
    if (gearEl) gearEl.innerText = (gear === 0 || gear === "0") ? "N" : gear;
    if (fuelEl) fuelEl.innerText = `Fuel: ${fuel}%`;
    if (engineEl) engineEl.innerText = `Engine: ${engine}%`;

    drawRPM(rpm);
}

/* ---------- ON-SCREEN DEBUG + DATA LISTENER ---------- */
window.addEventListener("message", function (event) {
    const data = event.data;

    // DEBUG DI LAYAR (karena F12 dikunci)
    const debugEl = document.getElementById("debug");
    if (debugEl) {
        debugEl.innerText =
            "RAW DATA:\n" + (data ? JSON.stringify(data) : "null");
    }

    if (!data) return;

    /* --------- FIELD MAPPING (AMAN & LENGKAP) --------- */
    const speed = Math.round(
        data.speed ??
        data.vehicleSpeed ??
        data.spd ??
        data.velocity ??
        0
    );

    const rpm =
        data.rpm ??
        data.vehicleRPM ??
        data.rev ??
        data.engineRPM ??
        0;

    const gear =
        data.gear ??
        data.currentGear ??
        data.gearIndex ??
        "N";

    const fuel = Math.round(
        data.fuel ??
        data.vehicleFuel ??
        data.fuelLevel ??
        100
    );

    const engine = Math.round(
        data.engine ??
        data.vehicleEngine ??
        data.engineHealth ??
        100
    );

    updateSpeedo(speed, rpm, gear, fuel, engine);
});
