var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(function(req, res, next){
  console.log (req.method + " " + req.path + " - " + req.ip);
  next();
})

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next){
  console.log(req.file.originalname);
  console.log(req.file.mimetype);
  console.log(req.size);
  next();
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
