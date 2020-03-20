const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm95amlueSIsImEiOiJjazd4YjVjZW4wNjdkM3BreXR0dTNuNHExIn0.wRG0NwuFtmAhvYs_igl7HQ`;
    
    request({ url, json: true }, (error, response) => {
        if (error || response.body.features.length === 0){
            callback('an error has happened', undefined);
        } else {
            const lat = response.body.features[0].center[1];
            const long = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
    
            callback(undefined, {lat, long, location });
        }
    });
}

module.exports = geocode;