const express = require('express');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));


app.use('/', require('./routes/index'));
app.listen(port,function(err){
    if(err)
    {  
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})