const app = require('./app');
const { expect } = require('chai');
const supertest = require('supertest');
const appStore = require('./app-store')



describe('GET /apps', () => {
    //overall response without queries
    it('should return 200 with json array of Playstore data', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.be.an('object');
                expect(res.body[0]).to.be.include.keys(
                    'App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
                )
            })
    })
    it('should return 400 with "an error"', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'blah blah'})
            .expect(400)
    })

    it('should return 400 with "an error"', () => {
        return supertest(app)
            .get('/apps')
            .query({genres: 'blah blah'})
            .expect(400)
    })

    let sortFilter = ['Rating', 'App'];
    sortFilter.forEach(sort => {
        it('should return 200 with an array sorted by Rating or App', () => {
            return supertest(app)
                .get('/apps')
                .query({ sort: sort })
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    let sortArray = appStore.sort((a, b) => {
                        return a[sort] - b[sort];
                    })
                   
                    expect(sortArray).to.eql(res.body)
                })
        })
    })

    let genreFilter = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    genreFilter.forEach(genre => {
        it('should return 200 with an array sorted by Genres', () => {
            return supertest(app)
                .get('/apps')
                .query({ genres: genre })
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    filterAppStore = appStore.filter(item => {
                        return item.Genres === genre
                    })
                    expect(filterAppStore).to.eql(res.body)
                })
        })
    })
   
})