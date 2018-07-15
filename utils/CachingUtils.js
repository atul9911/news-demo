#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const NodeCache = require('node-cache');
const Constants = require('../constants/Constants').constants;
const myCache = new NodeCache({
  stdTTL: Constants.ttl,
  checkperiod: Constants.checkperiod
});

class CachingUtils {
  static setKey(k, v = {}) {
    const response = myCache.set(k, v);
    return response;
  }

  static getKey(k) {
    let response = myCache.get(k);
    if (response) {
      response = JSON.parse(response);
    }
    return response;
  }
}

exports.default = CachingUtils;