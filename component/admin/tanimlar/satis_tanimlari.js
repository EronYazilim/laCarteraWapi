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

JSON_satisIslemleri = {

	"/admin/satisIslemleri/satisListesi": {
    "get": {
      "summary": "Satış Listesi",
      "tags": ["ADMİN - Satış İşlemleri"],
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
      },
			{
        "name": "e_bayi_id",
        "in": "query",
        "type": "string",
        "description": "e_bayi_id",
        "default": ""
      },
			{
        "name": "TARIH_BAS",
        "in": "query",
        "type": "string",
        "description": "filtre tarih başlangıç",
        "default": ""
      },
			{
        "name": "TARIH_SON",
        "in": "query",
        "type": "string",
        "description": "filtre tarih bitiş",
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
					
		SORGU = "SP_W_T_SATISLAR @islem = 'L', @TOKEN = '"+UTOKEN+"',"+
									" @e_durum = '"+isnull(req.query.e_durum)+"',"+
									" @SS = '"+isnull(req.query.SS)+"',"+
									" @KS = '"+isnull(req.query.KS)+"',"+
									" @eski_id = '"+isnull(req.query.ESKI_ID)+"',"+
									" @e_bayi_id = '"+isnull(req.query.e_bayi_id)+"',"+
									" @TARIH_BAS = '"+isnull(req.query.TARIH_BAS)+"',"+
									" @TARIH_SON = '"+isnull(req.query.TARIH_SON)+"'"

	SONUC = await DBISLEM.SQL_CALISTIR(SORGU)
	res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
	res.end()
})

function isnull(deger) {
	if ((deger == null) || (deger == "null") || (deger == undefined) || (deger == "undefined")) { deger = "" }
	return deger
}

module.exports = router

SWAGGER_ADMIN_HAZIRLA.JSON_DAHIL_ET(JSON_satisIslemleri)