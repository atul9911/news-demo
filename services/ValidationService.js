#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const ErrorUtils = require('../utils/ErrorUtils').default;
const Constants = require('../constants/Constants').constants;
const Validator = require('validator');
const _ = require('lodash');

class ValidationService {
  static getFeed(request) {
    if (!request.query || _.isEmpty(request.query)) {
      throw ErrorUtils.httpException(`Required Parameter missing ${Constants.allowedParams.join(',')}`, 400);
    }

    Object.keys(request.query).filter((x) => {
      if (!Constants.allowedParams.includes(x)) {
        throw ErrorUtils.invalidArgsException(x);
      }
      return true;
    });

    Constants.allowedParams.forEach((x) => {
      if (!request.query[x]) {
        throw ErrorUtils.httpException(`Required Parameter missing ${x}`, 400);
      }
      request.query[x] = request.query[x].replace(/[^a-zA-Z ]/g, '');
      if (!Validator.isAlphanumeric(request.query[x])) {
        throw ErrorUtils.invalidArgsException(x);
      }
    });
  }
}

exports.default = ValidationService;