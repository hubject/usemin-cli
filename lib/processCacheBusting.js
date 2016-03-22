// rename files
var mv = require('mv');
var fs = require('fs');

module.exports = function (blocks, destDir, shouldBustMaps) {

	blocks.forEach(function (block) {

		var origName = block.dest;
		var origPath = [destDir, origName].join('/');
		block.dest = block.dest.replace(/\.(js|css)$/, '.' + Date.now() + '.$1');
		var bustedPath = [destDir, block.dest].join('/');

		if(shouldBustMaps) {

			var origMapPath = origPath + '.map';
			var bustedMapPath = bustedPath + '.map';

			fs.access(origMapPath, fs.W_OK, function (err) {

				if (!err) {

					mv(origMapPath, bustedMapPath, function (err) {
						if (err) throw err;
					});
				}
			});
		}

		mv(origPath, bustedPath, function (err) {
			if (err) throw err;
		});
	});
};
