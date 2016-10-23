/**
 * Created by howe on 16/9/9.
 */
const expect = require('chai').expect;
const {MongoClient} = require('mongodb')
const UserModel = require('../../models/user')

const model = new UserModel()

describe('UserModel',() => {
    before(async () => {
        const db = await MongoClient.connect('mongodb://localhost/testdb')
        model.init(db.collection('user'))
    })
    it('用户通过邮编创建获取用户信息',async () => {
        const testUser = {
            email:'tom@qq.com',
            nickname:'Tom',
            password:'1234'
        }
        const id = await model.create(testUser)
        const user  = await model.getByEmail('tom@qq.com')
        expect(user.email).to.be.equal(testUser.email)
        expect(user.nickname).to.be.equal(testUser.nickname)
        expect(user.password).to.be.equal(testUser.password)
    })
    it('相同的邮箱不能保存两次',async () => {
        try{
            const testUser = {
                email:'tom@tst.com',
                nickname:'Tom',
                password:'1234'
            }
            await model.create(testUser)
            await model.create(testUser)
        }catch (e){
            return
        }
        expect.fail()
    })
})
