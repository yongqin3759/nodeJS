const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory for use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Yong Qin',
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Yong Qin',
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'help',
        helpText: 'Help me pls',
        name: "Yong Qin",
    })
})



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

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name:'Yong Qin'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Error 404',
        name:'Yong Qin'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
