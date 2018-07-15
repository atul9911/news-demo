#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const Request = require('request-promise');
const Env = require('./Env').default;
const Util = require('util');

class RestClientUtil {
  static async getRequest(options) {
    this.requestOptions = {
      method: 'GET',
      uri: options.url,
      json: true
    };
    if (options.qs) {
      this.requestOptions.qs = options.qs;
    }

    Util.log(`Got an api request with parameters: ${JSON.stringify(this.requestOptions)}`);

    const response = await Request(options).then(body => body).catch((err) => {
      throw err;
    });
    return response;
  }
}

exports.default = RestClientUtil;

if (require.main === module) {
  (function getTest() {
    RestClientUtil.getRequest({
      url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Env.get('API_KEY')}`
    }).then((resp) => {
      console.log(resp);
    });
  }());
}