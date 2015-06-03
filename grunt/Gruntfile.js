module.exports = function(grunt) {
    var fs = require("fs"),
        chalk = require('chalk'),
        initHandle = require('./tasks/init.js'),
        global = {
            onlinePath:'',
            source:{
                'tool':{
                    'path':{
                        test:''
                    },
                    'js':[
                        {
                            src:[
                                '../js/common/jns/jns/1.0.0/jns.js',
                                '../js/main/src/main.js'
                            ],
                            dest:'../js/main/dist/main.min.js'
                        }
                        
                    ],
                    'css':[
                        '../css/*.css'
                    ],
                    'img':[
                        '../images/**'
                    ]
                }
            }
        };


    // 项目配置
    grunt.initConfig(initHandle({
        pkg: grunt.file.readJSON('package.json')
    },global.source,grunt));
    

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 加载提供"concat"任务的插件
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 加载提供"watch"任务的插件
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 加载提供"copy"任务的插件
    grunt.loadNpmTasks('grunt-contrib-copy');


    // 注册任务
    grunt.registerTask('default', function(name) {

        if (name) {
            grunt.task.run(['uglify:' + name]);

        } else {
            grunt.task.run(['uglify']);

        }


    });

}