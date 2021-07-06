const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector(
  '[data-js="city-temperature"]'
)
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')

let timeImg = document.querySelector('[data-js="time"]')

const getCityWeather = async (cityName) => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
    await getCityWeatherData(Key)

  return {
    LocalizedName,
    WeatherText,
    Temperature,
    IsDayTime,
    WeatherIcon,
  }
}

const showCityCard = () => cityCard.classList.remove('d-none')

const changeImgDayOrNight = (IsDayTime) =>
  IsDayTime
    ? (timeImg.src = './src/day.svg')
    : (timeImg.src = './src/night.svg')

const insertWeatherDataInDOM = async (cityName) => {
  const cityWeather = await getCityWeather(cityName)

  if (cityWeather) {
    const { LocalizedName, WeatherText, Temperature, IsDayTime, WeatherIcon } =
      cityWeather
    const templateTimeIcon = `<img src="./src/icons/${WeatherIcon}.svg" alt="weather-icon"/>`

    changeImgDayOrNight(IsDayTime)
    timeIconContainer.innerHTML = templateTimeIcon
    cityNameContainer.textContent = LocalizedName
    cityWeatherContainer.textContent = WeatherText
    cityTemperatureContainer.textContent = Temperature.Metric.Value
    showCityCard()
  }

  cityForm.reset()
}

cityForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const cityName = event.target.city.value

  insertWeatherDataInDOM(cityName)
})
