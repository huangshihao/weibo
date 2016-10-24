/**
 * Created by howe on 2016/10/23.
 */
const router = require('koa-router')()
const Auth = require('./auth')
const User = require('./user')

exports.router = router

router.use('/auth',Auth.routes(),Auth.allowedMethods())
router.use('/user',User.routes(),User.allowedMethods())



router.get('/',async (ctx) => {
    const isLogin = !!ctx.session.userId
    await ctx.render(isLogin? 'home':'welcome')
})

router.post('/my/avatar', require('./upload'))

router.post('/test',async (ctx) => {
    ctx.body = {
        foo:'bar',
        headers: ctx.headers,
        postBody: ctx.request.body
    }
})

router.get('/session/get', async (ctx) => {
    ctx.body = ctx.session
})

router.get('/session/set', async (ctx) => {
    ctx.session.foo = 'bar'
    ctx.session.time = Date.now()
    ctx.body = ctx.session
})

router.get('/session/reset', async (ctx) => {
    ctx.session = null
    ctx.body = 'reseted'
})