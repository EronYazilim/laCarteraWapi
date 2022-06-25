var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
var DBISLEM = require('../../../dbConfig/islem.js')
var SWAGGER_ADMIN_HAZIRLA = require('../../../dbConfig/swagger_admin.js')
// ÇALIŞAN İLK FONKSİYONLAR

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use (function(req, res, next) {
	var data = ''
	req.setEncoding('utf8')
	req.on('data', function(chunk) {
		data += chunk
	})

	req.on('end', function() {
		req.body = data
		next()
	})
})

JSON_loginIslemleri = {
  
	"/admin/authentication/login": {
    "post": {
      "summary": "Login İşlemi",
      "tags": ["ADMIN - Login İşlemleri"],
			"description":"authentication/login",			
      "parameters": [{
        "name": "body",
        "in": "body",
        "type": "string",
        "description": "Body İçerik",
        "default": {
          "e_kull_adi": "berkan",
          "e_sifre": "123456"
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/authentication/logout": {
    "post": {
      "summary": "Logout İşlemi",
      "tags": ["ADMIN - Login İşlemleri"],
			"description":"authentication/logout",			
      "parameters": [{
        "name": "utoken",
        "in": "header",
        "type": "string",
        "description": "login utoken",
        "default": "",
        "required": true
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  }

}

router.post('/login', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	BODY_ICERIK = ""

	if (req.body != "")
	{
		try {
			BODY_ICERIK = JSON.parse(req.body)
		}
		catch(err) {
			res.send([{"S": "H", "HATA_KODU": "801", "HATA_ACIKLAMASI": "BODY-JSON Parse Hatası"}])
			res.end()
			return false
		}
	}
	
		if (!BODY_ICERIK)
		{
			res.send([{"S": "H", "HATA_KODU": "803", "HATA_ACIKLAMASI": "İçerik Hatası"}])
			res.end()
			return false
		}  
		if (!BODY_ICERIK.e_kull_adi || BODY_ICERIK.e_kull_adi == "")
		{
			res.send([{"S": "H", "HATA_KODU": "803", "HATA_ACIKLAMASI": "İçerik Hatası - e_kull_adi Boş Olamaz"}])
			res.end()
			return false
		}
		if (!BODY_ICERIK.e_sifre || BODY_ICERIK.e_sifre == "")
		{
			res.send([{"S": "H", "HATA_KODU": "803", "HATA_ACIKLAMASI": "İçerik Hatası - e_sifre Boş Olamaz"}])
			res.end()
			return false
		}
		SORGU = "SP_W_T_KULLANICILAR @islem = 'G', "+
									" @e_kull_adi = '" + BODY_ICERIK.e_kull_adi + "', "+
									" @e_sifre = '" + BODY_ICERIK.e_sifre + "', "+
									" @IP = '" + IP + "'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/logout', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	IP = IP.replace('::ffff:','')
	BODY_ICERIK = ""

		if (!req.headers['utoken'] || req.headers['utoken'] === "undefined" || req.headers['utoken'] == "")
		{            
			res.send([{"S": "H", "HATA_KODU": "804", "HATA_ACIKLAMASI": "UTOKEN Hatası"}])
			res.end()
			return false
		}
		SORGU = "SP_W_T_KULLANICILAR @islem = 'C', @TOKEN = '" + req.headers['utoken'] + "'"


	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

module.exports = router

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_loginIslemleri)