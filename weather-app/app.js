const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const chalk = require('chalk');

const address = process.argv[2]

if(address){
geocode(address, (error, data)=>{
    if(error){
    return console.log(`Error: ${error}`)
    }
    console.log(chalk.inverse.green('Success!'))
    console.log('Data', data)
    
    forecast(data.latitude, data.longitude, (error, data)=>{
        if(error){
        console.log(`Error: ${error}`)
        }else {
            if(data)
            console.log(`${data}`)}
    
    })
})
} else{
    console.log(chalk.red('No Address Provided'))
}