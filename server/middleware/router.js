'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/huangli/index');
});

router.get('/api', function (req, res) {
    res.json({title: 123});
});

router.get('/:page/index', function(req, res, next){
    req.url = 'page/index';

    var pageUrl = 'pages/p-' + req.params.page,
        page = req.params.page,
        is404 = true,
        pageTitle = '',
        navs = [
            {
                title:'程序员老黄历', 
                id: 'huangli',
                current: false
            },{
                title:'程序员求签', 
                id: 'qiuqian',
                current: false
            },{
                title:'二维码生成', 
                id: 'qrcode',
                current: false
            },{
                title:'测试', 
                id: 'test',
                current: false
            }
        ];

    navs.forEach(function(nav){
        if(nav.id == page){
            nav.current = true;
            pageTitle = nav.title;
            is404 = false;
        }
    });


    res.locals.pageUrl = pageUrl;
    res.locals.navs = navs;
    res.locals.title = 'jackNEss 窝窝 - ' + pageTitle;
    res.locals.widgetTitle = pageTitle;

    

    if(is404){
        res.render('page/404',{status: 404, title: '页面不存在'});
    } else {
        // console.log('this way', res.locals)
        res.render('page/index', res.locals);
    }
    
});

router.get('*', function(req, res, next){
    res.render('page/404',{status: 404, title: '页面不存在'});
});


module.exports = function (options) {
    router.options = options || {};
    return router;
};