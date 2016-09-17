/**
 * Created by howe on 16/9/6.
 */
const sendFile = require('../utils/send').sendFile;
const joinPath = require('path').join
const publicPath = joinPath(__dirname,'../public');
const uploadPath = joinPath(__dirname,'../data/upload');
var exports = module.exports = function(req, res){
    var path = req.params[1];
    path = joinPath(publicPath,path);
    sendFile(path,res);

}

exports.upload = function(req, res){
    var path = req.params[1];
    path = joinPath(uploadPath,path);
    sendFile(path,res);
}