var temperatureC = parseFloat(document.getElementById("temperature").textContent.replace(/[^0-9.-]+/g, ""));
var windSpeedKmH = parseFloat(document.getElementById("wind-speed").textContent.replace(/[^0-9.-]+/g, ""));



function calculateWindChill(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
}


let windChillDisplay;

if (temperatureC <= 10 && windSpeedKmH > 4.8) {
    
    windChillDisplay = calculateWindChill(temperatureC, windSpeedKmH).toFixed(2) + " °C"; 
} else {
    windChillDisplay = "N/A";
}


document.addEventListener("DOMContentLoaded", function() {
    const windChillElement = document.getElementById("wind-chill-display");
    windChillElement.textContent = windChillDisplay;
});


