#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

require('dotenv').config();
const _ = require('lodash');

class Env {
  static get(prop,
    defaultValue = null) {
    return _.get(process.env, prop,
      defaultValue);
  }
}

exports.default = Env;

if (require.main === module) {
  (function test() {
    console.log(`The testing env value:${Env.get('API_KEY')}`);
  }());
}
