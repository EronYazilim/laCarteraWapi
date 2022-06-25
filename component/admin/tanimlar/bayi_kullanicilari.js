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

JSON_bayiKullaniciIslemleri = {
  
	"/admin/bayiKullaniciIslemleri/kullaniciListesi": {
    "get": {
      "summary": "Bayi Kullanıcısı Listesi",
      "tags": ["ADMIN - Bayi Kullanıcı İşlemleri"],
			"description":"bayiKullaniciIslemleri/kullaniciListesi",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
        "name": "SS",
        "in": "query",
        "type": "string",
        "description": "Sayfa Sayısı",
        "default": "1"
      },
			{
        "name": "KS",
        "in": "query",
        "type": "string",
        "description": "Kayıt Sayısı",
        "default": "20"
      },
			{
        "name": "ARAMA",
        "in": "query",
        "type": "string",
        "description": "Arama Metni",
        "default": ""
      },
			{
        "name": "ESKI_ID",
        "in": "query",
        "type": "string",
        "description": "Bayinin IDsi",
        "default": ""
      }
		],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/bayiKullaniciIslemleri/kullaniciEkle": {
    "post": {
      "summary": "Bayi Kullanıcısı Ekle",
      "tags": ["ADMIN - Bayi Kullanıcı İşlemleri"],
			"description":"bayiKullaniciIslemleri/kullaniciEkle",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
        "name": "body",
        "in": "body",
        "type": "string",
        "description": "Body İçerik",
        "default": {
					"e_bayi_id" : "",
					"e_kull_adi" : "",
					"e_sifre" : "",
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/bayiKullaniciIslemleri/kullaniciDuzenle": {
    "put": {
      "summary": "Bayi Kullanıcısı Düzenle",
      "tags": ["ADMIN - Bayi Kullanıcı İşlemleri"],
			"description":"bayiKullaniciIslemleri/kullaniciDuzenle",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
        "name": "body",
        "in": "body",
        "type": "string",
        "description": "Body İçerik",
        "default": {
					"e_bayi_id" : "",
					"e_kull_adi" : "",
					"e_sifre" : "",
					"ESKI_ID":""
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/bayiKullaniciIslemleri/kullaniciSil": {
    "delete": {
      "summary": "Bayi Kullanıcısı Sil",
      "tags": ["ADMIN - Bayi Kullanıcı İşlemleri"],
			"description":"bayiKullaniciIslemleri/kullaniciSil",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
					"name": "ESKI_ID",
					"in": "query",
					"type": "string",
					"description": "Bayi Kullanıcısının ID si",
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

router.get('/kullaniciListesi', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	BODY_ICERIK = ""
	UTOKEN = "" + req.headers['utoken'].trim()

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
					
		SORGU = "SP_W_T_BAYI_KULLANICILARI @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @ARAMA = '"+isnull(req.query.ARAMA)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"',"+
									" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/kullaniciEkle', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	BODY_ICERIK = ""
	UTOKEN = "" + req.headers['utoken'].trim()

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
					
		SORGU = "SP_W_T_BAYI_KULLANICILARI @islem = 'E', @TOKEN = '"+UTOKEN+"',"+
								" @e_bayi_id = '"+isnull(BODY_ICERIK.e_bayi_id)+"',"+
								" @e_kull_adi = '"+isnull(BODY_ICERIK.e_kull_adi)+"',"+
								" @e_sifre = '"+isnull(BODY_ICERIK.e_sifre)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/kullaniciDuzenle', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	BODY_ICERIK = ""
	UTOKEN = "" + req.headers['utoken'].trim()

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
					
		SORGU = "SP_W_T_BAYI_KULLANICILARI @islem = 'D', @TOKEN = '"+UTOKEN+"',"+
								" @e_bayi_id = '"+isnull(BODY_ICERIK.e_bayi_id)+"',"+
								" @e_kull_adi = '"+isnull(BODY_ICERIK.e_kull_adi)+"',"+
								" @e_sifre = '"+isnull(BODY_ICERIK.e_sifre)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/kullaniciSil', async function (req, res) {

	IP = "" + req.connection.remoteAddress
	BODY_ICERIK = ""
	UTOKEN = "" + req.headers['utoken'].trim()

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
					
		SORGU = "SP_W_T_BAYI_KULLANICILARI @islem = 'S', @TOKEN = '"+UTOKEN+"',"+					
								" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

function isnull(deger) {
	if ((deger == null) || (deger == "null") || (deger == undefined) || (deger == "undefined")) { deger = "" }
	return deger
}

module.exports = router

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_bayiKullaniciIslemleri)