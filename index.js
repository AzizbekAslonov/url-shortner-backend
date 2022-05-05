const express = require('express')
const cors = require('cors')

const errorHandler = require('./middlewares/errorMidleware')
const { sequelize } = require('./db')
const helmet = require('helmet')
require('./models')

const app = express()
app.use(express.json())
app.use(cors({
   origin: "https://url-shortner-rose.vercel.app"
}))
app.use(helmet({
   contentSecurityPolicy: false,
}))

// Routes
app.use('/user', require('./routes/user.route'))
app.use('/url', require('./routes/url.route'))
app.use('/t', require('./routes/to.route'))
// errror middleware
app.use(errorHandler)

const start = async () => {
   try {
      await sequelize.authenticate()
      await sequelize.sync()

      const PORT = process.env.PORT || 5000
      app.listen(PORT)
      console.log('Connection has been established successfully:', PORT)
   } catch (e) {
      console.log(e)
      process.exit(1)
   }
}

start()