var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const path = require("path")
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
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
  var klasor = req.params.klasoradi
  var dosya = req.params.dosyaadi
  var dosyakontrol = true 

  try {
    fs.readFileSync(path.resolve(__dirname, '../../../uploads/' + klasor, dosya), 'utf8')  
  } catch(e) {
    dosyakontrol = false
  }

  if (dosyakontrol) {
    res.sendFile(path.resolve(__dirname, '../../../uploads/' + klasor, dosya));
  } else {
    res.send("Böyle bir dosya bulunamadı")
  }
})

module.exports = router