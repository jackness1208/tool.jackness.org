
var mainframe = document.getElementById('mainframe'),
	toolNav = document.getElementById('toolNav'),
	slideBtn = document.getElementById('slideBtn'),
	bodyArea = document.getElementById('bodyArea');



// 手机专属
if(jns.UA.mobile){
	var documentClickHandle = function(e){
			console.log('clickHandle')
			e = e || window.event;
			var srcElement = document.elementFromPoint(e.clientX, e.clientY);
			if(!jns.isBelong(slideBtn, srcElement) ){

				documentBlurHandle();
			}
		},
		documentBlurHandle = function(){
			bodyArea.className = bodyArea.className.replace(/\s*tool_bodyarea_hideslide\s*/g, ' ');
			document.onclick = null;
		};

	slideBtn.onclick = function(){
		if(bodyArea.className.indexOf('tool_bodyarea_hideslide') != -1){
			bodyArea.className = bodyArea.className.replace(/\s*tool_bodyarea_hideslide\s*/g, ' ');
			documentBlurHandle();


		} else {
			bodyArea.className += ' tool_bodyarea_hideslide';
			document.onclick = documentClickHandle;
		}
	};
} else {
	slideBtn.onclick = function(){
		if(bodyArea.className.indexOf('tool_bodyarea_hideslide') != -1){
			bodyArea.className = bodyArea.className.replace(/\s*tool_bodyarea_hideslide\s*/g, ' ');

		} else {
			bodyArea.className += ' tool_bodyarea_hideslide';
		}
	};
}
	

