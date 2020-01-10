
// Configuration for Node-RED-nodes project
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc:true     // Use external jshinrc file configured as below
            },
            all: {
                src: ['*.js'],
                filter: function(filepath) { // on some developer machines the test coverage HTML report utilities cause further failures
                    if ((filepath.indexOf("coverage/") !== -1) || (filepath.indexOf("node_modules") !== -1)) {
                        console.log( "\033[30m  filtered out \033[32m:\033[37m " + filepath + "\033[0m");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
        },
        nwjs: {
            options: {
                platforms: ['osx64'],
                buildDir: './dist', // Where the build version of my NW.js app is saved
            },
            src: ['./src/*'] // Your NW.js app
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nw-builder');

    grunt.registerTask('default', ['jshint:all']);
    grunt.registerTask('build', ['jshint:all', 'nwjs']);
};
