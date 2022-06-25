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

JSON_bayiIslemleri = {
  
	"/admin/bayiIslemleri/bayiListesi": {
    "get": {
      "summary": "Bayi Listesi",
      "tags": ["ADMIN - Bayi İşlemleri"],
			"description":"bayiIslemleri/bayiListesi",
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
        "name": "e_durum",
        "in": "query",
        "type": "string",
        "description": "Kayıt durumu",
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

	"/admin/bayiIslemleri/bayiEkle": {
    "post": {
      "summary": "Bayi Ekle",
      "tags": ["ADMIN - Bayi İşlemleri"],
			"description":"bayiIslemleri/bayiEkle",
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
					"e_bayi_kodu" : "",
					"e_bayi_adi" : "",
					"e_yetkilisi" : "",
					"e_il" : "",
					"e_ilce" : "",
					"e_fiyat_politikasi" : "",
					"e_iskonto_orani" : "",
					"e_durum" : "",
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/bayiIslemleri/bayiDuzenle": {
    "put": {
      "summary": "Bayi Düzenle",
      "tags": ["ADMIN - Bayi İşlemleri"],
			"description":"bayiIslemleri/bayiDuzenle",
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
					"e_bayi_kodu" : "",
					"e_bayi_adi" : "",
					"e_yetkilisi" : "",
					"e_il" : "",
					"e_ilce" : "",
					"e_fiyat_politikasi" : "",
					"e_iskonto_orani" : "",
					"e_durum" : "",
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

	"/admin/bayiIslemleri/bayiSil": {
    "delete": {
      "summary": "Bayi Sil",
      "tags": ["ADMIN - Bayi İşlemleri"],
			"description":"bayiIslemleri/bayiSil",
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
					"description": "Bayi ID si",
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

router.get('/bayiListesi', async function (req, res) {

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
					
		SORGU = "SP_W_T_BAYI_TANIMLARI @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @ARAMA = '"+isnull(req.query.ARAMA)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/bayiEkle', async function (req, res) {

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
					
		SORGU = "SP_W_T_BAYI_TANIMLARI @islem = 'E', @TOKEN = '"+UTOKEN+"',"+
								" @e_bayi_kodu = '"+isnull(BODY_ICERIK.e_bayi_kodu)+"',"+
								" @e_bayi_adi = '"+isnull(BODY_ICERIK.e_bayi_adi)+"',"+
								" @e_yetkilisi = '"+isnull(BODY_ICERIK.e_yetkilisi)+"',"+
								" @e_il = '"+isnull(BODY_ICERIK.e_il)+"',"+
								" @e_ilce = '"+isnull(BODY_ICERIK.e_ilce)+"',"+
								" @e_fiyat_politikasi = '"+isnull(BODY_ICERIK.e_fiyat_politikasi)+"',"+
								" @e_iskonto_orani = '"+isnull(BODY_ICERIK.e_iskonto_orani)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/bayiDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_T_BAYI_TANIMLARI @islem = 'D', @TOKEN = '"+UTOKEN+"',"+
								" @e_bayi_kodu = '"+isnull(BODY_ICERIK.e_bayi_kodu)+"',"+
								" @e_bayi_adi = '"+isnull(BODY_ICERIK.e_bayi_adi)+"',"+
								" @e_yetkilisi = '"+isnull(BODY_ICERIK.e_yetkilisi)+"',"+
								" @e_il = '"+isnull(BODY_ICERIK.e_il)+"',"+
								" @e_ilce = '"+isnull(BODY_ICERIK.e_ilce)+"',"+
								" @e_fiyat_politikasi = '"+isnull(BODY_ICERIK.e_fiyat_politikasi)+"',"+
								" @e_iskonto_orani = '"+isnull(BODY_ICERIK.e_iskonto_orani)+"',"+
                " @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/bayiSil', async function (req, res) {

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
					
		SORGU = "SP_W_T_BAYI_TANIMLARI @islem = 'S', @TOKEN = '"+UTOKEN+"',"+					
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

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_bayiIslemleri)