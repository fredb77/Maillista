var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var router = express.Router();

// hämtar värdet från formen och kollar om användarnamn och lösen stämmer
router.post('/', urlencodedParser, function (req, res){

    var username = req.body.uname;
    var password = req.body.pword;

    if (username === 'admin' && password === 'test'){

        fs.readFile('email.json', (err,data) => {

            if(err) throw err;

            var emails = JSON.parse(data);
            var html = '';
            
            html += "<h1>Välkommen " + username + "</h1><br/>";
            html += "<b>Sparade e-mail adresser:</b><br/><br/>";
            
            for(i = 0; i < emails.length; i++){
                html += emails[i].email + "<br/>";
            }
            
            html += "<br/><br/><hr/><a href='../'>Logga ut</a>"

            res.send(html);
        
        }); // END readFile
      
    }else {
        var html = '';
        html += "Fel användarnamn eller lösenord!<br/><br/>";
        html += "<a href='/admin'>Försök igen</a>";
        res.send(html);
    }
    
  });   // END router.post

module.exports = router;
