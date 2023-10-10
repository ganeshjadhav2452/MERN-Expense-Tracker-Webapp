const express = require('express')
const cors = require('cors')
const router = require('./router/router')

const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const mongoose = require('mongoose')

const morgan = require('morgan')
const { config } = require('dotenv')
config({ path: './.env' })


const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
)
const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('combined',{stream:accessLogStream}))
app.use(router)


app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


mongoose.connect(process.env.DBURL);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);

});

db.once('open', () => {
  console.log('Connected to MongoDB database...');
  app.listen(5000,()=>console.log('server started on port 5000....'))
});