'use strict';

var test = require('mocha-cases');

var parallel = require('../');

var context = {
	gulp: null,
	config: null,
	stream: null
};

var cases = {
	'should ...': {
		value: {
		},
		expected: {
		}
	}
};

function done(err, result) {
}

function runner(value, options) {
	var ctx;

	ctx = context;
	ctx.config = value.config;
	return parallel.call(ctx, done);
}

describe('parallel()', function () {
	test(cases, runner);
});
