const request = require('request');
const CONSTANT = require('../constants/constant');

const forecast = (latitude, longitude, callback) => {
    const url = `${CONSTANT.BASE_URL}/current?access_key=${CONSTANT.API_ACCESS_KEY_WEATHER_STACK}&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to services!', undefined);
        } else if (body.error) {
            callback('Unable to find weather. Try another search', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike, humidity } = body.current;
            console.log(body);
            callback(undefined, `${weather_descriptions.length ? weather_descriptions[0] : ''} . It is currently ${temperature}℃ out.
             It feels like ${feelslike} ℃  out. The humidity ${humidity} %`);
        }
    });
}

module.exports = {
    forecast
}