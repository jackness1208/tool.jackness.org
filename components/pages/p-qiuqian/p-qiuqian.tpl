{% require $id='css/divi.css' %}
<div class="container">
		
	<div class="info">
		<strong>求</strong>婚丧嫁娶亲友疾病编程测试升职跳槽陨石核弹各类吉凶
	</div>
	<div class="date">
	</div>
	<div class="check_luck">
		<ul>
			<li>编码测试修复提交之前求一签，可避凶趋吉</li>
			<li>选择所求之事并在心中默念，再单击“求”即可</li>
			<li>同一件事只能求一次，下次再求请刷新页面</li>
		</ul>
		<table class="event_table selecttable">
			<tr>
				<td class="" data-event="100">
					编码
				</td>
				<td class="" data-event="200">
					测试
				</td>
				<td class="" data-event="300">
					修复BUG
				</td>
				<td class="" data-event="400">
					提交代码
				</td>
				<td class="" data-event="500">
					其他
				</td>
			</tr>
		</table>
	</div>
	<div class="roll">
		<div class="card" style="top:-1px;font-size:20pt">
			请点击所求之事
		</div>
		<div class="card clickable">
			<div class="title">
				求
			</div>
		</div>
	</div>
		
</div>
{% script %}
require('js/p-qiuqian.js')();
{% endscript %}
