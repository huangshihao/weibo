/**
 * Created by howe on 16/9/17.
 */
module.exports = function(req, res){
    console.log('cookie',req.headers.cookie)
    res.writeHead(200,{
        'Set-Cookie':'foo=bar; HttpOnly'
    })
    res.end()
}