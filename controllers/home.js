/**
 * Created by howe on 16/9/6.
 */
const sendFile = require('../utils/send').sendFile;
const joinPath = require('path').join;
const viewPath = joinPath(__dirname,'../views');
module.exports = function(req,res){

    var isLogin = true;
    var view = isLogin?'home.html':'welcome.html';
    sendFile(joinPath(viewPath,view),res);
}