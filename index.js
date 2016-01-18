'use strict';

/**
 * Recipe:
 * parallel
 *
 * Ingredients:
 * async, asnyc-done
 *
 * Note:
 *  Some kind of non-stream version of merge() stream recipe.
 *
 * @param done
 */
function parallel(done) {
	var async = require('async');
	var asyncDone = require('async-done');

	var gulp = this.gulp;
	var config = this.config;
	var helper = this.helper;
	var tasks = this.tasks;

	async.map(tasks, function (task, itemDone) {
		asyncDone(function (taskDone) {
			var context;

			context = {
				gulp: gulp,
				helper: helper,
				config: config
			};
			return task.call(context, taskDone);
		}, itemDone);
	}, done);
}

parallel.schema = {
	title: 'parallel',
	description: 'Run the tasks array of functions in parallel, without waiting until the previous function has completed.',
	type: 'object',
	properties: {}
};

parallel.type = 'flow';

module.exports = parallel;
