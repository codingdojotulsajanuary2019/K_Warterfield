const Restaurants = require('./../controllers/restaurants');

module.exports = (app)=>{
    app.get('/restaurants', Restaurants.index)
    app.post('/restaurants', Restaurants.create)
    app.delete('/restaurants/:id', Restaurants.destroy)
    app.get('/restaurants/:id', Restaurants.show)
    app.put('/restaurants/:id', Restaurants.update)
    app.post('/restaurants/:id', Restaurants.review)
}