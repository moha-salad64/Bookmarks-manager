const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookmarkController');

//creating user
router.post('/api/book', bookController.createBook);
//get all books
router.get('/api/book' , bookController.getBooks);
//update book
router.put('/api/book/:id' , bookController.updateBook);
//delete book
router.delete('/api/book/:id' , bookController.deleteBook);




module.exports = router;


