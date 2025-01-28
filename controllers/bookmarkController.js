const BookMarks = require('../models/bookmark');

exports.createBook = async (req , res) =>{
    try {
        const {bookName , authorName , description , date} = req.body;
        const newBook = new BookMarks({bookName , authorName , description , date});
        await newBook.save();
        res.status(200).json({message: 'Insertion book successfully'});
    } catch (error) {
        console.log('creating book error' , error)
        res.status(500).json('invalid book insetion!');
    }
}
exports.getBooks = async (req , res) =>{
    try{
      const books = await BookMarks.find();
      res.status(200).json(books); 
    }catch(error){
        console.log('retraving book error', error)
        res.status(500).send('book can not find');
    }
}

exports.updateBook = async (req , res) =>{
    try {
        const {bookID} = req.params;
        const updatedData = req.body;
        bookUpdated = await BookMarks.findOneAndUpdate(
            bookID,
            updatedData
        );
        if(!bookUpdated){
            return res.status(404).json({
                message: "book can not found"
            });
        }
        res.json({
            message: 'book updated successfully' , book: bookUpdated
        });
    } catch (error) {
        console.log('updating book error' , error)
        res.json(({
            message:'book updated error'
        }))
    }
}

exports.deleteBook = async (req , res) =>{
    try{
        const  {id} = req.params;
        const bookDeleted =await BookMarks.findOneAndDelete(id);
        if(!bookDeleted){
            return res.status(404).json({
                message: 'book was not deleted'
            });
        }
        else{
            res.json({
                message: 'book deleted was successfully' ,
                 book: bookDeleted
            })
        }
    }catch(error){
        console.log('deleting book error' , error);
        res.status(500).json({
            message: 'deleted book error'
        })
    }
}
