/**
 * Created by howe on 16/9/9.
 */
function MemStore(){
    this.map = {}
}

module.exports = MemStore;

MemStore.prototype.set = function(key,val,callback){
    this.map[key] = val
    setImmediate(function(){callback()})
}

MemStore.prototype.get = function(key,callback){
    var val = this.map[key]
    setImmediate(function(){callback(null,val)})
}

MemStore.prototype.delete = function(key,callback){
    delete this.map[key];
    setImmediate(function(){callback()})
}

MemStore.prototype.incr = function(key,callback){
    var self = this;
    setImmediate(function(){
        var val = self.map[key];
        if(val === undefined){
            val = 0
        }
        var num = parseInt(val,10);
        if(Number.isNaN(num)){
            callback(new Error('INCR:Wrong type of value'))
            return
        }
        self.map[key] = ++num;
        callback(null,num);
    })
}