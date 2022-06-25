var con = function () { }

con.prototype.connBilgileri = {
    user        : 'eron_lacartera_crm_154865a5774586241',
    password    : '5JdHlM179gb6zxAcMjEjgVGYqP4RbTc6TgVR68Glb4yTEdv2xx',
    server      : 'db3.senyildiz.com.tr',
    port        : 61854,
    database    : 'ERON_075_LACARTERA_CRM',
    options: {
        enableArithAbort: false
    }
}

module.exports = new con()