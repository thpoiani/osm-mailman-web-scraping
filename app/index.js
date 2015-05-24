'use strict';

var Mailing  = require('./MailingList.js'),
    LISTINFO = 'https://lists.openstreetmap.org/listinfo',
    MONTH    = 'May',
    YEAR     = 2015;

Mailing(LISTINFO, YEAR, MONTH, function(subjects) {

  console.log(JSON.stringify(subjects));

});
