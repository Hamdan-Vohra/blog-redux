const express = require('express');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogs')

const app = express();

const dataBaseURL = '';

mongoose.connect(dataBaseURL)
    .then(()=>{
        console.log('connected to database successfully');
    })
    .catch(err=>console.log(err));


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Handling CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')// '*' is to allow for all route we can specify the route
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT POST GET PATCH DELETE')//all http methods you use in your api for routing
        return res.status(200).json({})
    }
    //if we don't encounter in if condition then no return statement runs so next() is called
    next();
})



app.use('/blogs', blogRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err);
});

//This handler is for any error occured while acessing database, it will run just after above error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        err: {
            message: err.message
        }
    });
});

module.exports = app;