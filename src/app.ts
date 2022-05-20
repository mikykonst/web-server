export {};
const path = require('path');
const get = require('lodash/get');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: 'Mike',
    title: 'About me',
  });
});

app.get('/weather', (req, res) => {
  const address = get(req, 'query.address');
  if (!address) {
    return res.send({error: 'Error: provide address!'});
  }

  geocode(address, (err, result) => {
    if (err) {
      return res.send({error: 'Error: ' + err});
    } else {
      forecast(result.lat, result.lon, (err, result) => {
        if (err) {
          return res.send({error: 'Error: ' + err});
        } else {
          return res.send({
            forecast: result,
            address,
          })
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!get(req, 'query.search')) {
    return res.send('Error: You have to provide search param');
  }

  res.send({
    products: [],
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {title: 'Help article not found'});
});

app.get('*', (req, res) => res.render('404', {title: '404 Error'}));

app.listen(3000, () => console.log('Server is up on port 3000'));
