const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');

const app = express();

// Define Paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'My Weather App',
        name: "Roy Jiny"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Roy Jiny"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Roy Jiny"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.send({ error: "Must provide location"  });
        return;
    }

    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({error});
        }

        forecast(data.lat, data.long, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            
            res.send({
                location: data.location,
                forecast: forecastData
            });
        })
    });    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Roy Jiny",
        errorMessage: "Help Page not found"
    });
});

// use * as a wild card - so every other option that didn;t find a match
app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Page",
        name: "Roy Jiny",
        errorMessage: "Page not found"
    });
});

app.listen(3000, () => {
    console.log('Server is starting');
});