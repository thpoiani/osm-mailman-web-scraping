'use strict';

var constants = require('./config/consts'),
    page      = require('webpage').create(),
    fs        = require('fs');

page.open(constants.OSM_LISTINFO, function(status) {
  if(status === "success") {
    console.error("Erro ao acessar: " + constants.OSM_LISTINFO)
  }

  phantom.exit();
});
