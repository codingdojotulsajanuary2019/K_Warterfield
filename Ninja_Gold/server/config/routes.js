const Ninja = require('./../controllers/events');

module.exports = (app)=>{
    app.post('/ninja', Ninja.create)
}