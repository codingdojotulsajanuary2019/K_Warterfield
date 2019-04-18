const mongoose = require('mongoose');
const Ninja = mongoose.model('Ninja');

module.exports = {
    create: (req, res) =>{
        console.log("create route");
        console.log(req.body);
        const ninja = new Ninja(req.body);
        ninja.save((err) => {
            if(err) {
                res.json({status: false, error: err});
                console.log("There was an error in the create route!")
            }
            else {
                res.json({status: true, ninja: ninja});
                console.log("There was NO error in the create route!")
            }
        })
    }
}