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
            callback(undefined, `Current temperature is ${body.current.temperature}℃`);
        }
    });
}

module.exports = {
    forecast
}