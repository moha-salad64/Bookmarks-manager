const mongoose = require('mongoose');

//creating schema

const BookSchema = new mongoose.Schema({
    bookName:{
        type:String ,
        require:true
        },
    autherName:{
        type:String ,
        require:true
        },
    description:{
        type:String ,
        require:true
    },
    date:{
        type:Date ,
        require:false
    }
})

const BookMarks = mongoose.model('BookMarks' , BookSchema);
module.exports = BookMarks;