const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const Review = mongoose.model('Review');

module.exports = {
    index: (req, res) =>{
        console.log('Inside server index (GET) route');
        Author.find({}, (err, authors) =>{
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, authors: authors})
            }
        })
    },
    create: (req, res) =>{
        console.log('Inside server create (POST) route');
        const author = new Author(req.body);
        author.save((err) => {
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, author: author});
            }
        })
    },
    destroy: (req, res) =>{
        console.log('Inside server destroy (DELETE) route');
        const id = req.params.id;
        Author.deleteOne({_id: id}, (err, author)=>{
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
        Author.findOne({_id:id}, (err, id)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else {
                res.json({status:true, id: id});
            }
        })
    },
    update: (req, res) => {
        Author.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, (err) => {
            if(err){
                console.log("Error updating author.");
                res.json({status: false, error:err});
            }
            else{
                console.log("Success inside update author.");
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
                Author.findOneAndUpdate({_id: req.params.id}, {$push: {
                    reviews: review
                }}, (err)=> {
                    if(err){
                        console.log("Error inside review push");
                        res.json({status:false, error:err});
                    }
                    else {
                        console.log("Success inside review push, moving to find author.");
                        Author.find({_id: req.params.id}, (err, author) =>{
                            if(err){
                                console.log("Error inside find author");
                                res.json({status: false, error: err});
                            }
                            else{
                                console.log(author[0]['reviews']);
                                let reviews_sel = author[0]['reviews'];
                                let rating_sum = 0;
                                let author_rating = 0;
                                for(var i = 0; i < reviews_sel.length; i++){
                                    rating_sum += reviews_sel[i].rating;
                                }
                                author_rating = rating_sum / reviews_sel.length;
                                author[0].avg_rating = author_rating
                                console.log(author);
                                author[0].save((err) =>{
                                    if(err){
                                        console.log("Error inside last author save.");
                                        res.json({status: false, error:err});
                                    }
                                    else{
                                        console.log("Success inside final author save! Returning updated author.");
                                        res.json({status: true, author: author});
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