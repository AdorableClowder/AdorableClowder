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
        'Gruntfile.js', 'server.js', 'server/**.js', 'client/**.js', '!client/lib/**.js'
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
            'client/app/controllers/loginCtrl.js',
            'client/app/controllers/signupCtrl.js',
            'client/app/controllers/exploreCtrl.js',
            'client/app/controllers/profileCtrl.js',
            'client/app/app.js',
            'client/app/**.js',
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
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    concurrent: {
      dev: {
        tasks: ['jshint', 'nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
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

  //tasks
  grunt.registerTask('checkSyntax', ['jshint']);
  grunt.registerTask('build', ['checkSyntax', 'ngAnnotate', 'uglify']);

  grunt.registerTask('magic', '', function () {
    var taskList = [
      'concurrent',
      'jshint',
      'nodemon',
      'watch'
    ];
    grunt.task.run(taskList);
  });

  grunt.registerTask('default', ['githooks', 'magic']);
};
