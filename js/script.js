// OpenWeatherMap API anahtarı ve istek yapılacak ana URL
const apiKey = "4bb378c80a276499ea2f384ddb1a6774";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elemanlarını seçme
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Birim çevirimi ve anlık verileri saklamak için global değişkenler
let isCelsius = true;
let currentTempCelsius = null;
let forecastDataCelsius = [];

// Sıcaklık birimini (°C - °F) değiştiren ve ekrana güncel durumu basan fonksiyon
function displayTemperature() {
    if (currentTempCelsius === null) return;

    const tempElement = document.querySelector(".temp");
    const toggleBtn = document.getElementById("unitToggle");

    if (isCelsius) {
        tempElement.innerHTML = currentTempCelsius + "°C";
        toggleBtn.innerHTML = "Switch to °F";
    } else {
        const tempFahrenheit = Math.round((currentTempCelsius * 9 / 5) + 32);
        tempElement.innerHTML = tempFahrenheit + "°F";
        toggleBtn.innerHTML = "Switch to °C";
    }

    // Tahmin bölümündeki derece birimlerini ekranda güncelleştirme
    for (let i = 0; i < forecastDataCelsius.length; i++) {
        const fTempElement = document.getElementById(`forecast-temp-${i}`);
        if (fTempElement) {
            if (isCelsius) {
                fTempElement.innerHTML = forecastDataCelsius[i] + "°C";
            } else {
                const fTempFahrenheit = Math.round((forecastDataCelsius[i] * 9 / 5) + 32);
                fTempElement.innerHTML = fTempFahrenheit + "°F";
            }
        }
    }
}

// O anki hava durumuna ve alınan sıcaklığa göre kullanıcılara Türkçe giysi tavsiyesi veren fonksiyon
function getClothingSuggestion(temp, condition) {
    // Aşırı Soğuk (-Sonsuz ile 0 arası)
    if (temp < 0) {
        return "It's freezing! You'll need a heavy thermal coat, gloves, a scarf, and a beanie to stay warm.";
    }
    // Soğuk (0 ile 10 arası)
    else if (temp < 10) {
        if (condition === "Rain") return "It's cold and rainy. A waterproof winter parka and sturdy boots are a must.";
        return "It's quite cold. A thick wool coat or a puffer jacket is recommended.";
    }
    // Serin (10 ile 18 arası)
    else if (temp < 18) {
        if (condition === "Rain") return "Chilly and wet. A trench coat or a water-resistant windbreaker would be perfect.";
        return "The air is crisp. A leather jacket, a denim jacket, or a light trench coat is ideal.";
    }
    // Ilık / Geçiş Mevsimi (18 ile 24 arası)
    else if (temp < 24) {
        return "The weather is pleasant. A long-sleeve shirt, a light sweatshirt, or a cardigan will keep you comfortable.";
    }
    // Sıcak (24 ile 30 arası)
    else if (temp < 30) {
        if (condition === "Clear") return "It's a beautiful sunny day! A cotton T-shirt and sunglasses are all you need.";
        return "It's getting warm. Opt for breathable fabrics like linen or light cotton.";
    }
    // Çok Sıcak (30 ve üzeri)
    else if (temp >= 30) {
        return "It's scorching hot! Wear shorts, a tank top, and don't forget your sunscreen!";
    }
    else {
        return "Don't forget to dress according to the weather!";
    }
}

