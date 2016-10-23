/**
 * Created by howe on 2016/10/23.
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const mount = require('koa-mount')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const router = require('./routes').router


//middlewares
app.use(logger())

app.use(async (ctx,next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms `)
})

app.use(mount('/static',require('koa-static')(__dirname + '/public')))
app.use(bodyparser())
app.use(json())

app.use(views(__dirname + '/views',{
    extension:'html'
}))

app.use(router.routes(),router.allowedMethods())

app.on('err',(err,ctx) => {
    console.log(err)
    logger.error('server error',err,ctx)
})

app.listen(3000)

module.exports = app;