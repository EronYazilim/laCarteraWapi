var dyLocal = require('../../../dbConfig/upload_dosya_klasoru_local.js')
var dyUrl = require('../../../dbConfig/upload_dosya_klasoru_url.js')
var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const path = require("path")
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

dosyaPath_local = dyLocal.YOL()
dosyaPath_url = dyUrl.YOL()

router.use (function(req, res, next) {
  var data=''
  req.setEncoding('utf8')
  req.on('data', function(chunk) { 
    data += chunk
  })

  req.on('end', function() {
    req.body = data
    next()
  })
})

router.get('/:klasoradi/:dosyaadi', async function (req, res) {

  if (req.header('Origin') == "http://localhost:5771") {
    klasor_yolu = dosyaPath_local + req.params.klasoradi
  } else {
    klasor_yolu = dosyaPath_url + req.params.klasoradi
  }

  var klasor = req.params.klasoradi
  var dosya = req.params.dosyaadi
  var dosyakontrol = true 

  try {
    fs.readFileSync(path.resolve(__dirname, klasor_yolu, dosya), 'utf8')  
  } catch(e) {
    dosyakontrol = false
  }

  if (dosyakontrol) {
    res.sendFile(path.resolve(__dirname, klasor_yolu, dosya));
  } else {
    res.send("Böyle bir dosya bulunamadı")
  }
})

module.exports = router