// Server
const express = require('express')
const server = express()

const  {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')


// nunjucks config (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Server config
server
// get req.body data
.use(express.urlencoded({ extended: true }))
// static files congig (css, scripts, imagens)
.use(express.static("public"))
// app urls
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
// server start
.listen(5500)