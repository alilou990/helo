require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require(cors)
const massive = require('massive')

const app = express()

app.use(express.json());
app.use(cors());
app.use(session(
    
))