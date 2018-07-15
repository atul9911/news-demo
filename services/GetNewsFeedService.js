#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const Env = require('../utils/Env').default;
const RestClientUtil = require('../utils/RestClientUtil').default;
const Constants = require('../constants/Constants').constants;
const CachingUtils = require('../utils/CachingUtils').default;

function getFeedObj(cachingKey, options) {
  let response = CachingUtils.getKey(cachingKey);
  if (!response) {
    response = RestClientUtil.getRequest(options)
      .then((resp) => {
        CachingUtils.setKey(cachingKey, JSON.stringify(resp));
        return Promise.resolve(resp);
      })
      .catch(err => Promise.reject(err));
  }
  return response;
}

class GetNewsFeedService {
  async getNewsFeed(options) {
    let cachingKey = '';
    this.requestParams = {
      url: Constants.newsUrl,
      qs: {
        apiKey: Env.get('API_KEY')
      }
    };

    Constants.allowedParams.forEach(((x) => {
      if (options[x]) {
        this.requestParams.qs[x] = options[x];
        cachingKey += options[x];
      }
    }));
    const response = await getFeedObj(cachingKey, this.requestParams);
    return response;
  }
}

exports.default = GetNewsFeedService;

if (require.main === module) {
  (function unit() {
    const newsFeed = new GetNewsFeedService();
    newsFeed.getNewsFeed({
      category: 'business',
      country: 'india'
    }).then(() => {
      newsFeed.getNewsFeed({
        category: 'business',
        country: 'india'
      }).then(resp1 => console.log((resp1))).catch(err1 => console.log(err1));
    }).catch(err => console.log(err));
  }());
}
