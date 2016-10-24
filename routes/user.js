/**
 * Created by howe on 2016/10/24.
 */
const models = require('../models')
const router = module.exports =  require('koa-router')()

router.get('/', async (ctx) => {
    const userId = ctx.session.userId
    console.log(userId)
    const user = await models.user.get(userId)
    ctx.body = user || {}
})