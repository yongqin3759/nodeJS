const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=41577948994510d312ba71880ffaf762&query=1.3521,103.8198'

request({url:url, json:true}, (error, response)=>{
    if(error){
        console.log('unable to connect to weather service')
    }else if(response.body.error){
        console.log('unable to find location')
    }else{    
        const data = response.body
        console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} out. It feels like ${data.current.feelslike} out.`)
    }
});

const urlGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieW9uZ3FpbjM3NTkiLCJhIjoiY2tscmtzeThlMDE0ZjJubnc1cHdpcTZxbCJ9.gW7OSBea4CZ0ZW5oKkJBgA&limit=1"


request({url: urlGeocoding, json:true},(error, response)=>{
    if(error){
        console.log('Unable to connect to geocoding service')
    }else if(response.body.features.length === 0){
        console.log('unable to find location')
    }else{
    const data = response.body.features[0].center
    console.log(`lattitude: ${data[1]}, longitude; ${data[0]}`)
    }
})

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

geocode('Singapore', (error, data)=>{
    console.log(`Error: ${error}`)
    console.log('Data', data)
})