var util = module.exports = {
  scanDir: scanDir,
  isFile: isFile,
  isDir: isDir
}

var fs = require('fs');
var path = require('path')

function scanDir(mPath) {
  var result = []
  var files = fs.readdirSync(mPath)
  for (var i in files) {
    var cPath = mPath + '/' + files[i]
    var stats = fs.statSync(cPath)
    if (stats.isFile()) {
      result.push({type: 'file', path: mPath, name: files[i], extname: path.extname(files[i]), size: stats.size , atimeMs: new Date(stats.atimeMs).toString(), mtimeMs: new Date(stats.mtimeMs).toString(), ctimeMs: new Date(stats.ctimeMs).toString(), birthtimeMs: new Date(stats.birthtimeMs).toString()})
    }
    else if (stats.isDirectory()) {
      result.push({type: 'dir', path: mPath, name: files[i], atimeMs: new Date(stats.atimeMs).toString(), mtimeMs: new Date(stats.mtimeMs).toString(), ctimeMs: new Date(stats.ctimeMs).toString(), birthtimeMs: new Date(stats.birthtimeMs).toString()})
    }
  }
  return result
}

function isFile(mPath) {
  var stats = fs.statSync(mPath)
  if (stats.isFile()) {
    return true
  }
  return false
}

function isDir(mPath) {
  var stats = fs.statSync(mPath)
  if (stats.isDirectory()) {
    return true
  }
  return false
}

