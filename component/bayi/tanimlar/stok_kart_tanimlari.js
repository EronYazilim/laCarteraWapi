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

JSON_stokKartIslemleri = {
  
	"/bayi/stokKartIslemleri/stokKartListesi": {
    "get": {
      "summary": "Stok Kart Listesi",
      "tags": ["BAYİ - Stok Kart İşlemleri"],
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
        "name": "e_cinsiyet",
        "in": "query",
        "type": "string",
        "description": "Cinsiyet",
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
					
		SORGU = "SP_W_B_STOK_KART_TANIMLARI @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @ARAMA = '"+isnull(req.query.ARAMA)+"',"+
									" @e_cinsiyet = '"+isnull(req.query.e_cinsiyet)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

function isnull(deger) {
	if ((deger == null) || (deger == "null") || (deger == undefined) || (deger == "undefined")) { deger = "" }
	return deger
}

module.exports = router

SWAGGER_BAYI_HAZIRLA.JSON_DAHIL_ET(JSON_stokKartIslemleri)