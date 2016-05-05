module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
          main: {
            options: {
              browsers: ['> 1%', 'last 2 versions', 'ie >= 8'],
              map: true
            },
            src: 'css/*.css'
          }
        },

        clean: [".sass-cache"],

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        scsslint: {
            files: 'sass/**/*.scss',
            options: {
                config: '.scss-lint.yml',
                reporterOutput: null,
                colorizeOutput: true,
                compact: true,
                // force: true
            }
        },

        watch: {
            css: {
                files: 'sass/**/*.scss',
                tasks: ['scsslint', 'sass', 'autoprefixer'],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true
                }
            }
        }
    });

    // on watch events configure scsslint to only run on changed file
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('scsslint.files', filepath);
    });

    grunt.registerTask('default', ['clean', 'sass', 'autoprefixer', 'watch']);

    // plugin tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-scss-lint');
}