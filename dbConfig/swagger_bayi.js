var SWAGGER_BAYI_HAZIRLA = function () { };

swaggerBayiDocument = require('../dbConfig/swagger_bayi.json');
var express = require('express');
var router = express.Router();
var fs = require('fs');

SWAGGER_BAYI_HAZIRLA.prototype.JSON_DAHIL_ET = async function(JSON_DATA) {
      
  return new Promise(resolve => {
        for (let index = 0; index < Object.keys(JSON_DATA).length; index++) {
          swaggerBayiDocument.paths[Object.keys(JSON_DATA)[index]] = Object.values(JSON_DATA)[index]          
        }
        resolve(swaggerBayiDocument)
      });
}

SWAGGER_BAYI_HAZIRLA.prototype.SWAGGER_BAYI_VIEW_KAYDET = async function() {
      
  return new Promise(resolve => {
    fs.writeFile('./dbConfig/swagger_bayi_view.json', JSON.stringify(swaggerBayiDocument, null, 4), function (err) {
      if (err) return console.log(err);
    });

        resolve(true)
      });
}

module.exports = new SWAGGER_BAYI_HAZIRLA()