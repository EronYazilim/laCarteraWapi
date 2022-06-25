var ISLEM = function () { };

const sql = require('mssql')
var conn = require('./config.js')
const config = conn.connBilgileri

sql.on('error', err => {
    console.log("Hata(1) : " + err)
})

ISLEM.prototype.SQL_CALISTIR = async function(SQL_SORGU) {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request().query(SQL_SORGU)

        result1 = JSON.stringify(result1).replace(/__T__/g, "'")
        return JSON.parse(result1)
    } catch (err) {
        MESAJ = {"recordsets": [[{ "DATA":"[{\"S\":\"H\",\"HATA_KODU\":\"800\",\"HATA_ACIKLAMASI\":\""+err.message+"\",\"MESAJ\":\"\"}]"}]]}
        console.log(MESAJ)
        return MESAJ
    }
}

module.exports = new ISLEM()