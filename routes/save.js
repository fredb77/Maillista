var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var router = express.Router();

// spara emailet till JSON filen
router.post('/', urlencodedParser, function(req, res) {
  
  fs.readFile('email.json', (err, data) => {

      if (err) throw err;

      var email = JSON.parse(data);
          newEmail = {
              "email": req.body.uemail
          }
      
          email.push(newEmail);

      var savedEmail = JSON.stringify(email, null, 2);

      fs.writeFile('email.json', savedEmail, (err, data) => {
          if (err) throw err;
      });

      res.send("E-mail <b>" + req.body.uemail + "</b> sparad...<br/><br/><a href='../'>Tillbaks</a>")

  });   // END fs
  
});   // END router.post

module.exports = router;
