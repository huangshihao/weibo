/**
 * Created by howe on 16/9/8.
 */
var getRawBody = require('./getRawBody');
const qs = require('querystring')
module.exports = function(req,callback){
        getRawBody(req,function(err,rawBody){
            if(err){
                callback(err)
            }
            var type = req.headers['content-type'] || '';
            type = type.split(';')[0];
            if(type === 'application/x-www-form-urlencoded'){
                var body = qs.parse(rawBody)
                callback(null,body);
                return
            }
            callback()
        })
}