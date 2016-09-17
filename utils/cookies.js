/**
 * Created by howe on 16/9/17.
 */
exports.parse = function(cookies){
    var result = {};

    cookies.split(';').map(function(kv){
        var pair = kv.trim().split('=')
        result[pair[0]] = pair[1];
    })
    return result;
}
