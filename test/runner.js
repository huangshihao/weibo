/**
 * Created by howe on 16/9/9.
 */
module.exports = function(fns,done){
    var index = 0;
    function next(err){
        if(err){
            return done(err)
        }
        if(index >= fns.length){
            return done();
        }
        console.log('index',index,fns[index].name);
        fns[index++](next)
    }
    next()
}