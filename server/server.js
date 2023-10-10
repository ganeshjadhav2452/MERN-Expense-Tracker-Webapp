const express = require('express')
const cors = require('cors')
const router = require('./router/router')
const sequelize = require('./utils/database')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')

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
sequelize.sync().then(res => {
    app.listen(5000, () => {
        console.log('server started...')
    })

}).catch(err => console.log(err))
