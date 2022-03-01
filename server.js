const express = require('express')
const moment = require('moment')
const fs = require('fs').promises;
const ProdContainer = require ('./operaciones')

const app = express()
const PORT = 8080

const server = app.listen(PORT, ()=> {
         console.log('server http escuchando en el puerto ' +  server.address().port )

})
server.on("error", error => console.log('error en servidor ' + error))

app.get('/', (req,res) => {
    res.send( '<h1 style="color:blue"> ingresar a /productos o  /productosRandom  </h1>') // se muestra por navegador el SEND
})

app.get('/productos', async (req,res)=>{
    const productStore = await ProdContainer.getAll()
    res.send(productStore)
})

app.get('/productosRandom', async  (req,res)=>{
    const productStore = await ProdContainer.getAll()
    let max = productStore.length 
    let min = 1 
    const idRandom =  Math.floor(Math.random() * max + min);
    console.log(idRandom)
    res.send(productStore[idRandom -1])
} )