var {google} = require('GoogleApis');

//rendring home page
module.exports.home = function(req,res){
  return res.render('home',{
      title: 'Home'
  });
}  


module.exports.retrieve =  async function(req,res){

  //setting up google authentication
  const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
  //created client instance for the authentication 
  const client = await auth.getClient();

  //Google sheets Api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Id of the spreadsheet (Can be found from url)
  const spreadsheetId = '1A8ZsHMNnxIwvm0B6apgR4SakCpRqyJIokBUcJGZFTXU';
  
  //getting data of the sheet 
  const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!B:C",
    });

  //rendering rows data to views
  return res.render('retrieve',{
      title: 'Retrieve',
      data:getRows.data.values,
  })
      

};

module.exports.add =  async function(req,res){
  // console.log(req.body);
  const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
  //created client instance for the authentication 
  const client = await auth.getClient();

  //Google sheets Api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Id of the spreadsheet (Can be found from url)
  const spreadsheetId = '1A8ZsHMNnxIwvm0B6apgR4SakCpRqyJIokBUcJGZFTXU';

  // creating a temporary ID 
  var id = Math.floor(Math.random() * 100001);

  //appending data to the sheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[id, req.body.name, req.body.score]],
    },
    });

    return res.redirect('/');

};