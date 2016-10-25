/**
 * Created by howe on 2016/10/25.
 */
const MongoBaseMOodel = require('./mongobase')
class ActivityModel extends MongoBaseMOodel{
    init (collection){
        this.collection = collection
        this.collection.createIndex({userId:-1}).then()
    }
    findByAuthor (userId, skip = 0, limit = 100){
        return this.find({userId:this.toId(userId)}, {_id:-1}, limit).skip(skip)
    }
}

module.exports = ActivityModel