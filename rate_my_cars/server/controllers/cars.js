const mongoose = require('mongoose');
const Car = mongoose.model('Car');
const Comment = mongoose.model('Comment');

module.exports = {
    index: (req, res) =>{
        console.log('server index route');
        Car.find({}, (err, cars) =>{
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, cars: cars})
            }
        })
    },
    create: (req, res) =>{
        console.log('server create route');
        const car = new Car(req.body);
        car.save((err) => {
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, car: car});
            }
        })
    },
    destroy: (req, res) =>{
        console.log('server destroy route');
        const id = req.params.id;
        Car.deleteOne({_id: id}, (err, car)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else{
                res.json({status: true});
            }
        })
    },
    show: (req, res) =>{
        console.log('server show route');
        const id = req.params.id;
        Car.findOne({_id:id}, (err, id)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else {
                res.json({status:true, id: id});
            }
        })
    },
    // update: (req, res) =>{
    //     console.log('server update (comment) route');
    //     console.log(req.body);
    //     const comment = new Comment(req.body);
    //     Car.findOneAndUpdate({_id: req.params.id}, {$push: {
    //         comments: comment
    //     }}, (err)=> {
    //         if(err){
    //             res.json({status:false, error:err});
    //         }
    //         else {
    //             res.json({status: true});
    //         }
    //     })
    // }
    update: (req,res) =>{
        console.log("inside comment create");
        console.log(req.body);
        console.log(req.params.id);
        const comment = new Comment(req.body);
        comment.save((err) =>{
            if(err){
                console.log("error inside comment save")
                res.json({status: false, error: err});
            }
            else{
                Car.findOneAndUpdate({_id: req.params.id}, {$push: {
                    comments: comment
                }}, (err)=> {
                    if(err){
                        console.log("Error inside comment push")
                        res.json({status:false, error:err});
                    }
                    else {
                        console.log("Success inside comment push")
                        res.json({status: true});
                    }
                })
            }
        })
    }
}