window.addEventListener("message", function (event) {
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
