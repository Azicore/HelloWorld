module.exports = function(grunt) {
	var _pkg = grunt.file.readJSON('package.json');
	
	var _buildMinFilePath = 'dist/' + _pkg.name + '-' + _pkg.version + '.min.js';
	var _buildFilePath = 'dist/' + _pkg.name + '-' + _pkg.version + '.js';
	var _srcFilePaths = grunt.file.expand(_pkg.srcFiles);
	
	
	var postProcess = function() {
		var addHeader = (function() {
			var date = new Date();
			var dateStr = (function(d) {
				var str = d.getFullYear()
					+ '-' + ('0' + -~d.getMonth()).substr(-2)
					+ '-' + ('0' + d.getDate()).substr(-2)
					+ ' ' + ('0' + d.getHours()).substr(-2)
					+ ':' + ('0' + d.getMinutes()).substr(-2)
					+ ':' + ('0' + d.getSeconds()).substr(-2)
					+ '+0900';
				return str;
			})(date);
			var copyrightYearStr = (function(d) {
				var thisYear = date.getFullYear();
				return !_pkg.firstRelease || _pkg.firstRelease === thisYear ? thisYear : _pkg.firstRelease + '-' + thisYear;
			})(date);
			return function(src) {
				var header = '/*\n'
					+ ' * ' + _pkg.name + '-' + _pkg.version + '.js [' + dateStr + ']\n'
					+ ' * Copyright(c) ' + copyrightYearStr + ' @Azicore (http://azisava.sakura.ne.jp/)\n'
					+ ' * Released under the MIT license (http://opensource.org/licenses/mit-license.php)\n'
					+ ' */\n\n';
				return header + src;
			};
		})();
		var replaceTabs = function(src) {
			return src.replace(/(^|\n)\t+($|\n)/g, '$1$2').replace(/\t/g, '    ');
		};
		var removeJshint = function(src) {
			return src.replace(/\n\/\/ jshint[^\n]+/g, '');
		};
		var i, src, options = this.options();
		for (i = 0; options.files.length > i; i++) {
			src = grunt.file.read(options.files[i]);
			if (options.addHeader) src = addHeader(src);
			if (options.replaceTabs) src = replaceTabs(src);
			if (options.removeJshint) src = removeJshint(src);
			grunt.file.write(options.files[i], src);
		}
	};
	
	// Configure tasks
	grunt.initConfig({
		concat: {
			options: {},
			dist: {
				src: _srcFilePaths,
				dest: _buildFilePath
			}
		},
		jshint: {
			options: {
				'-W041'      : false, // false: Allow "==" for comparison with 0
				eqnull       : true, // true: Allow "==" for comparison with null
				freeze       : true, // true: Prohibit extending native objects
				futurehostile: true, // true: Prohibit using future reserved keywords
				latedef      : true, // true: Prohibit using a local variable before it is defined
				singleGroups : true, // true: Detect unnecessary parenthesis
				strict       : true, // true: Force to use strict mode
				unused       : true, // true: Detect unused local variables
				undef        : true, // true: Prohibit using undefined variables
				globals: {
					window: false,
					module: false
				}
			},
			build: {
				src: _srcFilePaths
			}
		},
		uglify: {
			options: {
				maxLineLen: 500,
				ASCIIOnly: true
			},
			build: {
				files: (function() {
					var res = {};
					res[_buildMinFilePath] = _srcFilePaths;
					return res;
				})()
			}
		},
		qunit: {
			all: ['test/*.html']
		},
		jsdoc: {
			dist: {
				src: _srcFilePaths,
//				src: ['src/*.js'],
				options: {
					destination: 'docs'
//					template: 'templates/default'
				}
			}
		},
		postprocess: {
			options: {
				files: [_buildMinFilePath, _buildFilePath],
				addHeader: true,
				replaceTabs: true,
				removeJshint: true
			}
		}
	});
	
	// Load modules
	grunt.loadNpmTasks('grunt-contrib-concat');
//	grunt.loadNpmTasks('grunt-contrib-clean');
//	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	
	// Register tasks
	grunt.registerTask('postprocess', 'Custom tasks for built files', postProcess);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['jshint:build', 'qunit', 'concat', 'uglify', 'jsdoc', 'postprocess']);

};
