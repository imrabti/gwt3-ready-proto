module.exports = function (grunt) {
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        config: {
            version: '1.0.0',
            bower: 'bower_components',
            public: 'src/main/webapp/static',
            less: 'src/main/less'
        },

        clean: {
            public: [
                '<%= config.public %>/css/**',
                '<%= config.public %>/fonts/**',
                '<%= config.public %>/img/**',
                '<%= config.public %>/js/*.js',
                '<%= config.public %>/js/*.swf',
                '!<%= config.public %>/js/mode-logfile.js',
                '!<%= config.public %>/js/theme-logfile.js'
            ]
        },

        copy: {
            resources: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/patternfly/dist/fonts',
                        src: '*',
                        dest: '<%= config.public %>/fonts'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.bower %>/font-awesome/fonts',
                        src: '*',
                        dest: '<%= config.public %>/fonts'
                    }
                ]
            }
        },

        concat: {
            /*
             * Order
             * 1) jQuery
             * 2) Bootstrap + Components
             * 3) C3 / D3
             * 4) Datatables
             * 5) Other JS libs (in no specific order)
             * 6) PatternFly
             */
            dev: {
                src: [
                    '<%= config.bower %>/jquery/dist/jquery.js',
                    '<%= config.bower %>/bootstrap/dist/js/bootstrap.js',
                    '<%= config.bower %>/bootstrap-select/dist/js/bootstrap-select.js',
                    '<%= config.bower %>/bootstrap-switch/dist/js/bootstrap-switch.js',
                    '<%= config.bower %>/c3/c3.js',
                    '<%= config.bower %>/d3/d3.js',
                    '<%= config.bower %>/datatables.net/js/jquery.dataTables.js',
                    '<%= config.bower %>/datatables.net-buttons/js/dataTables.buttons.js',
                    '<%= config.bower %>/datatables.net-keytable/js/dataTables.keyTable.js',
                    '<%= config.bower %>/datatables.net-select/js/dataTables.select.js',
                    '<%= config.bower %>/typeahead.js/dist/typeahead.bundle.js',
                    '<%= config.bower %>/google-code-prettify/src/prettify.js',
                    '<%= config.bower %>/patternfly/dist/js/patternfly.js'
                ],
                dest: '<%= config.public %>/js/external.js'
            },
            prod: {
                options: {
                    banner: '/*!\n' +
                    ' * External JS files for Gwt3ReadyProto <%= config.version %>\n' +
                    ' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
                    ' */\n\n',
                    stripBanners: true
                },
                src: [
                    '<%= config.bower %>/jquery/dist/jquery.min.js',
                    '<%= config.bower %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= config.bower %>/bootstrap-select/dist/js/bootstrap-select.min.js',
                    '<%= config.bower %>/bootstrap-switch/dist/js/bootstrap-switch.min.js',
                    '<%= config.bower %>/c3/c3.min.js',
                    '<%= config.bower %>/d3/d3.min.js',
                    '<%= config.bower %>/datatables.net/js/jquery.dataTables.min.js',
                    '<%= config.bower %>/datatables.net-buttons/js/dataTables.buttons.min.js',
                    '<%= config.bower %>/datatables.net-keytable/js/dataTables.keyTable.min.js',
                    '<%= config.bower %>/datatables.net-select/js/dataTables.select.min.js',
                    '<%= config.bower %>/typeahead.js/dist/typeahead.bundle.min.js',
                    '<%= config.bower %>/google-code-prettify/bin/prettify.min.js',
                    '<%= config.bower %>/patternfly/dist/js/patternfly.min.js'
                ],
                dest: '<%= config.public %>/js/external.min.js'
            }
        },

        less: {
            target: {
                options: {
                    banner: '/*\n' +
                    ' * Generated CSS file for Gwt3ReadyProto <%= config.version %>\n' +
                    ' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
                    ' */\n\n',
                    paths: ['<%= config.less %>'],
                    strictMath: true
                },
                src: '<%= config.less %>/myapp.less',
                dest: '<%= config.public %>/css/myapp.css'
            }
        },

        postcss: {
            target: {
                options: {
                    processors: [
                        require('pixrem')(),
                        require('autoprefixer')({browsers: ['last 3 versions', 'ie 9']})
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.public %>/css',
                    src: 'myapp.css',
                    dest: '<%= config.public %>/css'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.public %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.public %>/css',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            less: {
                files: ['<%= config.less %>/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('dev', [
        'clean',
        'copy',
        'concat:dev',
        'less',
        'postcss'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'copy',
        'concat:prod',
        'less',
        'postcss',
        'cssmin'
    ]);

    grunt.registerTask('default', ['dev']);
};
