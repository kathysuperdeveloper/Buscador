var path = require('path')
var express = require('express')
var $ = require("jquery");

var app = express()
var PORT = 3000

var viewsPath = path.join(__dirname, '../')+'public/'
app.use(express.static('public'))


app.listen(PORT, function() {
  console.log('Server is listeng on port: ' + PORT)
})
