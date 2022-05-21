const getWeather = async (address) => {
  try {
    const response = await fetch(`/weather?address=${address}`);
    const result = await response.json();
    console.log(result);
    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const weatherForm = document.querySelector('form');
const searchButton = document.querySelector('#location');
const loadingMessage = document.querySelector('.loading-message');
const weatherMessage = document.querySelector('.weather-message');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    loadingMessage.textContent = 'Loading...';

    const result = await getWeather(searchButton.value);

    loadingMessage.textContent = '';
    console.log(result)
    weatherMessage.textContent = result.forecast;
  } catch (err) {
    loadingMessage.textContent = '';
    weatherMessage.textContent = err;
  }
});

