{% require $id="resource/base.css" %}
<div class="p-qrcode-main">
    <div class="block">
        <div class="left">
            <div class="row">
                <ul class="rowleft" id="fntab">
                    <li class="active" rel="text"><a href="javascript:" class="a1" title="文本"><span>文本</span></a></li>
                    <li rel="card"><a href="javascript:" class="a2" title="名片"><span>名片</span></a></li>
                    <li rel="url"><a href="javascript:" class="a3" title="网址"><span>网址</span></a></li>
                    <li rel="sms"><a href="javascript:" class="a4" title="短信"><span>短信</span></a></li>
                    <li rel="wifi"><a href="javascript:" class="a5" title="WiFi"><span>WiFi</span></a></li>
                    <li rel="telephone"><a href="javascript:" class="a6" title="电话"><span>电话</span></a></li>
                    <li rel="mail"><a href="javascript:" class="a7" title="邮箱"><span>邮箱</span></a></li>
                </ul>
                <div class="rowright">

                    <div class="fnbox" id="fnbox">
                        <!--文本-->
                        <div class="sub show">
                            <div class="tit"><span>即时输入即时生成!</span>输入文字</div>
                            <textarea class="text default" id="text_text" autocomplete="off">支持文本、网址和电子邮箱</textarea>
                            <div class="size">已输入字数：<span id="text_size">0</span>/300</div>
                        </div>

                        <!--名片-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入联系人信息</div>
                            <ul class="card">
                                <li>
                                <label>姓名</label>
                                <input id="card_n" class="dinput" maxlength="50" type="text">
                                </li>
                                <li>
                                <label>电话</label>
                                <input id="card_tel" class="dinput short" maxlength="30" type="text">
                                <select class="type">
                                    <option selected="selected" value="0">手机</option>
                                    <option value="1">电话</option>
                                </select>
                                <div class="addelem"><a href="javascript:" id="addelem">+ 添加电话号码</a></div>
                                </li>
                                <li class="litel" id="litel">
                                <label>电话</label>
                                <input id="card_phone" class="dinput short" maxlength="30" type="text">
                                <select class="type">
                                    <option selected="selected" value="0">手机</option>
                                    <option value="1">电话</option>
                                </select>
                                <a href="javascript:" class="close" id="hidetel"><img src="resource/close.gif"></a>
                                </li>
                                <li>
                                <label>QQ</label>
                                <input id="car_note" class="dinput" maxlength="30" type="text">
                                </li>
                                <li>
                                <label>电子邮箱</label>
                                <input id="card_mail" class="dinput" maxlength="80" type="text">
                                </li>
                                <li>
                                <label>单位</label>
                                <input id="card_org" class="dinput" maxlength="100" type="text">
                                </li>
                                <li>
                                <label>职位</label>
                                <input id="card_til" class="dinput" maxlength="30" type="text">
                                </li>
                                <li>
                                <label>网址</label>
                                <input value="http://" id="card_url" class="dinput" maxlength="255" type="text">
                                </li>
                                <li>
                                <label>地址</label>
                                <input id="card_adr" class="dinput" maxlength="255" type="text">
                                </li>
                            </ul>
                        </div>

                        <!--网址-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入URL网址</div>
                            <div class="urltype">
                                <p><span>专用链接</span><input id="urloptions" type="checkbox"></p>
                                <ul id="urlset">
                                    <!--<li class="weixin"><input type="radio" name="url" rel="weixin" id="wpublic"/>公共<span><input type="radio" name="url" rel="weixin" id="wpersonal"/>个人</span></li>-->
                                    <li class="sina"><input name="url" rel="sina1" id="spersonal" type="radio">个人<span><input name="url" rel="sina2" id="sofficial" type="radio">官微</span></li>
                                    <li class="taobao"><input name="url" rel="item" id="titem" type="radio">商品<span><input name="url" rel="shop" id="tshop" type="radio">店铺</span></li>
                                </ul>
                            </div>
                            <div class="urlbox">
                                <input class="url" id="url_url" value="http://" maxlength="255" type="text">
                                <div class="size" id="msg">输入网址</div>
                            </div>
                        </div>

                        <!--短信-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入短信内容</div>
                            <textarea class="sms_text" id="sms_sms"></textarea>
                            <div class="size">已输入数字：<span id="sms_len">0</span>/300</div>
                            <div class="sms">
                                <label>手机号码</label>
                                <input id="sms_tel" class="dinput" maxlength="30" type="text">
                            </div>
                        </div>

                        <!--WIFI-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入WiFi帐号信息</div>
                            <ul class="card">
                                <li>
                                <label>网络账号</label>
                                <input id="wifi_ssid" class="dinput" maxlength="30" type="text">
                                </li>
                                <li>
                                <label>密码</label>
                                <input id="wifi_p" class="dinput" maxlength="50" type="text">
                                </li>
                                <li>
                                <label>加密类型</label>
                                <select class="wifitype" id="wifi_t">
                                    <option selected="selected" value="WPA">WPA/WPA2</option>
                                    <option value="WEP">WEP</option>
                                    <option value="nopass">无加密</option>
                                </select>
                                </li>
                            </ul>
                        </div>

                        <!--电话-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入电话号码</div>
                            <div class="ininput">
                                <label>手机号码</label>
                                <input id="telephone_tel" class="dinput" maxlength="30" type="text">
                            </div>
                        </div>

                        <!--邮箱-->
                        <div class="sub">
                            <div class="tit"><span>即时输入即时生成!</span>输入电邮地址</div>
                            <div class="ininput">
                                <label>电子邮箱</label>
                                <input id="mail_mail" class="dinput" maxlength="80" type="text">
                            </div>
                        </div>

                    </div>

                    <div class="prompt">建议内容不超过150个汉字，使低配置手机也能扫描到结果。</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="canvas-wrap">
                <div class="canvas">
                    <canvas style="cursor: default;" height="300" width="300" id="canvas">
                        <a id="pic" target="_blank" href="" shorturl="/" rel="nofollow"><img id="qrcodeimg" src="resource/liantu.png"></a>
                    </canvas>
                </div>
            </div>
            <div id="diy_div" class="diy_div">
                <div class="diy_scroll">
                    <div style="" id="diy_dot" class="diy_dot"></div>
                </div>
                <div class="diy_statue">
                    <a id="resetRound1" href="javascript:">液态</a>
                    <a id="resetRound" href="javascript:">直角</a>
                    <a id="resetRound2" href="javascript:">圆角</a>
                </div>
            </div>

            <div class="fnrow">
                <div class="tab" id="tabset">
                    <span id="resetAll"><a href="javascript:">清除设置</a></span>
                    <a href="javascript:" class="tabelem active">颜色设置</a>
                    <a href="javascript:" class="tabelem">嵌入Logo</a>
                    <a href="javascript:" class="tabelem">嵌入文字</a>
                    <a href="javascript:" class="tabelem">其它设置</a>
                </div>
                <div class="fnblock" id="fnblock">
                    <div class="fnsubv show">
                        <ul class="colors">
                            <li class="li1">
                            <label>前景色</label>
                            <div class="color">
                                <input style="background-color: rgb(0, 0, 0);" id="fgcolor" name="mycolor" value="#000000" class="iColorPicker" type="text"><div id="icp_fgcolor" class="colorPicker-picker" style="background-color:#000000" onclick="iColorShow('fgcolor','icp_fgcolor');return false;"></div>
                            </div>
                            </li>
                            <li class="li2">
                            <label>渐变颜色</label>
                            <div class="color">
                                <input style="background-color: rgb(0, 0, 0);" id="gccolor" name="mycolor" value="#000000" class="iColorPicker" type="text"><div id="icp_gccolor" class="colorPicker-picker" style="background-color:#000000" onclick="iColorShow('gccolor','icp_gccolor');return false;"></div>
                            </div>
                            <a style="display: none;" href="javascript:" class="close" id="resetGcColor"><img src="resource/close.gif"></a>
                            </li>
                            <li class="li3">
                            <label>定位点(外框)</label>
                            <div class="color">
                                <input style="background-color: rgb(0, 0, 0);" id="ptcolor" name="mycolor" value="#000000" class="iColorPicker" type="text"><div id="icp_ptcolor" class="colorPicker-picker" style="background-color:#000000" onclick="iColorShow('ptcolor','icp_ptcolor');return false;"></div>
                            </div>
                            <a style="display: none;" href="javascript:" class="close" id="resetPtColor"><img src="resource/close.gif"></a>
                            </li>

                            <li class="li4">
                            <label>背景色</label>
                            <div class="color">
                                <input style="background-color: rgb(255, 255, 255);" id="bgcolor" name="mycolor" value="#ffffff" class="iColorPicker" type="text"><div id="icp_bgcolor" class="colorPicker-picker" style="background-color:#ffffff" onclick="iColorShow('bgcolor','icp_bgcolor');return false;"></div>
                            </div>
                            </li>
                            <li class="li5">
                            <label>渐变方式</label>
                            <select id="gradientWay">
                                <option value="0">无</option>
                                <option value="circular">圆形</option>
                                <option value="backslash" selected="selected">反斜线</option>
                                <option value="slash">斜线</option>
                                <option value="horizontal">水平</option>
                                <option value="vertical">垂直</option>
                            </select>
                            </li>
                            <li class="li6">
                            <label>定位点(内点)</label>
                            <div class="color">
                                <input style="background-color: rgb(0, 0, 0);" id="inptcolor" name="mycolor" value="#000000" class="iColorPicker" type="text"><div id="icp_inptcolor" class="colorPicker-picker" style="background-color:#000000" onclick="iColorShow('inptcolor','icp_inptcolor');return false;"></div>
                            </div>
                            <a style="display: none;" href="javascript:" class="close" id="resetInPtColor"><img src="resource/close.gif"></a>
                            </li>
                        </ul>
                    </div>

                    <div class="fnsubv">
                        <div class="logotypes" id="logotypes">
                            <label>圆角<input name="logotype" value="icon" type="radio"></label>
                            <label>白底<input name="logotype" value="border" type="radio"></label>
                            <label>描边<input name="logotype" value="stroke" type="radio"></label>
                            <label>原图<input name="logotype" value="default" checked="checked" type="radio"></label>
                        </div>
                        <div class="pic">
                            <span class="picbtn">
                                <div class="addpic">
                                    上传图片
                                    <input id="logoimg" class="addlogo" name="logo" type="file">
                                    <iframe name="oniframe" class="iframe" id="iframe" frameborder="0" height="0" width="0"></iframe>
                                </div>
                            </span>
                            <div style="display: none;" class="picelem" id="picelem"><span></span><a href="javascript:" class="del" title="删除" id="resetLogoimg"></a></div>
                        </div>
                        <div class="format" id="format">（支持jpg、gif、png、bmp格式图片，不超过20M）</div>
                        <div class="turn" id="turn"><span class="turn1" title="逆时针旋转"></span><span class="turn2" title="顺时针旋转"></span></div>
                    </div>

                    <div class="fnsubv">
                        <div class="content">
                            <input class="ctext" id="ctext" value="输入文本" type="text">
                            <input class="cbutton" id="cbutton" value="确定" type="button">
                            <a href="javascript:" class="del" title="删除" id="resetContent"></a>
                        </div>
                        <ul class="fontset">
                            <li>
                            <label>效果</label>
                            <select id="fonteffect">
                                <option selected="selected" value="default">描边</option>
                                <option value="in">内融合</option>
                                <option value="out">外融合</option>
                                <option value="stretch">拉伸</option>
                                <option value="3d">3D效果</option>
                                <option value="light">发光</option>
                            </select>
                            </li>
                            <li>
                            <label>字号</label>
                            <select id="fontsize">
                                <option value="24">24</option>
                                <option value="26">26</option>
                                <option selected="selected" value="28">28</option>
                                <option value="30">30</option>
                                <option value="32">32</option>
                                <option value="34">34</option>
                                <option value="36">36</option>
                                <option value="38">38</option>
                            </select>
                            </li>
                            <li class="i3">
                            <label>文字颜色</label>
                            <div class="color">
                                <input id="ftcolor" name="mycolor" value="#000000" class="iColorPicker" style="background-color: rgb(0, 0, 0);" type="text"><div id="icp_ftcolor" class="colorPicker-picker" style="background-color:#000000" onclick="iColorShow('ftcolor','icp_ftcolor');return false;"></div>
                            </div>
                            <a href="javascript:" class="close" id="resetFtColor" style="display: none;"><img src="resource/close.gif"></a>
                            </li>
                        </ul>
                    </div>

                    <div class="fnsubv">
                        <ul class="baseset">
                            <li>
                            <label>外边距</label>
                            <select id="margin">
                                <option>0px</option>
                                <option>5px</option>
                                <option selected="selected">10px</option>
                                <option>15px</option>
                                <option>20px</option>
                                <option>25px</option>
                                <option>30px</option>
                                <option>35px</option>
                                <option>40px</option>
                                <option>45px</option>
                                <option>50px</option>
                            </select>
                            </li>
                            <li>
                            <label>纠错等级</label>
                            <select id="level">
                                <option selected="selected" value="L">最低</option>
                                <option value="M">低</option>
                                <option value="Q">中等</option>
                                <option value="H">高</option>
                            </select>
                            </li>
                            <li>
                            <label>旋转角度</label>
                            <select id="rotate">
                                <option value="0" selected="selected">0°</option>
                                <option value="1">90°</option>
                                <option value="2">180°</option>
                                <option value="3">270°</option>
                            </select>
                            </li>
                            <li>
                            <label>图片大小</label>
                            <select id="size">
                                <option value="200">200px</option>
                                <option value="300" selected="selected">300px</option>
                                <option value="500">500px</option>
                                <option value="600">600px</option>
                                <option value="800">800px</option>
                                <option value="1000">1000px</option>
                                <option value="1500">1500px</option>
                                <option value="2000">2000px</option>
                            </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<div id="apiUrl" class="hide"></div>
<div id="apiText" class="hide"></div>
{% require $id='/views/page/p-qrcode/js/jquery-1.js' %}
{% require $id='/views/page/p-qrcode/js/qrcode.js' %}
{% require $id='/views/page/p-qrcode/js/iColorPicker.js' %}
{% require $id='/views/page/p-qrcode/js/public.js' %}
{% require $id='/views/page/p-qrcode/js/index.js' %}
{% require $id='/views/page/p-qrcode/js/basefn.js' %}
{% require $id='/views/page/p-qrcode/js/canvas.js' %}

{% script %}
require('p-qrcode.js')();
{% endscript %}
