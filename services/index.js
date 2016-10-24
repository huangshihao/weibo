/**
 * Created by howe on 2016/10/25.
 */
const models = require('../models')
const UserService = require('./user')
const ActivityService = require('./activity')

exports.user = new UserService(models.user, models.relation)
exports.activity = new ActivityService(models.activity, exports.user,models.relation, models.timeline)