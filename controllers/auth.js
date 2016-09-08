/**
 * Created by howe on 16/9/8.
 */
const qs = require('querystring');
var parseBody = require('../utils/parseBody');
var send = require('../utils/send');
exports.register = function(req, res){
    parseBody(req,function(err,body){
        if(err) send.sendError(err);
        var user = {
            email:body.email,
            password:body.password,
            nickname:body.nickname
        }
        //save(user)
        send.redirect('/',res);
    })
}

exports.login = function(req, res){
    parseBody(req,function(err,body){
        if(err) send.sendError(err);

        var login = {
            email:body.email,
            password:body.password
        }
        //save(user)
        send.redirect('/',res);
    })
}