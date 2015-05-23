{% require $id='p-imgBase64.css' %}


<div id="base64-container">
    <div id="base64-textarea-container">
    	<textarea id="base64-textarea">        
 #
 # 图片在线转换为Base64，移动开发、HTML5开发、必备的DataURI工具
 # 支持 PNG、GIF、JPG、BMP、TIF、PSD、ICO 等格式
 #
        </textarea>
    </div>
    <div id="base64-buttons-container">
        <span class="fl"><object id="base64-swf" type="application/x-shockwave-flash" data="resource/base64.swf" height="30" width="104"><param name="movie" value="resource/base64.swf"><a href="http://www.adobe.com/go/getflash">需要安装Flash后才能使用</a></object></span>
      	<span class="checkbox fl selected" style="margin:3px 0 0 20px;">包含头</span>
        <span class="checkbox fl" style="margin:3px 0 0 20px;">包含CSS</span>
        <span class="fl" style="margin-left:15px"><object id="objectID-0" type="application/x-shockwave-flash" data="resource/copy.swf" height="30" width="45"><param name="movie" value="resource/copy.swf"><a href="http://www.adobe.com/go/getflash">需要安装Flash后才能使用</a></object></span>
        <a href="javascript:;" class="btn last fl" hidefocus="true">清空</a>
        <a href="javascript:;" class="btn blue fl last" hidefocus="true" style="margin-left:10px;">编码文本</a>
   		<div class="clear"></div>
    </div>
    <div id="base64-imgview" style="display:none">
    	<p>你选择的图片：</p>
        <img id="base64-img">
    </div>
    <div id="base64-directions">
    	<div id="base64-alert">
        	Base64目前主要用于HTML5、移动开发等不考虑IE6的场景中。
        </div>
    	<div id="base64-demo">
        	<h2>Base64格式</h2>
            <div class="code">
            	data:[<mime-type>][;charset=<encoding>][;base64],<data>
            </data></encoding></mime-type></div>
        	<h2>Base64 在CSS中的使用</h2>
        	<div class="code">
            	<span style="color:#F0F">.demoImg{</span> <span style="color:#009">background-image</span><span style="color:#F0F">:</span> <span style="color:#00F">url("data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....")</span><span style="color:#F0F">;</span> <span style="color:#F0F">}</span>
            </div>
            <h2>Base64 在HTML中的使用</h2>
        	<div class="code">
            	<span style="color:#009">&lt;img width="<span style="color:#00F">40</span>" height="<span style="color:#00F">30</span>" src="<span style="color:#00F">data:image/jpg;base64,/9j/4QMZRXhpZgAASUkqAAgAAAAL....</span>" /&gt;</span>
            </div>
        </div>
        <a id="base64-gotowiki" href="http://zh.wikipedia.org/wiki/Base64" target="_blank">更多参考&gt;&gt;</a>
    </div>
</div>
{% require $id='/views/page/p-imgBase64/js/jq.js' %}
{%script%}
require('p-imgBase64.js')();
{%endscript%}

<script type="text/javascript" src="resource/jq.js"></script>

</script>
