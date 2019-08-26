const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Review = mongoose.model('Review');

module.exports = {
    index: (req, res) =>{
        console.log('Inside server index (GET) route');
        Restaurant.find({}, (err, restaurants) =>{
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, restaurants: restaurants})
            }
        })
    },
    create: (req, res) =>{
        console.log('Inside server create (POST) route');
        const restaurant = new Restaurant(req.body);
        restaurant.save((err) => {
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, restaurant: restaurant});
            }
        })
    },
    destroy: (req, res) =>{
        console.log('Inside server destroy (DELETE) route');
        const id = req.params.id;
        Restaurant.deleteOne({_id: id}, (err, restaurant)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else{
                res.json({status: true});
            }
        })
    },
    show: (req, res) =>{
        console.log('Inside server show one (GET) route');
        const id = req.params.id;
        Restaurant.findOne({_id:id}, (err, id)=>{
            if(err){
                res.json({status:false, error: err});
            }
            else {
                res.json({status:true, id: id});
            }
        })
    },
    update: (req, res) => {
        var opts = { runValidators: true };
        Restaurant.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, cuisine: req.body.cuisine}, opts, (err) => {
            if(err){
                console.log("Error updating restaurant.");
                res.json({status: false, error: err});
            }
            else{
                console.log("Success inside update restaurant.");
                res.json({status: true});
            }
        })
    },
    review: (req,res) =>{
        console.log('Inside comment create (POST) route');
        console.log('Req.body = ',req.body);
        console.log('Req.params.id = ',req.params.id);
        const review = new Review(req.body);
        review.save((err) =>{
            if(err){
                console.log("Error inside review save");
                res.json({status: false, error: err});
            }
            else{
                console.log("Success inside review save, moving to push into author.");
                Restaurant.findOneAndUpdate({_id: req.params.id}, {$push: {
                    reviews: review
                }}, (err)=> {
                    if(err){
                        console.log("Error inside review push");
                        res.json({status:false, error:err});
                    }
                    else {
                        console.log("Success inside review push, moving to find restaurant.");
                        Restaurant.find({_id: req.params.id}, (err, restaurant) =>{
                            if(err){
                                console.log("Error inside find restaurant");
                                res.json({status: false, error: err});
                            }
                            else{
                                console.log(restaurant[0]['reviews']);
                                let reviews_sel = restaurant[0]['reviews'];
                                let rating_sum = 0;
                                let restaurant_rating = 0;
                                for(var i = 0; i < reviews_sel.length; i++){
                                    rating_sum += reviews_sel[i].rating;
                                }
                                restaurant_rating = rating_sum / reviews_sel.length;
                                restaurant[0].avg_rating = restaurant_rating
                                console.log(restaurant);
                                restaurant[0].save((err) =>{
                                    if(err){
                                        console.log("Error inside last restaurant save.");
                                        res.json({status: false, error:err});
                                    }
                                    else{
                                        console.log("Success inside final restaurant save! Returning updated restaurant.");
                                        res.json({status: true, restaurant: restaurant});
                                    }
                                })
                                // Author.findOneAndUpdate({_id: req.params.id}, {rating: author_rating}, (err)=> {
                                //     if(err){
                                //         console.log("Error inside Author rating update.");
                                //         res.json({status: false, error: err});
                                //     }
                                //     else{
                                //         console.log("Success inside rating update, finding author to return.");
                                //         Author.find({_id: req.params.id}, (err, author) =>{
                                //             if(err){
                                //                 console.log("Error inside last author find.");
                                //                 res.json({status: false, error:err});
                                //             }
                                //             else{
                                //                 console.log("Success inside final author find! Returning updated author.");
                                //                 res.json({status: true, author: author});
                                //             }
                                //         })
                                //     }
                                // })  
                            }
                        })
                    }
                })
            }
        })
    }
}