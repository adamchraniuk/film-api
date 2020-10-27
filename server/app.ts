import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import moviesRouter from './routes/movies'

dotenv.config()
const app = express()

app.set('port', 4000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', moviesRouter)
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('Press CTRL-C to stop\n')
})

export default app
