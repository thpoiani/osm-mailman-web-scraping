'use strict';

var Mailing  = require('./MailingList.js'),
    system   = require('system'),
    args     = system.args,
    fs       = require('fs'),
    YEAR     = args[1] || 2015,
    MONTH    = args[2] || 'May',
    LISTINFO = args[3] || 'https://lists.openstreetmap.org/listinfo';

Mailing(LISTINFO, YEAR, MONTH, function(subjects) {
  var filename = './output/' + YEAR + '-' + MONTH + '.json',
      content  = JSON.stringify(subjects);

  fs.write(filename, content, 'w');
  phantom.exit();
});
