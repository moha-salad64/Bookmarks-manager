const express = require('express');
const {config} = require('dotenv');
const connectDB = require('./database/db');

//loading enviroment variables
config();

//connect to the database
connectDB();

//create instanse of the express
const app = express();

//create port variable
const PORT = process.env.PORT || 4141;

app.use(express.json());

//importing the routes
const bookRoutes = require("./routes/bookmarkRoute");

// app.get('/api/books' , (req , res) =>{
//     res.sendFile('./views/bookmark.html', {root: __dirname});
// })


app.use('/api/books' , bookRoutes)

app.listen(PORT , () =>{
    console.log(`server running at this ${PORT} ports`);
})






