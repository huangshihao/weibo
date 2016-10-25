/**
 * Created by howe on 16/9/10.
 */
const {MongoClient} = require('mongodb');
const redis = require('redis')
const redisWrapper = require('co-redis')

const redisClient = redis.createClient('redis://localhost:6379')
const redisCo = redisWrapper(redisClient)


const UserModel = require('./user');
const ActivityModel = require('./activity')
const TimelineModel = require('./timeline')
const RelationModel = require('./relation')

exports.user = new UserModel()
exports.relation = new RelationModel(redisCo)
exports.activity = new ActivityModel()
exports.timeline = new TimelineModel(redisCo)

MongoClient.connect('mongodb://localhost/easysns')
    .then(db => {
        exports.user.init(db.collection('user'))
        exports.activity.init(db.collection('activity'))

    })

