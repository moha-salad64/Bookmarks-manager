const express = require('express');

const router = express.Router();

const {getBooks , createBook , updateBook , deleteBook} = require('../controllers/bookmarkController');

//creat rout directory
router.get('/' , getBooks);
router.post('/' , createBook);
router.patch('/:id' , updateBook);
router.delete('/:id' , deleteBook);

module.exports = router;


