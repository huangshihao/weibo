/**
 * Created by howe on 16/9/10.
 */
const MemStore = require('../store/memstore');
const BaseModel = require('./base');
const UserModel = require('./user');

const memStore = new MemStore();

exports.user = new UserModel(memStore);
exports.token = new BaseModel(memStore,'token:')