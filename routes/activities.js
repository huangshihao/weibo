/**
 * Created by howe on 2016/10/25.
 */
const router = module.exports = require('koa-router')()
const service = require('../services')

router.get('/',async (ctx) => {
    const page = parseInt(ctx.query.page,10)
    ctx.body = await service.activity.getTimeline(ctx.session.userId, page,3)
})

router.post('/', async (ctx) => {
    const body = ctx.request.body
    const activity = {
        userId:ctx.session.userId,
        content:body.content
    }
    ctx.body = await service.activity.publish(activity)
})