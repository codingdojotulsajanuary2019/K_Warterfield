const Authors = require('./../controllers/authors');

module.exports = (app)=>{
    app.get('/authors', Authors.index)
    app.post('/authors', Authors.create)
    app.delete('/authors/:id', Authors.destroy)
    app.get('/authors/:id', Authors.show)
    app.put('/authors/:id', Authors.update)
    app.post('/authors/:id', Authors.review)
}