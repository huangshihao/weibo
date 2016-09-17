/**
 * Created by howe on 16/9/6.
 */
const send = require('../utils/send');
const models = require('../models');
const multiparty = require('multiparty');
const joinPath = require('path').join;

exports.user = function(req, res){

        models.user.get(req.userId,function(err,user){
            if(err){
                send.sendError(err,res)
            }
            res.end(JSON.stringify(user))
        })
}
const uploadPath = joinPath(__dirname,'../data/upload');
exports.myavatar = function(req, res){
    if(!req.userId){
        return send.sendError(new Error('not_login'),res)
    }
    var form = new multiparty.Form({
        uploadDir:uploadPath
    })
    form.parse(req,function(err,fields,files){
        if(err){
            return send.sendError(err)
        }
        var newPath = files.file[0].path.replace(uploadPath,'');
        var url = 'http://localhost:3000/upload/' + newPath

        models.user.updatePart(req.userId,{avatar:url},function(err,info){
            if(err){
                return send.sendError(err)
            }
            res.end(JSON.stringify({
                avatar:url
            }))
        })
    })
}