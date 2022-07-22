var dyLocal = require('../../../dbConfig/upload_dosya_klasoru_local.js')
var dyUrl = require('../../../dbConfig/upload_dosya_klasoru_url.js')
var SWAGGER_ADMIN_HAZIRLA = require('../../../dbConfig/swagger_admin.js')

var fs = require('fs');
var express = require('express')
var router = express.Router()

const util = require("util")
const path = require("path")
const multer = require("multer")

dosyaPath_local = dyLocal.YOL()
dosyaPath_url = dyUrl.YOL()

JSON_admin_stokKartUpload = {
  
	"/admin/stokKartUpload": {
    "post": {
      "summary": "Stok Kart Upload",
      "tags": ["ADMIN - Stok Kart İşlemleri"],
			"description":"stokKartUpload",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
        {
          "name": "dosyalar",
					"in": "formData",
					"type": "file",
					"description": "yüklenecek dosyayı seçiniz",
					"default": "",
					"required": true
        }     
		],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  }

}

router.post('/', async function (req, res) {

  ISLEM = "" + req.headers['islem']

  if (ISLEM) { ISLEM = ISLEM.trim() }

  ///---------------------------------------->>>>> ÇALIŞILACAK KLASÖRÜN PATH'i TANIMLANIYOR

  if (req.header('Origin') == "http://localhost:5771") {
    klasor_yolu = dosyaPath_local + "stokKartIslemleri"
  } else {
    klasor_yolu = dosyaPath_url + "stokKartIslemleri"
  }

  try {
    UNIQ_IDLER = []
    DOSYALAR = []
    UZANTILAR = []
    BELGE_TURU = []
    try {
      if (!fs.existsSync(klasor_yolu)) { fs.mkdirSync(klasor_yolu) }
      if (!fs.existsSync(klasor_yolu)) { return res.send('[{"S": "H", "HATA_KODU": "1002", "HATA_ACIKLAMASI": "Klasör oluşturulamadı - Stok Kart İşlemleri"}]') }
    } catch(e) {
      console.log(e)
    }

    await uploadFiles(req, res)
    return res.send('[{"S": "T", "MESAJ": "Stok kart dosyası Yüklendi"}]')
  } catch (error) {
    return res.send('[{"S": "H", "HATA_KODU": "1003", "HATA_ACIKLAMASI": "Stok kart dosyası yüklenirken bazı hatalar ile karşılaşıldı.", "ERROR":"' + error + '"}]')
  }
})

var storage_file = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(klasor_yolu))
  },
  filename: (req, file, callback) => {    
    var filename = `${file.originalname}`
    callback(null, filename)
  }
})

var dosyaAyikla = multer({ storage: storage_file }).array("dosyalar", 100)
var uploadFiles = util.promisify(dosyaAyikla)

module.exports = router

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_admin_stokKartUpload)
