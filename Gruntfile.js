module.exports = function(grunt) {
    var _pkg = grunt.file.readJSON('package.json');
    
    var _buildMinFilePath = 'dist/' + _pkg.name + '-' + _pkg.version + '.min.js';
    var _buildFilePath = 'dist/' + _pkg.name + '-' + _pkg.version + '.js';
    var _srcFilePaths = grunt.file.expand(_pkg.srcFiles);
    var _testFilePaths = grunt.file.expand((function() {
        var paths = [];
        for (var i = 0; _pkg.srcFiles.length > i; i++) {
            paths[i] = _pkg.srcFiles[i].replace(/^src\//, 'test/').replace(/\.js$/, '.test.html');
        }
        return paths;
    })());
    var _header = (function() {
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
        var header = '/*\n'
            + ' * ' + _pkg.name + '-' + _pkg.version + '.js [Built at ' + dateStr + ']\n'
            + ' * Copyright(c) ' + copyrightYearStr + ' ' + _pkg.author + ' (' + _pkg.url + ')\n'
            + ' * Released under the MIT license (http://opensource.org/licenses/mit-license.php)\n'
            + ' */\n\n';
        return header;
    })();
    
    var postProcess = function() {
        var options = this.options();
        var src = grunt.file.read(options.file);
        if (options.addHeader) src = _header + src;
        if (options.removeStrict) src = src.replace(/"use strict";/g, '');
        grunt.file.write(options.file, src);
    };
    
    // Configure tasks
    grunt.initConfig({
        clean: {
            build: {
                src: [_buildFilePath, _buildMinFilePath]
            },
            docs: {
                src: ['docs/*']
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
        qunit: {
            build: _testFilePaths
        },
        concat: {
            options: {
                // Add header after concat
                banner: _header,
                process: function(src, path) {
                    src
                    // Add horizontal line and file name
                    = '// ' + new Array(81).join('-') + '\n// ' + path.replace(/^.+\//, '') + '\n\n'
                    // Remove debug and jshint comments
                    + src.replace(/(^|\n)\/\/[^\n]*\n/g, '$1').replace(/(^|\n)\/\*[^\n]*\*\/\n/g, '$1');
                    return src;
                }
            },
            build: {
                src: _srcFilePaths,
                dest: _buildFilePath
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
                    res[_buildMinFilePath] = _buildFilePath;
                    return res;
                })()
            }
        },
        jsdoc: {
            build: {
                src: _srcFilePaths,
//                src: _buildFilePath,
                options: {
                    destination: 'docs'
//                    template: 'templates/default'
                }
            }
        },
        postprocess: {
            options: {
                file: _buildMinFilePath,
                addHeader   : true,
                removeStrict: true
            }
        }
    });
    
    // Load modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
//    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // Register tasks
    grunt.registerTask('postprocess', 'Custom tasks for built files', postProcess);
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean', 'jshint', 'qunit', 'concat', 'uglify', 'jsdoc', 'postprocess']);

};
