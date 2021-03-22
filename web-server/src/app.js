const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Yong Qin'
    })
})

console.log(path.join(__filename, '../public/about.html'));
app.get('/help',(req, res)=>{
    res.send([{
        name:'yong Qin',
        age: 25
    },{
      name:'Tiff'  
    }])
})


app.get('/weather',(req,res)=>{
    res.send({
        location:'Singapore',
        forecast: 'rain'
    });
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
