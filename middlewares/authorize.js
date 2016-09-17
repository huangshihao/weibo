/**
 * Created by howe on 16/9/17.
 */
const cookies = require('../utils/cookies');
const models = require('../models');
const send = require('../utils/send');

function getLoginUserId(req,callback){
    var c = cookies.parse(req.headers.cookie || '');
    if(!c.token){
        return callback()
    }
    models.token.get(c.token,callback)
}

module.exports = function(controller){
    return function (req,res){
        getLoginUserId(req,function(err,userId){
            if(err){
                return send.sendError(err,res)
            }
            req.userId = userId
            controller(req,res)
        })
    }
}