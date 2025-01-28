const express = require('express');
const {config} = require('dotenv');
const connectDB = require('./database/db');
const path = require('path');

const bookRoutes = require('./routes/bookmarkRoute')
//loading enviroment variables
config();
//connect to the database
connectDB();
//create instanse of the express
const app = express();
//creating port variable
const PORT = process.env.PORT || 4141;

app.use(express.json());
app.use(express.static(path.join(__dirname , 'views')));

app.use('/' , bookRoutes);



app.get('/books' , (req , res) =>{
    res.sendFile(path.join(__dirname , '.' , 'views' , 'bookmark.html'));
})

app.listen(PORT , () =>{
    console.log(`server running at this ${PORT} ports`);
})






