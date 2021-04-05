const request = require('request');

const chalk = require('chalk');


const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=41577948994510d312ba71880ffaf762&query=${longitude},${latitude}`

    request({ url: url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast service')
        }else if(body.success===false){
            callback('Unable to find location')
        }else{
            const data = body
            if(data.current.temperature > 35 || data.current.feelslike>35 ){
            console.log(chalk.red.inverse('Damn its hot'))
            }else if(data.current.temperature<0||data.current.feelslike<2){
                console.log(chalk.blue.inverse('Brrrr... hell froze over'))
            }
            callback(undefined,`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} out. It feels like ${data.current.feelslike} out`)
        }
    })
}

module.exports = forecast