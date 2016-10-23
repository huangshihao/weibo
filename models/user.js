/**
 * Created by howe on 16/9/9.
 */
var BaseModel = require('./base');
const PREFIX_EMAIL_TO_ID = 'email-id:';


class UserModel extends BaseModel{
    constructor(store){
        super(store,'user:')
    }
    create(obj){
        return super.create(obj).then((id) => {
            return this.store.set(PREFIX_EMAIL_TO_ID + obj.email, id).then(() => id)
        })
    }
    async getByEmail(email){
        const id = await this.store.get(PREFIX_EMAIL_TO_ID + email)
        return await this.get(id)
    }
}



module.exports = UserModel;


Object.assign(UserModel.prototype,BaseModel.prototype,{
    create:function(obj,callback){
        const self = this;
        BaseModel.prototype.create.call(self,obj,function(err,result){
            if(err){
                return callback(err);
            }
            if(obj.email){
                self.store.set(PREFIX_EMAIL_TO_ID+obj.email,obj.id,callback)
                return
            }
            callback(err,result);
        })
    },
    getByEmail:function(email,callback){
        const self = this;
        this.store.get(PREFIX_EMAIL_TO_ID+email,function(err,id){
            if(err){
                return callback(err)
            }
            self.store.get(self.prefix + id,callback)
        })
    }
})