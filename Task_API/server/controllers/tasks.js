const mongoose = require('mongoose');
const Task = mongoose.model('Task');

module.exports = {
    index: (req, res) =>{
        console.log("index route");
        console.log(req.method);
        Task.find({}, (err, tasks) =>{
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, tasks: tasks})
            }
        })
    },
    create: (req, res) =>{
        console.log("create route");
        console.log(req.body);
        const task = new Task(req.body);
        task.save((err) => {
            if(err){
                res.json({status: false, error: err});
            }
            else{
                res.json({status: true, task: task});
            }
        })
    },
    show: (req, res) =>{
        console.log("show route");
        console.log(req.method);
        const id = req.params.id;
        Task.findOne({_id:id}, (err, id)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else {
                res.json({status:true, id: id});
            }
        })
    },
    update: (req, res) =>{
        console.log("update route");

        Task.findOneAndUpdate({_id: req.params.id}, {$set: {
            completed: req.body.completed
        }}, (err)=> {
            if(err){
                res.json({status:false, error:err});
            }
            else {
                res.json({status: true});
            }
        })
    },
    destroy: (req, res) =>{
        console.log("destroy route");
        console.log(req.method);
        console.log(req.params);
        const id = req.params.id;
    Task.deleteOne({_id: id}, (err, task)=>{
            if(err){
                res.json({status:false, error:err});
            }
            else{
                res.json({status: true});
            }
        })
    },
}