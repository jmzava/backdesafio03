const express = require('express')
const moment = require('moment')
const app = express()
const PORT = 8080

const server = app.listen(PORT, ()=> {
         console.log('server http escuchando en el puerto ' +  server.address().port )

})
// manejo de errores

server.on("error", error => console.log('error en servidor ' + error))

//peticiones GET

app.get('/', (req,res) => {
    res.send( '<h1 style="color:blue"> Bienvenidos al servidor Express online 2 </h1>') // se muestra por navegador el SEND
})

let visitas = 0 
app.get('/visitas', (req,res)=>{
    visitas++
    res.send('la cantidad de visitas es ' + visitas)
})

app.get('/fyh', (req,res)=>{
    res.send({fyh: moment().format("YYYY/MM/DD HH:mm:ss")})
} )