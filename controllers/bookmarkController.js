const BookMarks = require('../models/bookmark');

exports.getBooks = async (req , res , next) =>{
    try {
        const books = await BookMarks.find({});
        res.json(books)
        // res.status(200).json({
        //     success:true,
        //     message: "Getting books successfully",
        //     data: books
        // })
        
    } catch (error) {
        next(error)
    }
}


exports.createBook = async (req , res , next) =>{
    try{
        const {bookName ,   autherName , description , date} = req.body;
        const books = new  BookMarks({
            bookName, 
            autherName,
            description, 
            date,
        });
        await books.save();
        res.status(200).json(books)
    }catch(error){
        next(error)
    }
}

exports.updateBook = async (req , res , next) =>{
    try {
        const books = await BookMarks.findByIdAndUpdate(req.params.id , req.body , {new: true});
        res.status(200).json({
        success:true,
        message: "Book updated successfully",
        data: books
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteBook = async (req , res) =>{
    try{
        const books = await BookMarks.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"book deleted successfully",
            data: books
        })
    }catch(error){
        next(error);
    }
}
