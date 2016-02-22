'use strict';
var HTMLMinifier = require('html-minifier').minify;

module.exports = function (content, blocks, minifyHTML, cacheBust, config) {
	var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

	blocks.forEach(function (block) {
		var blockLines = block.raw.join(linefeed);

		if (block.type === 'js') {
			var defer = block.defer ? 'defer ' : '';
			var async = block.async ? 'async ' : '';

			content = content.replace(blockLines, block.indent + '<script ' + defer + async + 'src="' + block.dest + (cacheBust ? '?' + new Date().toJSON() : '') + '"><\/script>');
		}
		else if (block.type === 'css') {
			content = content.replace(blockLines, block.indent + '<link rel="stylesheet" href="' + block.dest + (cacheBust ? '?' + new Date().toJSON() : '') + '">');
		}
		else if (block.type === 'livereload') {
			content = content.replace(blockLines + linefeed, '');
		}
	});

	if (minifyHTML) {
		content = HTMLMinifier(content, config.htmlminifier);
	}

	return content;
};
