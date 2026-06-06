const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", async () => {
    const city = document.getElementById("city").value;

    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            throw new Error("not found");
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`);
        const weatherData = await weatherRes.json();

        output.innerHTML = `
            <p>Місто: ${name}</p>
            <p>Температура: ${weatherData.current.temperature_2m}°C</p>
            <p>Вологість: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Код погоди: ${weatherData.current.weather_code}</p>
        `;
    } catch (e) {
        output.innerHTML = `<p class="error">Місто не знайдено</p>`;
    }
});