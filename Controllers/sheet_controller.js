var {google} = require('GoogleApis');

module.exports.home = function(req,res){
    return res.render('home',{
        title: 'Home'
    });
}  


module.exports.retrieve =  async function(req,res){

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

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1!A1:C9",
      });
    
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

    const spreadsheetId = '1A8ZsHMNnxIwvm0B6apgR4SakCpRqyJIokBUcJGZFTXU';
    //get metadata about spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId, 
    });
    var id = Math.floor(Math.random() * 100001);;
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[id, req.body.name, req.body.score]],
        },
      });

      return res.redirect('back');

};