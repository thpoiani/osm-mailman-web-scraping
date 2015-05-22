'use strict';

var constants = require('./config/consts'),
    page      = require('webpage').create(),
    fs        = require('fs');

page.open(constants.OSM_LISTINFO, function(status) {
  if(status !== "success") {
    console.error("Erro ao acessar: " + constants.OSM_LISTINFO)
    return phantom.exit();
  }

  var MailingList = (function() {
    var exports = {},
        listinfo,
        pipermail;

    function getInfoLists() {
      return page.evaluate(function() {
        var matches = document.querySelectorAll('a[href^=listinfo]'),
            nodes   = [];

        for (var i = 0; i < matches.length; i++) {
          nodes.push(matches[i].href);
        };

        return nodes;
      });
    }

    function getPiperMails() {
      return getInfoLists().map(function(info) {
        return info.replace('listinfo', 'pipermail');
      });
    }

    exports.getThread = function (month, year) {
      return getPiperMails().map(function(mail) {
        return mail += '/' + year + '-' + month + '/thread.html';
      });
    }

    exports.title = page.evaluate(function() {
        return document.title;
    });

    return exports;
  })();

  console.log(MailingList.title);

  var april = MailingList.getThread('April', 2015),
      may   = MailingList.getThread('May', 2015);

  phantom.exit();
});
