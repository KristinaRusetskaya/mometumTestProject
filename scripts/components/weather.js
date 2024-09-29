import {getWeatherData, handleWeatherByGeolocation} from "../utils/api.js";

export class Weather {
    constructor() {
        this.weatherButtonElement = document.getElementById('weather-button');
        this.cityElements = document.getElementsByClassName('city-elements');
        this.iconWeatherElement = document.getElementsByClassName('icon-weather-element');
        this.degWeatherElement = document.getElementsByClassName('deg-weather');
        this.momentumWeatherConditionsElement = document.getElementById('momentum-weather-conditions');
        this.detailFirstElement = document.getElementById('detail-first');
        this.detailSecondElement = document.getElementById('detail-second');
        this.detailThirdElement = document.getElementById('detail-third');
        this.buttonSearchCityElement = document.getElementById('button-search-city');
        this.momentumSearchBlockElement = document.getElementById('momentum-search-block');
        this.searchCloseElement = document.getElementById('search-close');
        this.geolocationElement = document.getElementById('geolocation');
        this.momentumWeatherSectionElement = document.getElementById('momentum-weather-section');
        this.momentumWeatherConditionsElement = document.getElementById('momentum-weather-conditions');
        this.momentumSearchInputElement = document.getElementById('momentum-search-input');

        this.weatherButtonElement.addEventListener('click', this.showAndHide.bind(this));
        this.buttonSearchCityElement.addEventListener('click', this.showSearchCity.bind(this));
        this.searchCloseElement.addEventListener('click', this.closeSearchCity.bind(this));
        this.geolocationElement.addEventListener('click', this.weatherByGeolocation.bind(this));
        this.momentumSearchInputElement.addEventListener('keydown', this.searchCity.bind(this));
        this.weather = null;

        this.init().then();
    }

    async init() {
        this.weather = await getWeatherData('Краснодар');

        this.createContent('Краснодар', this.weather);

    }

    showAndHide() {
        this.momentumSearchBlockElement.setAttribute("style", "display: none");
        this.momentumWeatherSectionElement.setAttribute('style', 'opacity: 1');
        this.momentumWeatherConditionsElement.setAttribute('style', 'opacity: 1');
        const weatherListElement = document.getElementById('weather-list');
        let weatherListAttribute = weatherListElement.getAttribute('style');
        if (weatherListAttribute === "display: none") {
            weatherListElement.setAttribute("style", "display: block");
            weatherListAttribute = weatherListElement.getAttribute('style');
        } else if (weatherListAttribute === "display: block") {
            weatherListElement.setAttribute("style", "display: none");
            weatherListAttribute = weatherListElement.getAttribute('style');
        }
    }

    createContent(city, data) {
        this.cityElements[0].innerText = data.name;
        this.cityElements[1].innerText = data.name;

        this.iconWeatherElement[0].src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        this.iconWeatherElement[1].src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        this.degWeatherElement[0].innerText = Math.floor(data.main.temp) + '\u00B0';
        this.degWeatherElement[1].innerText = Math.floor(data.main.temp) + '\u00B0';

        console.log(this.momentumWeatherConditionsElement.innerText = data.weather[0].description.
        split(/^\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' '));

        this.detailFirstElement.innerText = Math.floor(data.main.feels_like) + '\u00B0';
        this.detailSecondElement.innerText = Math.floor(data.main.humidity) + '%';
        this.detailThirdElement.innerText = Math.floor(data.wind.speed) + 'км/ч';
    }

    showSearchCity() {
        let momentumSearchBlockAttribute = this.momentumSearchBlockElement.getAttribute('style');
        if (momentumSearchBlockAttribute === "display: none") {
            this.momentumSearchBlockElement.setAttribute("style", "display: flex");
            this.momentumWeatherSectionElement.setAttribute('style', 'opacity: 0.2');
            this.momentumWeatherConditionsElement.setAttribute('style', 'opacity: 0.2');
        }
    }

    closeSearchCity() {
        let momentumSearchBlockAttribute = this.momentumSearchBlockElement.getAttribute('style');
        if (momentumSearchBlockAttribute === "display: flex") {
            this.momentumSearchBlockElement.setAttribute("style", "display: none");
            this.momentumWeatherSectionElement.setAttribute('style', 'opacity: 1');
            this.momentumWeatherConditionsElement.setAttribute('style', 'opacity: 1');
        }
    }

    async weatherByGeolocation() {

        await handleWeatherByGeolocation();

        const weather = await getWeatherData(localStorage.getItem('city'));

        this.createContent(localStorage.getItem('city'), weather);
    }

    async searchCity(event) {

        let momentumSearchInputValue = this.momentumSearchInputElement.value;

        if (momentumSearchInputValue && event.key === "Enter") {

            this.momentumSearchInputElement.setAttribute("style", "outline: none;");
            if (!momentumSearchInputValue) {
                return;
            }

            try {
                const weather = await getWeatherData(momentumSearchInputValue);

                if (weather.message) {
                    this.momentumSearchInputElement.setAttribute("style", "border: 1px solid red;");
                    this.momentumSearchInputElement.value = 'Город не найден';
                    return;
                }

                this.createContent(this.momentumSearchInputElement.value, weather);
                this.momentumSearchInputElement.value = '';
            } catch (error) {
                console.log(error);
            }

        }
    }
}