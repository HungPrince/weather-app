const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hung Prince'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Hung Prince'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({
                error
            });
        forecast(latitude, longitude, (error, forecast) => {
            if (err)
                return res.send({
                    error
                });
            res.send({
                forecast,
                location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    return res.send({
        products: [] 
    });
});

app.get('/help/*', (req, res) => {
    res.render('help')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
