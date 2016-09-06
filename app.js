/**
 * Created by howe on 16/9/6.
 */
var http =  require('http');
var parseUrl = require('url').parse;
var controllers = require('./controllers');

const rules = [
    {path:'/',controller:controllers.home},
    {path:'/user',controller:controllers.user},
    {path:/^\/static(\/.*)/, controller:controllers.static}
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
        if(rule.path instanceof RegExp){
            return urlInfo.pathname.match(rule.path)
        }
        return rule.path == urlInfo.pathname
    })
    var controller = rule && rule.controller || notFoundController
        controller(req,res)

});
server.listen(3000);