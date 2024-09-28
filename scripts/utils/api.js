export const getWeatherData = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b875e90fda6b7ed64191507a294f9fc7&lang=ru&units=metric`
        );
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export const handleWeatherByGeolocation = async () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const success = async (pos) => {
        const crd = pos.coords;

        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&lang=ru&apiKey=f042944a12a04b2696c7eb9959341dda`);

        const result = await response.json();

        localStorage.setItem('city', result.features[0].properties.city);
    }

    const error = (error) => {
        console.log(error.code + ' ' + error.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}
