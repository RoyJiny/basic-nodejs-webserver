const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/c2c96b2f0e6ff8e5f35b765863747204/${lat},${long}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("an error has happened", undefined);
        } else {
            if (response.body.error){
                callback("an error has happened", undefined);
            } else {
                callback(undefined, response.body.daily.data[0].summary);
            }
        }
    });
}

module.exports = forecast;