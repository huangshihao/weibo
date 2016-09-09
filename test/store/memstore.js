/**
 * Created by howe on 16/9/9.
 */
const assert = require('assert');
const runner = require('../runner');
const MemStore = require('../../store/memstore');

var memStore = new MemStore();

describe('MemStore',function(){
    it('could set',testSet)
    it('could get',testGet)
    it('could incr',testIncr)
    it('could delete',testDelete)
})

function testSet(done){
    memStore.set('foo','bar',function(err){
        assert(!err,'should save without error')
        done()
    })
}
function testGet(done){
    memStore.get('foo',function(err,result){
        assert(!err,'should save without error')
        assert.equal(result,'bar')
        done()
    })
}

function testIncr(done){
    memStore.incr('id',function(err,result){
        assert(!err,'should save without error')
        assert(result,1)
        memStore.incr('id',function(err,result){
            assert(!err,'should save without error')
            assert.equal(result,2);
            done();

        })

    })
}

function testDelete(done){
    memStore.delete('foo',function(err){
        assert(!err,'should save without error')
        memStore.get('foo',function(err,result){
            assert(!err,'should save without error')
            assert.equal(null,result)
            done();
        })
    })
}