var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var xslt = require('node_xslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /client folder
router.get('/', function(req, res) {
  res.render('index');
});

// GET request to send back JSON file
router.get('/get/json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var obj = JSON.parse(fs.readFileSync('playerActivity.json', 'utf8'));
  console.log("test");
  res.end(JSON.stringify(obj));
});

//HTML Produced by XSL Transformation
router.get('/Players.html', function(req, res){
  
  //Read XML and XSL files
  var stylesheet=xslt.readXsltFile('Players.xsl');
  var doc=xslt.readXmlFile('Players.xml');
  
  //Transformation
  var result=xslt.transform(stylesheet, doc, []);
  
  //Creating the result
  res.send(result);
  
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});