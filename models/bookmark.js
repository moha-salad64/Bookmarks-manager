const mongoose = require('mongoose');

//creating schema

const BookSchema = new mongoose.Schema({
    bookName:{
        type:String ,
        required:true
        },
    authorName:{
        type:String ,
        required:true
        },
    description:{
        type:String ,
        required:true
    },
    date:{
        type:Date ,
        required:true
    }
})

module.exports  = mongoose.model('bookmarks' , BookSchema);
// module.exports = BookMarks;