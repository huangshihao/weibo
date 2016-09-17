/**
 * Created by howe on 16/9/8.
 */
const qs = require('querystring');
var parseBody = require('../utils/parseBody');
var send = require('../utils/send');
const models = require('../models');
const crypto = require('crypto');

function generateToken(userId,callback){
    var token = crypto.randomBytes(16).toString('hex')
    models.token.update(token,userId,function(err){
        if(err){
            return callback(err)
        }
        callback(null,token);
    })
}

function doLogin(userId, res){
    generateToken(userId,function(err, token){

        if(err){
            return send.sendError(err,res)
        }

        res.writeHead(302,{
            location:'/',
            'Set-Cookie':'token=' + token + '; path=/; HttpOnly'
        })
        res.end()
    });
}


exports.register = function(req, res){
    parseBody(req,function(err,body){
        if(err) send.sendError(err);
        var user = {
            email:body.email,
            password:body.password,
            nickname:body.nickname
        };
        models.user.create(user,function(err){
            if(err){
                send.sendError(err)
            }
            doLogin(user.id,res);

        });
        //save(user)
    })
}

exports.login = function(req, res){
    parseBody(req,function(err,body) {
        if (err) send.sendError(err);
        models.user.getByEmail(body.email, function (err, user) {
            if (err) {
                send.sendError(err)
            }
            if (!user) {
                send.redirect('/?err=no_user', res)
            }
            if (body.password !== user.password) {
                return send.redirect('./err=invalid_pass', res)
            }
            doLogin(user.id, res);
        })
    })
}