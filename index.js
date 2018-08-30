var express = require('express');
var fs = require('fs');
var os = require('os');
var app = express();
var util = require('./utils/util')

app.get('/',function(req,res){
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log('Request from ' + ip + ' for home dir ' + 'path: ' + os.homedir());
 
  res.json(util.scanDir(os.homedir()))
  res.end()
});

app.get('/dir', function(req,res){	
  var id = req.query.id
  var path = req.query.path
  var loc = path + '/' + id
  
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log('Request from ' + ip + ' for ' + id + ' from dir '  + path);
 
  fs.exists(loc,function(exists) {
    if(exists && util.isDir(loc)) {
      res.json(util.scanDir(loc))
      res.end()
    } else {
      res.send("Its a 404")
      res.end()
    }
  })
})

app.get('/file', function(req,res){
  // File to be served
	
  var id = req.query.id
  var path = req.query.path
  var loc = path + '/' + id
  console.log('File: ' + loc);
  fs.exists(loc,function(exists) {
    if(exists && util.isFile(loc)) {
      var rs = fs.createReadStream(loc);
      rs.pipe(res);
    } else {
      res.send("Its a 404");
      res.end();
    }
  });	
});

app.get('/download', function(req,res){
  var id = req.query.id
  var path = req.query.path
  var loc = path + '/' + id
  
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  console.log('Request from ' + ip + ' for ' + id + ' to download from dir '  + path);
  
  fs.exists(loc,function(exists) {
    if(exists && util.isFile(loc)) {
      res.setHeader('Content-disposition', 'attachment; filename=' + id);
      res.setHeader('Content-Type', 'application/audio/mpeg3')
      var rs = fs.createReadStream(loc);
      rs.pipe(res);
    } else {
      res.send("Its a 404");
      res.end();
    }
  });	
});


app.listen(3003,function(){
	console.log('App listening on port 3003!');
});
