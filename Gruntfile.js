// Generated on 2015-01-20 using generator-web 0.2.5

'use strict';
var LIVERELOAD_PORT = 35720,
	SERVER_PORT = 9000,
	lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
	mountFolder = function (connect, dir) {
		return connect.static(require('path').resolve(dir));
	};

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

    // Define the configuration for all the tasks
	grunt.initConfig({
        // Project settings
		yeoman: yeomanConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                spawn: false,
                livereload: LIVERELOAD_PORT
            },
			 less: {
				files: '<%= yeoman.app %>/_less/{,*/}*.less',
				tasks: ['less:dev']
			},
			styles: {
				files: [
					'<%= yeoman.app %>/_lib/bootstrap_custom/css/{,*/}*.css'
				],
				tasks: ['newer:copy:server', 'autoprefixer']
			},
            livereload: {
                files: [
					'Gruntfile.js',
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
		connect: {
			options: {
				port: SERVER_PORT,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'bower_components'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},

		//Open in a new browser window
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

		htmlmin: {
			dist: {
				files: [
				{
				 '<%= yeoman.dist %>/skin.html': '<%= yeoman.app %>/index.html'
				}]
			}
		},

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                },
				{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/style.css': ['.tmp/concat/style.css']
				}
			}
        },

		// Empties folders to start fresh
		clean: {
			dist: ['.tmp', '<%= yeoman.dist %>/*'],
			server: '.tmp'
		},

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: '<%= yeoman.app %>/',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt,xml}',
                            '.htaccess'
                        ]
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '<%= yeoman.dist %>/images/',
						src: 'font-awesome/fonts/*.*'

					},
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: 'bower_components/',
                        dest: '<%= yeoman.dist %>/images/',
                        src: [
							'respond/dest/respond.min.js',
							'html5shiv/dist/html5shiv.js'
                        ]
                    },
					{
						expand: true,
						flatten: true,
						src: ['.tmp/scripts/modernizr.js'],
						dest: '<%= yeoman.dist %>/images/'
					}
                ]
            },

			server: {
				files: [
					{
						expand: true,
						flatten: true,
						cwd: '<%= yeoman.app %>/_lib/bootstrap_custom/css',
						dest: '.tmp/styles/',
						src:  '{,*/}*.css'
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/',
						dest: '.tmp/styles/fonts/',
						src:  'font-awesome/fonts/*.*'
					}
				]
			}
        },

		 // less file
		less: {
		  dev: {
			  files: {
				  '.tmp/styles/style.css': '<%= yeoman.app %>/_less/_less_source.less'
				}
		  }
		},

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
		jscs: {

			options: {
				config: '.jscsrc'
			},
			files: [
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			]
		},

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '.tmp/scripts/modernizr.js',
                files: {
					src: [
						'.tmp/scripts/{,*/}*.js',
						'.tmp/styles/{,*/}*.css'
					]
				},
                uglify: true
            }
        }
    });


	grunt.registerTask('build', [
        'clean:dist',
        'modernizr',
		'useminPrepare',
		'less:dev',
		'concat',
		'htmlmin',
		'cssmin',
		'imagemin',
		'jshint',
		'uglify',
		'usemin',
        'copy:dist'
    ]);

	grunt.registerTask('serve', [
		'clean:server',
		'less:dev',
		'copy:server',
		'modernizr',
		'jshint',
		'connect:livereload',
		'open:server',
		'watch'
	]);

	grunt.registerTask('default', [
        'jshint'
    ]);
};
