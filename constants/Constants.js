#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const _constants = {
  allowedParams: ['category', 'country'],
  ttl: 1000 * 60 * 60
};

class Constants {
  static get constants() {
    return _constants;
  }
}

exports.default = Constants.constants;


if (require.main === module) {
  (function test() {
    console.log(Constants.constants);
  }());
}