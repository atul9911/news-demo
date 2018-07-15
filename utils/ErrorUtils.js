#!/usr/bin/env node

/* eslint strict: 0 */

'use strict';

const NE = require('node-exceptions');

class ErrorUtils extends NE.LogicalException {
  static invalidArgsException(...args) {
    throw new NE.InvalidArgumentException(`Invalid args ${args.join(',')}`, 400);
  }

  static httpException(message = 'Bad Request', status = 400) {
    throw new NE.HttpException(message, status);
  }
}


exports.default = ErrorUtils;