const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require("./config/key")
//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
const { User } = require('./models/User')

mongoose.connect('config.mongoURI',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true,useFindAndModify:true
}).then(()=>console.log('MongoDB Connected....'))
.catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('I Love You!')
})

app.post('/register',(req,res)=>{
    // 회원 가입 시 필요한 정보를 client에서 가져오면 
    // 데이터 베이스에 넣어준다
    const user  = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err})
        return res.status(200).json({
            success:true
        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})