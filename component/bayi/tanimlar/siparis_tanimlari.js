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

JSON_siparisIslemleri = {

	"/bayi/siparisIslemleri/siparisListesi": {
    "get": {
      "summary": "Sipariş Listesi",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisListesi",
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
      },
			{
        "name": "ESKI_ID",
        "in": "query",
        "type": "string",
        "description": "Sipariş IDsi",
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

	"/bayi/siparisIslemleri/siparisEkle": {
    "post": {
      "summary": "Sipariş Ekle",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisEkle",
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
					"e_aciklama":"",
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

	"/bayi/siparisIslemleri/siparisDuzenle": {
    "put": {
      "summary": "Sipariş Düzenle",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDuzenle",
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
					"e_aciklama":"",
					"e_durum":"",
					"e_siparis_unique_id":"",
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

	"/bayi/siparisIslemleri/siparisSil": {
    "delete": {
      "summary": "Sipariş Sil",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisSil",
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
					"description": "Sipariş ID si",
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

	"/bayi/siparisIslemleri/siparisDetayAktar": {
    "post": {
      "summary": "Sipariş Detay Aktar",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetayAktar",
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
					"e_siparis_unique_id": "",
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

	"/bayi/siparisIslemleri/siparisDetayListesi": {
    "get": {
      "summary": "Sipariş Detay Listesi",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetayListesi",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
			},
			{
        "name": "e_siparis_unique_id",
        "in": "query",
        "type": "string",
        "description": "Sipariş Unique IDsi",
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

	"/bayi/siparisIslemleri/siparisDetayEkle": {
    "post": {
      "summary": "Sipariş Detay Ekle",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetayEkle",
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
					"e_siparis_unique_id":""
        }
      }],
      "responses": {
        "200": {
          "description": "OK"
        }
      }
    }
  },

	"/bayi/siparisIslemleri/siparisDetayDuzenle": {
    "put": {
      "summary": "Sipariş Detay Düzenle",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetayDuzenle",
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

	"/bayi/siparisIslemleri/siparisDetaySil": {
    "delete": {
      "summary": "Sipariş Detay Sil",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetaySil",
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
					"description": "Sipariş Detay ID si",
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
	
	"/bayi/siparisIslemleri/siparisDetayTemizle": {
    "delete": {
      "summary": "Sipariş Detay Temizle",
      "tags": ["BAYİ - Sipariş İşlemleri"],
			"description":"siparisIslemleri/siparisDetayTemizle",
      "parameters": [{
					"name": "utoken",
					"in": "header",
					"type": "string",
					"description": "login utoken",
					"default": "",
					"required": true
				},
				{
					"name": "e_siparis_unique_id",
					"in": "query",
					"type": "string",
					"description": "Satış Detay Unique id si",
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

router.get('/siparisListesi', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @ARAMA = '"+isnull(req.query.ARAMA)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"',"+
									" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/siparisEkle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'E', @TOKEN = '"+UTOKEN+"',"+
								" @e_aciklama = '"+isnull(BODY_ICERIK.e_aciklama)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/siparisDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'D', @TOKEN = '"+UTOKEN+"',"+
								" @e_aciklama = '"+isnull(BODY_ICERIK.e_aciklama)+"',"+
								" @e_durum = '"+isnull(BODY_ICERIK.e_durum)+"',"+
								" @e_siparis_unique_id = '"+isnull(BODY_ICERIK.e_siparis_unique_id)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/siparisSil', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'S', @TOKEN = '"+UTOKEN+"',"+					
								" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/siparisDetayAktar', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'A', @TOKEN = '"+UTOKEN+"',"+
									" @e_siparis_unique_id = '"+isnull(BODY_ICERIK.e_siparis_unique_id)+"',"+
									" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.get('/siparisDetayListesi', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'L2', @TOKEN = '"+UTOKEN+"',"+
									" @e_siparis_unique_id = '"+isnull(req.query.e_siparis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.post('/siparisDetayEkle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'E2', @TOKEN = '"+UTOKEN+"',"+
								" @e_stok_kart_id = '"+isnull(BODY_ICERIK.e_stok_kart_id)+"',"+
								" @e_miktar = '"+isnull(BODY_ICERIK.e_miktar)+"',"+
								" @e_siparis_unique_id = '"+isnull(BODY_ICERIK.e_siparis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.put('/siparisDetayDuzenle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'D2', @TOKEN = '"+UTOKEN+"',"+
								" @e_stok_kart_id = '"+isnull(BODY_ICERIK.e_stok_kart_id)+"',"+
								" @e_miktar = '"+isnull(BODY_ICERIK.e_miktar)+"',"+
								" @eski_id = '"+isnull(BODY_ICERIK.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/siparisDetaySil', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'S2', @TOKEN = '"+UTOKEN+"',"+					
								" @eski_id = '"+isnull(req.query.ESKI_ID)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

router.delete('/siparisDetayTemizle', async function (req, res) {

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
					
		SORGU = "SP_W_B_SIPARISLER @islem = 'T', @TOKEN = '"+UTOKEN+"',"+					
								" @e_siparis_unique_id = '"+isnull(req.query.e_siparis_unique_id)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

function isnull(deger) {
	if ((deger == null) || (deger == "null") || (deger == undefined) || (deger == "undefined")) { deger = "" }
	return deger
}

module.exports = router

SWAGGER_BAYI_HAZIRLA.JSON_DAHIL_ET(JSON_siparisIslemleri)