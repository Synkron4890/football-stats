var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var js2xmlparser = require("js2xmlparser");
var xslt = require('node_xslt');

var router = express();
var router = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

