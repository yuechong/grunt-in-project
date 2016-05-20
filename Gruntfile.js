module.exports = function(grunt) {
    //grunt 配置项目目录
    var config = {
        //app:'',
        dist:'dist',    //导出到此目标文件
        js:'js',        //js目录
        css:'css'       //css目录
    };

    grunt.initConfig({

        config:config,

        concat: {
            js: {
                src: ['<%= config.js %>/**/*.js'],                      //要合并的js文件
                dest: '<%= config.dist %>/<%= config.js %>/built.js'    //合并到该目标文件
            },
            css: {
                src: ['<%= config.css %>/**/*.css'],                    //要合并的css文件
                dest: '<%= config.dist %>/<%= config.css %>/style.css'  //合并到该目标文件
            }
        },
        //css文件压缩
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/<%= config.css %>',    //css目录
                    src: ['*.css', '!*.min.css'],                   //压缩文件
                    dest: '<%= config.dist %>/<%= config.css %>',   //压缩到该目标文件
                    ext: '.min.css'                                 //扩展名
                }]
            }
        },
        //js文件压缩
        uglify: {
            dist: {
                files:  [{
                    expand: true,
                    cwd: '<%= config.dist %>/<%= config.js %>',     //js目录
                    src: ['*.js', '!*.min.js'],                     //压缩文件
                    dest: '<%= config.dist %>/<%= config.js %>',    //压缩到该目标文件
                    ext: '.min.js'                                  //扩展名
                }]
            }
        },
        watch: {
            js: {
                files: ['<%= config.js %>/**/*.js'],
                tasks: ['concat:js','uglify']
            },
            css: {
                files: ['<%= config.css %>/**/*.css'],
                tasks: ['concat:css','cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['watch']);

};
