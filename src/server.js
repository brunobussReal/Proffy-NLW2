const {  pageGiveClasses, pageLanding, pageStudy, saveClasses } = require('./pages')

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
//dados do req.body
.use(express.urlencoded({extended: true}))
.use(express.static("public"))

//urls
.get("", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

.listen(5500)