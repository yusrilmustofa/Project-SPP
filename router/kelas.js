const express = require('express');
const multer = require("multer");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//call models
const models =require('../models/index')
const kelas = models.kelas

app.get("/",(req,res)=>{
    kelas.findAll()
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

app.get("/:id_kelas",(req,res)=>{
    let params ={
        id_kelas:req.params.id_kelas
    }
    kelas.findOne({where: params})
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/",(req,res)=>{
    let data ={
        id_kelas:req.body.id_kelas,
        nama_kelas:req.body.nama_kelas,
        kompetensi_keahlian:req.body.kompetensi_keahlian
    }
    kelas.create(data)
    .then(result => {
        res.json({
            message: "Data has been Insert",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/",(req,res)=>{
    let data ={
        nama_kelas:req.body.nama_kelas,
        kompetensi_keahlian:req.body.kompetensi_keahlian
    }
    let parameter ={
        id_kelas : req.body.id_kelas
    }
    kelas.update(data,{where: parameter})
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

app.delete("/:id_kelas",(req,res)=>{
    let id_kelas={
        id_kelas:req.params.id_kelas
    }
    let param={
        id_kelas:id_kelas
    }
    kelas.destroy({where:param})
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