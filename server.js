  
var app = require('express')();
var http  = require('http').Server(app);
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var mailOptions = {
  from: 'bilgebatman19@gmail.com',
  to: 'caglaraktas@msn.com',
  subject: '',
  text: ''
};


app.get('/iletisim', function (req, res) {
  res.sendfile(__dirname + '/iletisim.html');
});

app.post('/iletisim',function(req,res){
  if(req.body.title != "" && req.body.message != "")
  {
    mailOptions.subject = req.body.title;
    mailOptions.text = req.body.message;
    SendEMail(mailOptions);
  }
 
  console.log(req.body.title + " " + req.body.message);

  res.sendfile(__dirname + '/iletisim.html');
})


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bilgebatman19@gmail.com',
      pass: 'Superman!35'
    }
  });
  

  function SendEMail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }


  http.listen(8080, function(){
    console.log('listening on *:3001');
  });

