
var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT;

app.use(express.json());

app.use('/users',require('./api/user.api'));

app.use('/messages',require('./api/message.api'));
app.get('/',(req,res)=>{
    res.json({message:'welcome'});
})
mongoose.connect("mongodb+srv://tariq:tariq55@cluster0.2jih4ni.mongodb.net/saraha");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));