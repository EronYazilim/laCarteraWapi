var SWAGGER_ADMIN_HAZIRLA = function () { };

swaggerAdminDocument = require('../dbConfig/swagger_admin.json');
var express = require('express');
var router = express.Router();
var fs = require('fs');

SWAGGER_ADMIN_HAZIRLA.prototype.JSON_DAHIL_ET = async function(JSON_DATA) {
      
  return new Promise(resolve => {
        for (let index = 0; index < Object.keys(JSON_DATA).length; index++) {
          swaggerAdminDocument.paths[Object.keys(JSON_DATA)[index]] = Object.values(JSON_DATA)[index]          
        }
        resolve(swaggerAdminDocument)
      });
}

SWAGGER_ADMIN_HAZIRLA.prototype.SWAGGER_ADMIN_VIEW_KAYDET = async function() {
      
  return new Promise(resolve => {
    fs.writeFile('./dbConfig/swagger_admin_view.json', JSON.stringify(swaggerAdminDocument, null, 4), function (err) {
      if (err) return console.log(err);
    });

        resolve(true)
      });
}

module.exports = new SWAGGER_ADMIN_HAZIRLA()