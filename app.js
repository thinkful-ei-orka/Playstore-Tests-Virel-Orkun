const express = require('express');
const morgan = require('morgan');
const appStore = require('./app-store');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    let responseData = appStore;

    let sortFilter = ['Rating', 'App'];
    let genreFilter = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

    if (genres) {
        if (!genreFilter.includes(genres)) {
            return res
                .status(400)
                .send('Please put in a correct Genre to filter by.')
        }

        responseData = responseData.filter(game => {
            return game.Genres === genres
        });
    }

    if (sort) {
        if (!sortFilter.includes(sort)) {
            return res
                .status(400)
                .send('Please put in a correct sort method.')
        }

        responseData.sort((a, b) => {
            return a[sort] < b[sort] ? 1 : -1;
        })
    }

    res.json(responseData);
})

module.exports = app;