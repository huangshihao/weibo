/**
 * Created by howe on 16/9/6.
 */
var http = require('http');
var parseUrl = require('url').parse;
var controllers = require('./controllers');
const authorize = require('./middlewares/authorize');

const rules = [
    {path:'/',controller:controllers.home},
    {path:'/play',controller:controllers.play},
    {path:'/user',controller:controllers.user.user},
    {path:'/my/avatar',controller:controllers.user.myavatar},
    {path:'/auth/register',controller:controllers.auth.register,method:'post'},
    {path:'/auth/login',controller:controllers.auth.login,method:'post'},
    {path:/^\/static(\/.*)/, controller:controllers.static},
    {path:/^\/upload(\/.*)/, controller:controllers.static.upload}
];

function notFoundController(req, res){
    res.writeHead(404)
    res.end('not found')
}

function find(ary,match){
    for (var i = 0;i<ary.length;i++){
        if(match(ary[i])) return ary[i];
    }
}

var server = http.createServer(function(req,res){
    var urlInfo = parseUrl(req.url);
    var rule = find(rules,function(rule){
        if(rule.method){
            if(rule.method.toLowerCase() !== req.method.toLowerCase()){
                return false;
            }
        }
        if(rule.path instanceof RegExp){
            var matchResult = urlInfo.pathname.match(rule.path)
            if(matchResult){
                req.params = matchResult;
            }
            return matchResult;
        }
        return rule.path == urlInfo.pathname
    })
    var controller = rule && rule.controller || notFoundController
    authorize(controller)(req,res)

});
server.listen(3000);