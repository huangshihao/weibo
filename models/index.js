/**
 * Created by howe on 16/9/10.
 */
const {MongoClient} = require('mongodb');
const UserModel = require('./user');

exports.user = new UserModel()

MongoClient.connect('mongodb://localhost/easysns')
    .then(db => {
        exports.user.init(db.collection('user'))
    })

