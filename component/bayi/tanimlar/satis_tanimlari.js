var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
var DBISLEM = require('../../../dbConfig/islem.js')
var SWAGGER_BAYI_HAZIRLA = require('../../../dbConfig/swagger_bayi.js')
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

JSON_satisIslemleri = {

	"/bayi/satisIslemleri/satisListesi": {
    "get": {
      "summary": "Satış Listesi",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisListesi",
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
        "name": "e_durum",
        "in": "query",
        "type": "string",
        "description": "Kayıt durumu",
        "default": ""
      },
			{
        "name": "ESKI_ID",
        "in": "query",
        "type": "string",
        "description": "Satış IDsi",
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

	"/bayi/satisIslemleri/satisEkle": {
    "post": {
      "summary": "Satış Ekle",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisEkle",
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
					"e_odeme_tipi":"",
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

	"/bayi/satisIslemleri/satisDuzenle": {
    "put": {
      "summary": "Satış Düzenle",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDuzenle",
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
					"e_odeme_tipi":"",
					"e_durum":"",
					"e_satis_unique_id":"",
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

	"/bayi/satisIslemleri/satisSil": {
    "delete": {
      "summary": "Satış Sil",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisSil",
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
					"description": "Satış ID si",
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
  },

	"/bayi/satisIslemleri/satisDetayAktar": {
    "post": {
      "summary": "Satış Detay Aktar",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetayAktar",
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
					"e_satis_unique_id": "",
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

	"/bayi/satisIslemleri/satisDetayListesi": {
    "get": {
      "summary": "Satış Detay Listesi",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetayListesi",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
			},
			{
        "name": "e_satis_unique_id",
        "in": "query",
        "type": "string",
        "description": "Satış Unique IDsi",
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

	"/bayi/satisIslemleri/satisDetayEkle": {
    "post": {
      "summary": "Satış Detay Ekle",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetayEkle",
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
					"e_stok_kart_id":"",
					"e_miktar":"",
					"e_satis_unique_id":""
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/bayi/satisIslemleri/satisDetayDuzenle": {
    "put": {
      "summary": "Satış Detay Düzenle",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetayDuzenle",
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
					"e_stok_kart_id":"",
					"e_miktar":"",
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

	"/bayi/satisIslemleri/satisDetaySil": {
    "delete": {
      "summary": "Satış Detay Sil",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetaySil",
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
					"description": "Satış Detay ID si",
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
  },

	"/bayi/satisIslemleri/satisDetayTemizle": {
    "delete": {
      "summary": "Satış Detay Temizle",
      "tags": ["BAYİ - Satış İşlemleri"],
			"description":"satisIslemleri/satisDetayTemizle",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
					"name": "e_satis_unique_id",
					"in": "query",
					"type": "string",
					"description": "Satış Detay Unique ID si",
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
  },
	
}

router.get('/satisListesi', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"',"+
									" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/satisEkle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'E', @TOKEN = '"+UTOKEN+"',"+
								" @e_odeme_tipi = '"+isnull(BODY_ICERIK.e_odeme_tipi)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/satisDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'D', @TOKEN = '"+UTOKEN+"',"+
								" @e_odeme_tipi = '"+isnull(BODY_ICERIK.e_odeme_tipi)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"',"+
								" @e_satis_unique_id = '"+isnull(BODY_ICERIK.e_satis_unique_id)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/satisSil', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'S', @TOKEN = '"+UTOKEN+"',"+					
								" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/satisDetayAktar', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'A', @TOKEN = '"+UTOKEN+"',"+
									" @e_satis_unique_id = '"+isnull(BODY_ICERIK.e_satis_unique_id)+"',"+
									" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.get('/satisDetayListesi', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'L2', @TOKEN = '"+UTOKEN+"',"+
									" @e_satis_unique_id = '"+isnull(req.query.e_satis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/satisDetayEkle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'E2', @TOKEN = '"+UTOKEN+"',"+
								" @e_stok_kart_id = '"+isnull(BODY_ICERIK.e_stok_kart_id)+"',"+
								" @e_miktar = '"+isnull(BODY_ICERIK.e_miktar)+"',"+
								" @e_satis_unique_id = '"+isnull(BODY_ICERIK.e_satis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/satisDetayDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'D2', @TOKEN = '"+UTOKEN+"',"+
								" @e_stok_kart_id = '"+isnull(BODY_ICERIK.e_stok_kart_id)+"',"+
								" @e_miktar = '"+isnull(BODY_ICERIK.e_miktar)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/satisDetaySil', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'S2', @TOKEN = '"+UTOKEN+"',"+					
								" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/satisDetayTemizle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SATISLAR @islem = 'T', @TOKEN = '"+UTOKEN+"',"+					
								" @e_satis_unique_id = '"+isnull(req.query.e_satis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

function isnull(deger) {
	if ((deger == null) || (deger == "null") || (deger == undefined) || (deger == "undefined")) { deger = "" }
	return deger
}

module.exports = router

SWAGGER_BAYI_HAZIRLA.JSON_DAHIL_ET(JSON_satisIslemleri)