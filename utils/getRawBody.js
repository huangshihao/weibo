/**
 * Created by howe on 16/9/8.
 */
module.exports = function(stream, callback){
    var buffers = []
    stream.on('data',function(data){
        buffers.push(data);
    })
    stream.on('end',function(){
        var data = Buffer.concat(buffers).toString('utf8')
        callback(null, data)
    })
    stream.on('err',function(err){
        callback(err)
    })
}