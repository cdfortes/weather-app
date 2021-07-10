const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
)
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

let timeImg = document.querySelector('[data-js="time"]')


const showCityCard = () => cityCard.classList.remove('d-none')

const insertWeatherDataInDOM = async (cityName) => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
    await getCityWeatherData(Key)
  const templateTimeIcon = `<img src="./src/icons/${WeatherIcon}.svg" alt="weather-icon"/>`

  timeImg.src = IsDayTime ? './src/day.svg' : './src/night.svg'
  timeIconContainer.innerHTML = templateTimeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

cityForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const cityName = event.target.city.value

  insertWeatherDataInDOM(cityName)
  showCityCard()
  cityForm.reset()
})
