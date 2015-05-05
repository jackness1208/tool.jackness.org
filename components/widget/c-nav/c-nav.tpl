<div class="tool_nav" id="toolNav">
	<ul>
		{% for nav in navs %}
		<li {% if nav.current == true %}class="cur"{% endif %}><a href="/{{nav.id}}/index" data-pagelets="main">{{nav.title}}</a></li>
		{% endfor %}
	</ul>
</div>
{% script %}
require('c-nav.js');
{% endscript %}