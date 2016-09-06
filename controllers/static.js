/**
 * Created by howe on 16/9/6.
 */
const sendFile = require('../utils/send').sendFile;
const joinPath = require('path').join
const publicPath = joinPath(__dirname,'../public');
module.exports = function(req, res){
    var path = req.params[1];
    path = joinPath(publicPath,path);
    sendFile(path,res);

}