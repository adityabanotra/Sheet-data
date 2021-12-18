const express = require('express');
var {google} = require('GoogleApis');
const port = 3000;

const app = express();

app.get('/', async function(req,res){

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
      });
    
    //created client instance for the authentication 
    const client = await auth.getClient();

    //Google sheets Api
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = '1A8ZsHMNnxIwvm0B6apgR4SakCpRqyJIokBUcJGZFTXU';
    //get metadata about spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId, 
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
res.write(JSON.stringify(metaData.data));
res.end();


});
app.listen(port,function(err){
    if(err)
    {
        console.log('ERROR!!!',err);
    }

    console.log('server running on port:',port);
})