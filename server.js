const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const petugas = require("./router/petugas")
const spp = require("./router/spp")
const siswa = require("./router/siswa")
const kelas = require("./router/kelas")
const pembayaran = require ("./router/pembayaran")

app.use("/siswa",siswa)
app.use("/spp",spp)
app.use("/kelas",kelas)
app.use("/petugas",petugas)
app.use("/pembayaran",pembayaran)

app.use(express.static(__dirname))

app.listen(8000,()=>{
    console.log("Server run on Port 8000");
})