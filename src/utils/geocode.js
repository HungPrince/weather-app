const request = require("request");
const CONSTANT = require('../constants/constant');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${CONSTANT.MAP_BOX_ACCESS_TOKEN}`;
    
    request({ url, json: true }, (err, { body }) => {
        try {
            if (err) {
                callback('Unable to connect to location services!', undefined);
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined)
            } else {
                const { center } = body.features[0];
                const location = body.features[0].place_name;
                callback(undefined, {
                    latitude: center[0],
                    longitude: center[1],
                    location
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
}

module.exports = {
    geocode
}