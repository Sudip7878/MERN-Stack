const express = require('express')
require('./db/config')
const Product = require('./db/Product')
const User = require('./db/User')
const cors = require('cors')//handels the cors error
const app = express()

const Jwt = require('jsonwebtoken')
const JwtKey = "e-comm"

app.use(express.json())//handles the data in body of json type
app.use(cors())

app.post('/add', verifyToken, async (req, res) => {
    let product = new Product(req.body)//create the obj of Product where we have define the fields and we can entry the data of defined fields only
    let result = await product.save()
    res.send(result)
})

app.post("/register",verifyToken, async (req, res) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    
    Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send("something went wrong please try after some time")
        }
        res.send({ result, token: token })
    })
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send("something went wrong please try after some time")
                }
                res.send({ user, token: token })
            })
        } else {
            res.send({ result: "user not found" })
        }

    } else {
        res.send("provide user-email and password")
    }

})

app.get('/list',verifyToken, async (req, res) => {
    let result = await Product.find()
    res.send(result)
})

app.delete('/delete/:id',verifyToken, async (req, res) => {
    let result = await Product.deleteOne({
        _id: req.params.id
    })
    if (result.deletedCount > 0) {
        res.send(result)
    } else {
        res.send({ result: "not deleted" })
    }
})

app.get('/prefil/:id',verifyToken, async (req, res) => {
    let result = await Product.findOne(
        { _id: req.params.id }
    )
    if (result) {
        res.send(result)
    }
})

app.put('/update/:id',verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id }, { $set: req.body }
    )
    res.send(result)
})

app.get('/search/:key',verifyToken, async (req, res) => {
    let result = await Product.find({
        $or: [
            { company: { $regex: req.params.key } },
            { name: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})

//middleware
function verifyToken(req,res,next){
    let token = req.headers['authorization']//key should be passed in lowercase
    if(token){
        token = token.split(' ')[1]
        console.log("middleware called",token)
        Jwt.verify(token,JwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"please provide valid token"})
            }else{
                next()
            }
        })
    }else{
        res.status(403).send({result:"please add token with header"})
    }
}

app.listen(4501)