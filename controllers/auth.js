/**
 * Created by howe on 16/9/8.
 */
const qs = require('querystring');
var parseBody = require('../utils/parseBody');
var send = require('../utils/send');
const models = require('../models');
exports.register = function(req, res){
    parseBody(req,function(err,body){
        if(err) send.sendError(err);
        var user = {
            email:body.email,
            password:body.password,
            nickname:body.nickname
        };
        models.user.save(user,function(err){
            if(err){
                send.sendError(err)
            }
            send.redirect('/',res);

        });
        //save(user)
    })
}

exports.login = function(req, res){
    parseBody(req,function(err,body){
        if(err) send.sendError(err);
        models.user.getByEmail(body.email,function(err,user){
            if(err){
                send.sendError(err)
            }
            if(!user){
                send.redirect('/?err=no_user',res)
            }
            if(body.password !== user.password){
                return send.redirect('./err=invalid_pass',res)
            }
            //login
            send.redirect('/',res)
        })
        //save(user)
        send.redirect('/',res);
    })
}