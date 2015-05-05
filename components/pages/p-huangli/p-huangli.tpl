{% require $id='css/huangli.css' %}
	
<div class="container">
	<div class="date">
	</div>
	<div class="good">
		<div class="title">
			<table>
				<tr><td>宜</td></tr>
			</table>
		</div>
		<div class="content">
			<ul></ul>
		</div>
		<div class="clear"></div>
	</div>
	<div class="split"></div>
	<div class="bad">
		<div class="title">
			<table>
				<tr><td>不宜</td></tr>
			</table>
		</div>
		<div class="content">
			<ul></ul>
		</div>
		<div class="clear"></div>
	</div>
	<div class="split"></div>
	<div class="line-tip">
		<strong>座位朝向：</strong>面向<span class="direction_value"></span>写程序，BUG 最少。
	</div>
	<div class="line-tip">
		<strong>今日宜饮：</strong><span class="drink_value"></span>
	</div>
	<div class="line-tip">
		<strong>女神亲近指数：</strong><span class="goddes_value"></span>
	</div>
	<div class="adlink">
		<a href="/qiuqian/index" data-pagelets="main">想求签？</a>
	</div>
	
	<div class="comment">
		<ul>
			<li>本老黄历尚处于beta阶段，作者随时会修改，所以如果上午看到的内容跟下午不同，请勿惊慌；</li>
			<li>本老黄历仅面向程序员；</li>
			<li>本老黄历内容是程序生成的，因为只有这样程序员才会信。</li>
		</ul>
	</div>
</div>
{% script %}
require('js/p-huangli.js')();
{% endscript %}
