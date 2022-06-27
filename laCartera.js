var express = require('express')
var cors = require('cors')
var fs = require('fs')
var https = require('https')

const swaggerUI_admin = require('swagger-ui-express');
const swaggerUI_bayi = require('swagger-ui-express');
var SWAGGER_ADMIN_HAZIRLA = require('./dbConfig/swagger_admin.js')
var SWAGGER_BAYI_HAZIRLA = require('./dbConfig/swagger_bayi.js')
var moment = require('moment')

var privateKey = fs.readFileSync('/home/eron/ssl/server.key').toString()
var certificate = fs.readFileSync('/home/eron/ssl/sertifika.cer').toString()
var rootCa = fs.readFileSync('/home/eron/ssl/root.ca').toString()
var credentials = {key: privateKey, cert: certificate, ca:rootCa}
var swaggerAdminDocument = require('./dbConfig/swagger_admin.json');
var swaggerBayiDocument = require('./dbConfig/swagger_bayi.json');
const PORT = process.env.PORT || 5770

var app = express()
app.use(cors())

var izinliURLKontrol = function (req, callback) {
  var corsOptions  
  corsOptions = { origin: true }
  callback(null, corsOptions)
}

var swagerIzinliURLKontrol = function (req, callback) {
  const whitelist = ['test.eronsoftware.com:5770']
  if (whitelist.indexOf(req.get('host')) !== -1) {
    callback(null, true)
  } else {
    callback("500")
  }
}

var MODULE_ADMIN = require('./component/admin/admin_routing.js')
var MODULE_BAYI = require('./component/bayi/bayi_routing.js')

var swaggerAdminHtml = swaggerUI_admin.generateHTML(swaggerAdminDocument, swaggerUI_admin.setup(swaggerAdminDocument))
swaggerAdminHtml = swaggerAdminHtml.replace(`body {` , ` .swagger-ui .info { margin: 10px 0 !important;  } .topbar {display: none} .scheme-container {display: none} body { `)
app.use('/dokuman/admin', swaggerUI_admin.serveFiles(swaggerAdminDocument, swaggerUI_admin.setup(swaggerAdminDocument)))
app.get('/dokuman/admin', (req, res) => { res.send(swaggerAdminHtml) });

var swaggerBayiHtml = swaggerUI_bayi.generateHTML(swaggerBayiDocument, swaggerUI_bayi.setup(swaggerBayiDocument))
swaggerBayiHtml = swaggerBayiHtml.replace(`body {` , ` .swagger-ui .info { margin: 10px 0 !important;  } .topbar {display: none} .scheme-container {display: none} body { `)
app.use('/dokuman/bayi', swaggerUI_bayi.serveFiles(swaggerBayiDocument, swaggerUI_bayi.setup(swaggerBayiDocument)))
app.get('/dokuman/bayi', (req, res) => { res.send(swaggerBayiHtml) });

app.use('/admin', cors(izinliURLKontrol), MODULE_ADMIN)
app.use('/bayi', cors(izinliURLKontrol), MODULE_BAYI)

app.all('*', cors(izinliURLKontrol), function(req, res){
  res.send([{"S": "H", "HATA_KODU": "803-0", "HATA_ACIKLAMASI": "Routher Hatası (laCartera)"}])
  res.end()
})

var httpsServer = https.createServer(credentials, app)
httpsServer.listen(PORT)

SWAGGER_ADMIN_HAZIRLA.SWAGGER_ADMIN_VIEW_KAYDET()
SWAGGER_BAYI_HAZIRLA.SWAGGER_BAYI_VIEW_KAYDET()
console.log("laCartera WAPI : "+PORT+" - " + (moment().format('DD/MM/yyyy HH:mm:ss')))
