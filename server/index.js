require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const massive = require('massive')

const ctrl = require('./controllers')

const app = express()

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET
} = process.env

app.use(express.json());
app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))

massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
        console.log('Database Connected! 👻')
    })
    .catch(error => {
        console.log(error)
    })


//Auth Endpoints
app.post('/auth', ctrl.register)
app.post('/auth/login', ctrl.login)



app.listen(SERVER_PORT, () => {
    console.log('Server running! 👾')
})