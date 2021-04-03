const express = require('express');
const multer = require("multer");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//call models
const models = require('../models/index')
const siswa = models.siswa

app.get("/", (req, res) => {
    siswa.findAll({
        include: ["spp", "kelas"]
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

app.get("/:nisn", (req, res) => {
    let params ={
        nisn:req.params.nisn
    }
    siswa.findOne({
        where: params,
        include:["spp","kelas"]
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

app.post("/", (req, res) => {
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp
    }
    siswa.create(data)
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

app.put("/", (req, res) => {
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp
    }
    let param = {
        nisn: req.body.nisn
    }
    siswa.update(data, { where: param })
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

app.delete("/:nisn", (req, res) => {
    let nisn = req.params.nisn
    let params = {
        nisn: nisn
    }
    siswa.destroy({ where: params })
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