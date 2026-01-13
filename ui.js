window.addEventListener("message", function (event) {
    console.log("RAW DATA FROM GTA:", event.data);

    const data = event.data;
    if (!data) return;

    const speed = Math.round(data.speed || data.vehicleSpeed || 0);
    const rpm = data.rpm || data.vehicleRPM || 0;
    const gear = data.gear ?? data.currentGear ?? "N";
    const fuel = Math.round(data.fuel ?? data.vehicleFuel ?? 100);
    const engine = Math.round(data.engine ?? data.vehicleEngine ?? 100);

    updateSpeedo(speed, rpm, gear, fuel, engine);
});
("message", function (event) {
    const data = event.data;
    if (!data) return;

    // Contoh struktur data dari JG-Works
    const speed = Math.round(data.speed || 0);      // MPH
    const rpm = data.rpm || 0;                       // 0.0 – 1.0
    const gear = data.gear ?? "N";
    const fuel = Math.round(data.fuel ?? 100);
    const engine = Math.round(data.engine ?? 100);

    updateSpeedo(speed, rpm, gear, fuel, engine);
});

function updateSpeedo(speed, rpm, gear, fuel, engine) {
    document.getElementById("speedValue").innerText = speed;
    document.getElementById("gear").innerText = gear;
    document.getElementById("fuel").innerText = `Fuel: ${fuel}%`;
    document.getElementById("engine").innerText = `Engine: ${engine}%`;

    drawRPM(rpm);
}

function drawRPM(rpm) {
    const canvas = document.getElementById("rpmCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 200, 200);

    const angle = Math.PI + rpm * Math.PI;

    ctx.beginPath();
    ctx.arc(100, 100, 80, Math.PI, angle);
    ctx.strokeStyle = rpm > 0.85 ? "#ff3b3b" : "#00b0ff";
    ctx.lineWidth = 6;
    ctx.stroke();
}

