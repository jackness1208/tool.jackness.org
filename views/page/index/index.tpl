<!doctype html>
{% html class="tool_html" %}
    {% head %}
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telphone=no, email=no" />
        <meta name="renderer" content="webkit">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="HandheldFriendly" content="true">
        <meta name="MobileOptimized" content="320">
        <meta name="screen-orientation" content="portrait">
        <meta name="x5-orientation" content="portrait">
        <meta name="msapplication-tap-highlight" content="no">
        <link rel="icon" href="favicon.ico" />
        {# title需要使用title标签包裹起来 #}
        {% title %}{{title}}{% endtitle%}
        {# 引用模块 #}
        {% require $id="views/page/index/index.css" %}
        {% require $id="views/lib/pagelet.js" %}
        {% require $id="views/lib/md.js" %}
        {% require $id="views/lib/jns.js" %}
        {# 页面中执行的脚本 #}
        {% script %}
            // 监听页面点击事件，自动加载pagelet
            pagelet.autoload('main');
        {% endscript %}
    {% endhead %}
    {% body class="tool_body" %}
    	<div class="tool_bodyarea" id="bodyArea">
            <a href="javascript:;" class="tool_slide_btn" id="slideBtn" hidefocus><span><i>展开收起</i></span></a>
            <div class="tool_side">
                <a href="http://www.jackness.org/" class="tool_logo">jackNEss窝窝</a>
                {% require $id='widget/c-nav' %}
                
            </div>
            <div class="tool_main" data-papelet='main'>
                <div class="tool_ins_tl" id="widgetTl">{{widgetTitle}}</div>
                <div class="tool_ins_bodyarea">
                {% pagelet $id="main"%}
                {% require $id=pageUrl %}
                {% endpagelet %}
                </div>
            </div>
        </div>
        {% require $id='widget/c-frameset' %}
        {% script %}
        {% endscript %}
    {% endbody %}
    <!--livereload-->
{% endhtml %}