// Kullanıcının arama çubuğuna girdiği şehir adına göre asenkron hava durumu verisi çeken fonksiyon
async function fetchWeatherByCity(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    handleWeatherResponse(response);
    if (response.ok) {
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${apiKey}`);
        handleForecastResponse(forecastResponse);
    }
}

// Kullanıcının GPS sensörlerinden alınan Geolocation (Enlem-Boylam) değerlerine göre verileri çeken fonksiyon
async function fetchWeatherByCoords(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    handleWeatherResponse(response);
    if (response.ok) {
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        handleForecastResponse(forecastResponse);
    }
}

// Çekilen anlık hava durumu API yanıtını işleyen ve UI'ı (Kullanıcı Arayüzünü) güncelleyen ana fonksiyon
async function handleWeatherResponse(response) {
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        const currentDate = new Date();
        const dateOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        document.querySelector(".date").innerHTML = currentDate.toLocaleDateString('en-US', dateOptions);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".country").innerHTML = data.sys.country;

        currentTempCelsius = Math.round(data.main.temp);
        displayTemperature();
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;
        document.querySelector(".suggestion").innerHTML = getClothingSuggestion(temp, condition);

        const card = document.querySelector(".card");

        // Kullanıcının gördüğü arka plan efektini anlık derecelendirmeye ve hava şartına göre sınıflandıran blok
        let bgClass = "";
        if (temp < 0) bgClass = "bg-freezing";
        else if (temp < 10) bgClass = condition === "Rain" ? "bg-cold-rain" : "bg-cold";
        else if (temp < 18) bgClass = condition === "Rain" ? "bg-chilly-rain" : "bg-chilly";
        else if (temp < 24) bgClass = "bg-pleasant";
        else if (temp < 30) bgClass = condition === "Clear" ? "bg-warm-clear" : "bg-warm";
        else bgClass = "bg-scorching";

        // Reset classes completely and apply new ones
        card.className = "card " + bgClass;

        if (condition == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            card.classList.add("clouds");
        }
        else if (condition == "Clear") {
            weatherIcon.src = "images/clear.png";
            card.classList.add("clear");
        } else if (condition == "Rain") {
            weatherIcon.src = "images/rain.png";
            card.classList.add("rain");
        } else if (condition == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            card.classList.add("drizzle");
        } else if (condition == "Mist") {
            weatherIcon.src = "images/mist.png";
            card.classList.add("mist");
        } else if (condition == "Snow") {
            weatherIcon.src = "images/snow.png";
            card.classList.add("snow");
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

// 3 Günlük hava durumu tahmini yanıtını (forecast API) işleyen ve ekranın alt kısmına küçük kartlar halinde basan fonksiyon
async function handleForecastResponse(response) {
    if (!response.ok) return;
    const data = await response.json();

    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";
    forecastDataCelsius = []; // reset

    const dailyData = [];
    const processedDays = new Set();
    const today = new Date().getDate();

    for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i];
        const date = new Date(item.dt * 1000);
        const day = date.getDate();

        // Bugünün hava durumunu tekrar göstermemek için atla
        if (day === today) continue;

        if (!processedDays.has(day)) {
            // O güne ait tahmin verilerinden saat 12:00'ye en yakın olanı seç
            const dayItems = data.list.filter(d => new Date(d.dt * 1000).getDate() === day);
            const noonItem = dayItems.find(d => d.dt_txt.includes("12:00:00")) || dayItems[0];

            dailyData.push(noonItem);
            processedDays.add(day);
            if (dailyData.length === 3) break;
        }
    }

    dailyData.forEach((dayData, index) => {
        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(dayData.main.temp);
        const condition = dayData.weather[0].main;

        forecastDataCelsius.push(temp); // store for unit toggles

        // Match condition to existing icons
        let iconSrc = "images/clear.png";
        if (condition == "Clouds") iconSrc = "images/clouds.png";
        else if (condition == "Clear") iconSrc = "images/clear.png";
        else if (condition == "Rain") iconSrc = "images/rain.png";
        else if (condition == "Drizzle") iconSrc = "images/drizzle.png";
        else if (condition == "Mist") iconSrc = "images/mist.png";
        else if (condition == "Snow") iconSrc = "images/snow.png";

        let displayTemp = temp + "°C";
        if (!isCelsius) {
            displayTemp = Math.round((temp * 9 / 5) + 32) + "°F";
        }

        const itemHTML = `
            <div class="forecast-item">
                <p class="forecast-day">${dayName}</p>
                <img src="${iconSrc}" class="forecast-icon">
                <p class="forecast-temp" id="forecast-temp-${index}">${displayTemp}</p>
            </div>
        `;
        forecastContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
}

searchBtn.addEventListener("click", () => {
    fetchWeatherByCity(searchBox.value);
})

document.getElementById("unitToggle").addEventListener("click", () => {
    isCelsius = !isCelsius;
    displayTemperature();
});

// Sayfa yüklendiğinde kullanıcının lokasyon iznini isteme veya varsayılan şehre (İstanbul) yönlendirme
if ("geolocation" in navigator) {
    // Kullanıcı Konum İstek Penceresini görmezden gelirse sayfanın sonsuza dek beklememesi için 5 saniyelik bir fail-safe ekle
    const options = { timeout: 5000 };

    navigator.geolocation.getCurrentPosition(
        (position) => {
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn("Geolocation failed, denied, or timed out. Falling back to default city.");
            fetchWeatherByCity("Istanbul");
        },
        options
    );
} else {
    // Eski tarayıcılarda Geolocation özelliği yoksa direkt İstanbul'u çağır
    fetchWeatherByCity("Istanbul");
}
