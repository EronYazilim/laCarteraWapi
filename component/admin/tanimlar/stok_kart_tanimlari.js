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

JSON_kullaniciIslemleri = {
  
	"/admin/stokKartIslemleri/stokKartListesi": {
    "get": {
      "summary": "Stok Kart Listesi",
      "tags": ["ADMIN - Stok Kart İşlemleri"],
			"description":"stokKartIslemleri/stokKartListesi",
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

	"/admin/stokKartIslemleri/stokKartEkle": {
    "post": {
      "summary": "Stok Kart Ekle",
      "tags": ["ADMIN - Stok Kart İşlemleri"],
			"description":"stokKartIslemleri/stokKartEkle",
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
					"e_kull_adi":"",
					"e_sifre":"",
					"e_durum":""
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/admin/stokKartIslemleri/stokKartDuzenle": {
    "put": {
      "summary": "Stok Kart Düzenle",
      "tags": ["ADMIN - Stok Kart İşlemleri"],
			"description":"stokKartIslemleri/stokKartDuzenle",
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
					"e_kull_adi":"",
					"e_sifre":"",
					"e_durum":"",
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

	"/admin/stokKartIslemleri/stokKartSil": {
    "delete": {
      "summary": "Stok Kart Sil",
      "tags": ["ADMIN - Stok Kart İşlemleri"],
			"description":"stokKartIslemleri/stokKartSil",
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
					"description": "kullanıcı ID si",
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

router.get('/stokKartListesi', async function (req, res) {

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
					
		SORGU = "SP_W_T_STOK_KART_TANIMLARI @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @ARAMA = '"+isnull(req.query.ARAMA)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/stokKartEkle', async function (req, res) {

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
					
		SORGU = "SP_W_T_STOK_KART_TANIMLARI @islem = 'E', @TOKEN = '"+UTOKEN+"',"+
								" @e_cinsiyet = '"+isnull(BODY_ICERIK.e_cinsiyet)+"',"+
								" @e_stok_kart_kodu = '"+isnull(BODY_ICERIK.e_stok_kart_kodu)+"',"+
								" @e_stok_kart_adi = '"+isnull(BODY_ICERIK.e_stok_kart_adi)+"',"+
								" @e_stok_kart_aciklamasi = '"+isnull(BODY_ICERIK.e_stok_kart_aciklamasi)+"',"+
								" @e_fiyat_1 = '"+isnull(BODY_ICERIK.e_fiyat_1)+"',"+
								" @e_fiyat_2 = '"+isnull(BODY_ICERIK.e_fiyat_2)+"',"+
								" @e_fiyat_3 = '"+isnull(BODY_ICERIK.e_fiyat_3)+"',"+
								" @e_resim_dosya_uzantisi = '"+isnull(BODY_ICERIK.e_resim_dosya_uzantisi)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/stokKartDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_T_STOK_KART_TANIMLARI @islem = 'D', @TOKEN = '"+UTOKEN+"',"+
                " @e_cinsiyet = '"+isnull(BODY_ICERIK.e_cinsiyet)+"',"+
                " @e_stok_kart_kodu = '"+isnull(BODY_ICERIK.e_stok_kart_kodu)+"',"+
                " @e_stok_kart_adi = '"+isnull(BODY_ICERIK.e_stok_kart_adi)+"',"+
                " @e_stok_kart_aciklamasi = '"+isnull(BODY_ICERIK.e_stok_kart_aciklamasi)+"',"+
                " @e_fiyat_1 = '"+isnull(BODY_ICERIK.e_fiyat_1)+"',"+
                " @e_fiyat_2 = '"+isnull(BODY_ICERIK.e_fiyat_2)+"',"+
                " @e_fiyat_3 = '"+isnull(BODY_ICERIK.e_fiyat_3)+"',"+
                " @e_resim_dosya_uzantisi = '"+isnull(BODY_ICERIK.e_resim_dosya_uzantisi)+"',"+
                " @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/stokKartSil', async function (req, res) {

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
					
		SORGU = "SP_W_T_STOK_KART_TANIMLARI @islem = 'S', @TOKEN = '"+UTOKEN+"',"+					
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

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_kullaniciIslemleri)