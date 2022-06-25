var express = require('express')
var router = express.Router()
var DBISLEM = require('../../dbConfig/islem.js')

var COMPONENT_authentication = require('./oturum_islemleri/authentication.js')

var COMPONENT_kullanici_tanimlari = require('./tanimlar/kullanici_tanimlari.js')
var COMPONENT_stok_kart_tanimlari = require('./tanimlar/stok_kart_tanimlari')
var COMPONENT_stok_kart_upload = require('./tanimlar/stok_kart_upload')

/////// UTOKEN VE LOGİN DURUMU SORGULAMA
router.use (async function(req, res, next) {

  if (req.url != "/authentication/login")
  {
    if (!req.headers['utoken'] || req.headers['utoken'] == "" || req.headers['utoken'] == "undefined")
    {
      res.send([{"S": "H", "HATA_KODU": "804", "HATA_ACIKLAMASI": "UTOKEN Hatası"}])
      res.end()
      return false
    }
    else
    {
      SONUC = await DBISLEM.SQL_CALISTIR("SP_W_T_KULLANICILAR @islem = 'K', @TOKEN = '" + req.headers['utoken'] + "', @IP = '" + req.connection.remoteAddress + "'")
      if (JSON.parse(SONUC.recordsets[0][0].DATA)[0].SONUC != "1")
      {
        res.send(JSON.parse(SONUC.recordsets[0][0].DATA))
        res.end()
        return false
      }
    }
  }

  next()
})
/////// UTOKEN VE LOGİN DURUMU SORGULAMA

router.use('/authentication', COMPONENT_authentication)

router.use('/kullaniciIslemleri', COMPONENT_kullanici_tanimlari)
router.use('/stokKartIslemleri', COMPONENT_stok_kart_tanimlari)
router.use('/stokKartUpload', COMPONENT_stok_kart_upload)

router.post('*', function(req, res){
  res.send([{"S": "H", "HATA_KODU": "803-1", "HATA_ACIKLAMASI": "Routher Hatası (admin_routing)"}])
  res.end()
})

module.exports = router