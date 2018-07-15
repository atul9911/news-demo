#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const _constants = {
  allowedParams: ['category', 'country'],
  ttl: 1000 * 10 * 60,
  newsUrl : 'https://newsapi.org/v2/top-headlines',
  checkperiod : 60 * 60
};

class Constants {
  static get constants() {
    return _constants;
  }
}

exports.constants = Constants.constants;


if (require.main === module) {
  (function test() {
    console.log(Constants.constants);
  }());
}