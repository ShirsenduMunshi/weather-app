const apiKey = "6f64ffd60b8cfd552b7cd7b4b172d81b"
const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formEle.addEventListener("submit",(e) => {
//   console.log(cityNameEle.value);
    e.preventDefault()
    const cityValue = cityNameEle.value
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try{
        const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new Error("No network connection !!!")
        }
        const data = await response.json()
        // console.log(data);
        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const wIcon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${Math.floor(data.main.humidity)}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".temp").textContent = `${temp}°C`
        weatherDataEle.querySelector(".desc").textContent = `${desc}`
        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${wIcon}.png" alt="icon">`

        weatherDataEle.querySelector(".details").innerHTML = details.map((item) => {
          return `<div>${item}</div>`
        }).join("")
    }catch(err){
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"
    }
}
