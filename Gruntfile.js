module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githooks: {
      all: {
        'pre-commit': 'default'
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-githooks');

  // Default task(s).
  grunt.registerTask('default', ['ngAnnotate', 'uglify']);

};
