/**
 * Created by howe on 16/9/9.
 */
const assert = require('assert');
const runner = require('../runner')
const MemStore = require('../../store/memstore');
const UserModel = require('../../models/user')

const store = new MemStore()
const model = new UserModel(store)

describe('UserModel',function(){
    it('用户通过邮编创建获取用户信息',testEmail)
})

function testEmail(done){
    const testUser = {
        email:'tom@tst.com',
        nickname:'Tom',
        password:'1234'
    }
    model.create(testUser,function(err){
        assert(!err);
        model.getByEmail('tom@tst.com',function(err,user){
            assert(!err)
            assert(testUser.email,user.email)
            assert(testUser.nickname,user.nickname)
            assert(testUser.password,user.password)
            done()
        })
    })
}