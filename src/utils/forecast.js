const request = require('request');

function forecast ({latitude, longitude}, callback) {
    const  url = 'https://api.darksky.net/forecast/40c50407049d4f9318213eabbe1fcc96/' + latitude + ',' + longitude +'?units=si'
    request({url, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (response.body.error) {
            callback('Unable to find location!',undefined)
        } else {
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            const summary =  body.daily.data[0].summary
            const high =  body.daily.data[0].temperatureHigh
            const low =  body.daily.data[0].temperatureLow
            const msg = ` ${summary} It is currently ${temperature} degrees out. High should be ${high} while Low should be ${low} There is a ${precipProbability} chance of rain`
            callback(undefined,msg)
        }
    });
}

module.exports = forecast
