const express = require('express');
const multer = require("multer");
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//call models
const models = require('../models/index')
const petugas = models.petugas

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Semangat"


app.get("/", async (req, res) => {
    let result = await petugas.findAll()
    res.json(result)
})

app.get("/:id_petugas", (req, res) => {
})

app.post("/", async (req, res) => {
    let data = {
        id_petugas:req.body.id_petugas,
        nama_petugas: req.body.nama_petugas,
        username: req.body.username,
        password: md5(req.body.password),
        level:req.body.level
    }
    petugas.create(data)
        .then(result => {
            res.json({
                message: "Data has been Insert",
                data:result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", async (req, res) => {
    let param = {id_petugas : req.body.id_petugas}
    let data ={
        nama_petugas :req.body.nama_petugas,
        username:req.body.username,
        level:req.body.level
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    petugas.update(data,{where:param})
    .then(result =>{
        res.json({
            message:"Data has been Update"
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})
app.delete("/:id_petugas", async (req, res) => {
    let param = {id_petugas : req.body.id_petugas}
    petugas.destroy({where:param})
    .then(result=>{
        res.json({
            message:"Data has been Delete"
        })
    })
    .catch(error=>{
        res.json({
            message:error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})
module.exports = app