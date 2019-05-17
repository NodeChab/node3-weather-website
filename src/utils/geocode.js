const request = require('request');
function geocode (address, callback) {
    const args = [].slice.call(arguments);
    const mapboxurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiY2hhYmhhbSIsImEiOiJjanZudXZwa2cxcnZtNDRxcnZ1eWJsOTRoIn0.H4Csh61TANrAugNvvaMuQw&limit=1"
    request({url:mapboxurl, json: true}, (error, response, {features}) => {
        if (error) {
            callback('Unable to connect to mapbox service!',undefined)
        } else if (features.length === 0 ) {
            callback('Unable to get latitude/longitude',undefined)
        } else {
            let data = {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location:  features[0].place_name
            }
            callback (undefined,data)
        }
    });
}



module.exports = geocode