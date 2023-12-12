/*
 * @Date: 2023-12-11 23:38:05
 * @LastEditors: czzou
 * @LastEditTime: 2023-12-11 23:46:18
 * @FilePath: /opentelemetry/opentelemetry-js/guide/03.automatic/app.js
 */
const Koa = require('koa');
const router = require('@koa/router')();

const app = module.exports = new Koa();


router.get('/test1', (ctx) => [
    ctx.body = 'test1'
])

router.get('/test2', (ctx) => [
    ctx.body = 'test2'
])

app.use(router.routes());

app.listen(3000);