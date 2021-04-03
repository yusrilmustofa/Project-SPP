const express = require('express');
const multer = require("multer");
const app = express();

//call models
const models =require('../models/index')
const pembayaran = models.pembayaran
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/",(req,res)=>{
    pembayaran.findAll({
        include:["siswa","petugas"]
    })
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

app.get("/:id_pembayaran",(req,res)=>{
    let param ={
        id_pembayaran:req.params.id_pembayaran
    }
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
    let current = new Date().toISOString().split('T')[0]
    let data ={
        id_pembayaran:req.body.id_pembayaran,
        id_petugas:req.body.id_petugas,
        nisn:req.body.nisn,
        tgl_bayar:current,
        bulan_bayar:req.body.bulan_bayar,
        tahun_bayar:req.body.tahun_bayar,
        id_spp:req.body.id_spp,
        jumlah_bayar:req.body.jumlah_bayar
    }
    pembayaran.create(data)
    .then(result=>{
        res.json({
            message:"Data has been Insert",
            data:result
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})

app.put("/",(req,res)=>{
    let param ={
        id_pembayaran:req.params.id_pembayaran
    }
    let data ={
        id_pembayaran:req.body.id_pembayaran,
        id_petugas:req.body.id_petugas,
        nisn:req.body.nisn,
        tgl_bayar:req.body.tgl_bayar,
        bulan_bayar:req.body.bulan_bayar,
        tahun_bayar:req.body.tahun_bayar,
        id_spp:req.body.id_spp,
        jumlah_bayar:req.body.jumlah_bayar
    }
    pembayaran.update(data,{where:param})
    .then(result => {
        res.json({
            message: "Data has been Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_pembayaran",(req,res)=>{
    let id_pembayaran=req.params.id_pembayaran
    let param ={
        id_pembayaran:id_pembayaran
    }
    pembayaran.destroy({
        where:param
    })
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