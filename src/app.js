const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('public')))
app.use('/', routes)

// Error handling
app.use((req, res, next) => {
  const err = new Error('Uh oh... Page is mia')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.listen(process.env.PORT || 3000)