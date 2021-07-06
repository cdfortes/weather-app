const APIKEY = 'HwutEZ8AbB8KXvWQaWzKWKXpAAUgGPY2'
const baseURL = `http://dataservice.accuweather.com`

const getCityURL = (cityName) =>
  `${baseURL}/locations/v1/cities/search?apikey=${APIKEY}&q=${cityName}`

const getCityWeatherURL = (cityKey) =>
  `${baseURL}/currentconditions/v1/${cityKey}?apikey=${APIKEY}&language=pt-br`

const fetchData = async (url) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Não foi possivel obter os dados')
    }

    return response.json()
  } catch ({ name, messsage }) {
    alert(`${name}: ${messsage}`)
  }
}

const getCityData = (cityName) => fetchData(getCityURL(cityName))

const getCityWeatherData = (cityKey) => fetchData(getCityWeatherURL(cityKey))
