'use strict';

var schema = {
	title: 'parallel',
	description: 'Run sub tasks in parallel, without waiting until the previous task has completed.',
	type: 'object',
	properties: {}
};

function parallel(done) {
	var async = require('async');
	var asyncDone = require('async-done');

	var gulp = this.gulp;
	var config = this.config;
	var helper = this.helper;
	var tasks = this.tasks;

	if (gulp._settle) {
		async.map(tasks, runSettle, doneSettle);
	} else {
		async.map(tasks, runTask, done);
	}

	function runSettle(task, doneTask) {
		return runTask(task, function (err, result) {
			var state;

			if (err) {
				state = {
					state: 'error',
					value: err
				};
			} else {
				state = {
					state: 'success',
					value: result
				};
			}
			doneTask(null, state);
		});
	}

	function doneSettle(err, result) {
		var errors, results;

		if (err) {
			done(err, result);
			return;
		}

		errors = null;
		results = null;
		if (result) {
			errors = result.map(function (item) {
				return item.state === 'error' ? item.value : null;
			});
			results = result.map(function (item) {
				return item.state === 'success' ? item.value : null;
			});
		}
		done(errors, results);
	}

	function runTask(task, doneTask) {
		asyncDone(function (doneAsync) {
			var context;

			context = {
				gulp: gulp,
				helper: helper,
				config: config
			};
			return task.call(context, doneAsync);
		}, doneTask);
	}
}

module.exports = parallel;
module.exports.schema = schema;
module.exports.type = 'flow';
