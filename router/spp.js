const express = require('express');
const multer = require("multer");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//call models
const models =require('../models/index')
const spp = models.spp

const md5 = require("md5")

const auth = require("../auth")
app.use(auth)
 const jwt = require ("jsonwebtoken")
const SECRET_KEY = "Semangat"


app.get("/",async(req,res)=>{
    //ambil data
    spp.findAll()
    .then(result =>{
        res.json({
            data:result
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})

app.get("/:id_spp",async(req,res)=>{
    let param ={id_spp:req.params.id_spp}
    spp.findOne({where: params})
    .then(result =>{
        res.json(result)
    })
    .catch(error =>{
        message:error.message
    })
})


app.post("/",async(req,res)=>{
    let data ={
        id_spp:req.body.id_spp,
        tahun:req.body.tahun,
        nominal:req.body.nominal
    }
    spp.create(data)
    .then(result=>{
        res.json({
            message:"Data has been Insert",
            data: result
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})

app.put("/",async(req,res)=>{
    let data ={
        tahun:req.body.tahun,
        nominal:req.body.nominal
    }
    let parameter ={
        id_spp : req.body.id_spp
    }
    spp.update(data,{where: parameter})
    .then(result => {
        res.json({
            message: "Data has been Updated",
            data: result
        })
    })
    .catch(error =>{
      res.json({
        message:error.message
      })
    })
})

app.delete("/:id_spp",async(req,res)=>{
    let id_spp = req.params.id_spp

    let param ={
        id_spp:id_spp
    }
    spp.destroy({where:param})
    .then(result => {
        res.json({
            message: "Data has been destroyed",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app