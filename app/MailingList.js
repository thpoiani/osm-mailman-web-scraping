'use strict';

var phantomjs = require('webpage').create(),
    NOT_FOUND = '404 Not Found';

module.exports = function(url, year, month, callback) {
  console.log("Web Scraping: " + url);

  phantomjs.open(url, function(status) {
    if (status !== "success") {
      console.error("Erro ao acessar: " + url);
      return phantom.exit();
    }

    console.log(">> " + phantomjs.evaluate(getTitle));

    var pipermails = phantomjs.evaluate(getPiperMails),
        threads    = getThreads(pipermails, year, month);

    getSubjects(threads, callback);
  });
}

function getSubjects(threads, callback) {
  var subjects = [];

  function next() {
    var url = threads.shift();

    if (!url && callback && typeof callback === 'function') {
      return callback(subjects);
    }

    request(url);
  }

  function request(url) {
    console.log(url);

    phantomjs.open(url, function(status) {
      if (status !== "success") {
        console.error("Erro ao acessar: " + url);
        return phantom.exit();
      }

      var title = phantomjs.evaluate(getTitle)

      if (title !== NOT_FOUND) {
        subjects = subjects.concat(phantomjs.evaluate(getMails));
      } else {
        console.log(" > " + NOT_FOUND);
      }

      setTimeout(next, 100);
    });
  }

  next();
}

function getTitle() {
  return document.title;
}

function getPiperMails() {
  var listinfos  = document.querySelectorAll('a[href^=listinfo]'),
      pipermails = [];

  for (var i = 0; i < listinfos.length; i++) {
    var listinfo  = listinfos[i].href,
        pipermail = listinfo.replace('listinfo', 'pipermail');

    pipermails.push(pipermail);
  };

  return pipermails;
}

function getThreads(mails, year, month) {
  return mails.map(function(mail) {
    return mail + '/' + year + '-' + month + '/thread.html';
  });
}

function getMails() {
  var nodes = document.querySelectorAll('body>ul')[1].querySelectorAll('body>ul>li>a[href]'),
      mails = [];

  for (var i = 0; i < nodes.length; i++) {
    var mail = {
      text : nodes[i].innerText.trim(),
      url  : nodes[i].href
    };

    mails.push(mail);
  }

  return mails;
}
