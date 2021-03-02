const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieW9uZ3FpbjM3NTkiLCJhIjoiY2tscmtzeThlMDE0ZjJubnc1cHdpcTZxbCJ9.gW7OSBea4CZ0ZW5oKkJBgA&limit=1`

    request({ url: url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!')
        }else if(response.body.features.length === 0){
            callback('Unable to find location')
        }else{
            const data = response.body.features[0].center
            callback( undefined, {
                latitude: data[0],
                longitude: data[1],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode