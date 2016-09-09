/**
 * Created by howe on 16/9/9.
 */
const assert = require('assert');
const MemStore = require('../../store/memstore');
const BaseModel = require('../../models/base');
const runner = require('../runner');

const store = new MemStore();
const model = new BaseModel(store,'base:')
const obj = {foo:'bar'};

describe('BaseModel',function(){
    it('should create without err',testCreate)
    it('should get by id',testGet)
    it('should get nothing after delete',testDel)
})


function testCreate(done){
    model.create(obj,function(err){
        assert(!err)
        assert(obj.id)
        done()
    })
}

function testGet(done){
    model.get(obj.id,function(err, result){
        assert(!err)
        assert(obj.foo,'bar')
        done()
    })
}

function testDel(done){
    model.del(obj.id,function(err){
        assert(!err)
        model.get(obj.id,function(err,result){
            assert(!err)
            assert(!result)
            done()
        })
    })
}