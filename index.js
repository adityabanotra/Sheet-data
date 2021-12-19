const express = require('express');

const port = process.env.PORT||3000;

const app = express();

//setting up view engine
app.set('view engine', 'ejs');

//using ulrencoded middleware
app.use(express.urlencoded({extended:true}));

//setting static path to assets
app.use(express.static('./assets'));

//Using routes and controllers for all the further operations
app.use('/', require('./routes/index'));


app.listen(port,function(err){
    if(err)
    {  
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})