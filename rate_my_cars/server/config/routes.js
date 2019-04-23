const Cars = require('./../controllers/cars');

module.exports = (app)=>{
    app.get('/cars', Cars.index)
    app.post('/cars', Cars.create)
    app.delete('/cars/:id', Cars.destroy)
    app.get('/cars/:id', Cars.show)
    app.post('/cars/:id', Cars.update)
}