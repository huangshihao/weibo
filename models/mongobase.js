/**
 * Created by howe on 2016/10/23.
 */
const {ObjectID} = require('mongodb')

class MongoBaseModel {
    init(collection){
        this.collection = collection
    }
    toId(id){
        if(id instanceof ObjectID){
            return id
        }
        return new ObjectID(id)
    }
    async create (obj){
        const insertResult = await this.collection.insertOne(obj)
        return insertResult && insertResult.insertedId
    }
    get (id){
        return this.collection.findOne({_id:this.toId(id)})
    }
    update(id,obj){
        return this.collection.updateOne({_id:this.toId(id)},obj)
    }
    updatePart(id, part){
        return this.collection.updateOne({_id:this.toId(id)},{$set:part})
    }
    del(id){
        return this.collection.deleteOne({_id:this.toId(id)})
    }
    deleteMany(query={}){
        return this.collection.deleteMany(query)
    }
    find(query={},sort={},limit=100){
        return this.collection.find(query).sort(sort).limit(limit)
    }
    findBefore(before){
        return this.find({_id:{$lt:this.toId(before)}},{_id:-1})
    }
    findSince(since){
        return this.find({_id:{$gt:this.toId(since)}},{id:1})
    }

}
module.exports = MongoBaseModel