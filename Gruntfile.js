module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githooks: {
      all: {
        'pre-commit': 'checkSyntax'
      }
    },
    jshint: {
      files: [
        'Gruntfile.js', 'server.js', 'server/**.js', 'client/**.js', '!client/lib/**.js', 'client/app/directives/*.js', 'client/app/factories/*.js', 'client/app/controllers/*.js', 'client/app/app.js'
      ],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    ngAnnotate: {
      options: {
        add: true,
        expand: false,
        singleQuotes: true
      },
      skillit: {
        files: {
          'client/build/<%= pkg.name %>.min.js': [
            'client/app/factories/factories.js',
            'client/app/controllers/**/*.js',
            'client/app/directives/directives.js',
            'client/app/app.js',
            'client/app/*.js',
            '!client/lib/**'
          ],
        },
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        options: {
          compress: true,
          mangle: true,
          sourceMap: true
        }
      },
      build: {
        src: [
          'client/build/<%= pkg.name %>.min.js'
        ],
        dest: 'client/build/<%= pkg.name %>.min.js'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    watch: {
        stylesheets: {
            files: 'client/assets/**/*.less',
              tasks: [ 'less:production' ]
        },
        // scripts: {
        //   files: '<%= jshint.files %>',
        //   tasks: [ 'build' ]
        // },
      jade: {
        files: 'client/app/**/*.jade',
        tasks: [ 'jade' ]
      }
    },
    concurrent: {
      dev: {
        tasks: ['jshint', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["client/assets/css"]
        },
        files: {
          "client/assets/css/styles.css": "client/assets/less/*.less"
        }
      },
      production: {
        options: {
          paths: ["client/assets/css"]
        },
        files: {
          "client/assets/css/styles.css": "client/assets/less/styles.less"
        }
      }
    },
    jade: {
      compile: {
        files: [{
          expand: true,
          cwd: 'client/app',
          src: [ '**/*.jade' ],
          dest: 'client/app',
          ext: '.html'
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');

  //tasks
  grunt.registerTask('checkSyntax', ['jshint']);
  grunt.registerTask('build', ['checkSyntax', 'ngAnnotate', 'uglify']);

  grunt.registerTask('magic', '', function () {
    var taskList = [
      'concurrent',
      'jshint',
      'nodemon'
    ];
    grunt.task.run(taskList);
  });

  grunt.registerTask('default', ['githooks', 'magic']);
};
