/**
 * Created by howe on 16/9/7.
 */
const fs = require('fs');
const mime = require('mime');
exports.sendFile = function(path,res){
    fs.readFile(path,function(err,data){
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404);
                res.end('Not found');
                return
            }
            res.writeHead(500);
            res.end(err.message)
        }
        var mimeType = mime.lookup(path);
        var charset = mime.charsets.lookup(mimeType);
        res.setHeader('Content-Type',mimeType + (charset?';charset='+charset:''))
        res.end(data);
    })
}