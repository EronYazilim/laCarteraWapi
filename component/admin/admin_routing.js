var express = require('express')
var router = express.Router()
var DBISLEM = require('../../dbConfig/islem.js')

var COMPONENT_authentication = require('./oturum_islemleri/authentication.js')
var COMPONENT_uploads = require('./diger/uploads.js')

var COMPONENT_kullanici_tanimlari = require('./tanimlar/kullanici_tanimlari.js')
var COMPONENT_stok_kart_tanimlari = require('./tanimlar/stok_kart_tanimlari')
var COMPONENT_stok_kart_upload = require('./tanimlar/stok_kart_upload')
var COMPONENT_bayi_tanimlari = require('./tanimlar/bayi_tanimlari.js')
var COMPONENT_bayi_kullanici_tanimlari = require('./tanimlar/bayi_kullanicilari.js')
var COMPONENT_siparis_tanimlari = require('./tanimlar/siparis_tanimlari.js')
var COMPONENT_satis_tanimlari = require('./tanimlar/satis_tanimlari.js')

/////// UTOKEN VE LOGİN DURUMU SORGULAMA
router.use (async function(req, res, next) {
  if (req.url != "/authentication/login" && !req.url.startsWith('/uploads/'))
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
router.use('/uploads', COMPONENT_uploads)

router.use('/kullaniciIslemleri', COMPONENT_kullanici_tanimlari)
router.use('/stokKartIslemleri', COMPONENT_stok_kart_tanimlari)
router.use('/stokKartUpload', COMPONENT_stok_kart_upload)
router.use('/bayiIslemleri', COMPONENT_bayi_tanimlari)
router.use('/bayiKullaniciIslemleri', COMPONENT_bayi_kullanici_tanimlari)
router.use('/siparisIslemleri', COMPONENT_siparis_tanimlari)
router.use('/satisIslemleri', COMPONENT_satis_tanimlari)

router.post('*', function(req, res){
  res.send([{"S": "H", "HATA_KODU": "803-1", "HATA_ACIKLAMASI": "Routher Hatası (admin_routing)"}])
  res.end()
})

module.exports = router