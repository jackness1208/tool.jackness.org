/* init
----------------------------*/
function toolIndexInit(){
	
	var mainframe = document.getElementById('mainframe'),
		toolNav = document.getElementById('toolNav'),
		slideBtn = document.getElementById('slideBtn'),
		bodyArea = document.getElementById('bodyArea'),
		defaultUrl = toolNav.getElementsByTagName('a')[0].href,
		orgTitle = document.title,

		frameLoadHandle = function(){
			var as = toolNav.getElementsByTagName('a'),
				frameUrl = '',
				isMatch = false,
				i, fs, len, fli;

			try{
				frameUrl = this.contentWindow.location.href
			} catch(er){}

			for(i = 0, len = as.length; i < len; i++){
				fli = as[i].parentNode;
				fli.className = fli.className.replace(/\s*cur\s*/g, ' ');
			}

			if(frameUrl){
				for(i = 0, len = as.length; i < len; i++){
					fs = as[i];
					fli = fs.parentNode;
					if(frameUrl.match(fs.href)){
						fli.className += ' cur';
						jns.request.hash('pos', fs.href);
						isMatch = fs.innerText || fs.textContent;
						break;
					}
				}
			}

			if(isMatch){
				document.title = 'JackNEss \' Tool - ' + isMatch;
			} else {
				document.title = orgTitle;
			}

			if(jns.UA.mobile){
				try{
					this.style.height = this.contentWindow.document.body.offsetHeight + "px";
				} catch(er){}
			}

		};

	// 事件绑定
	if(mainframe.attachEvent){
		mainframe.attachEvent('load', frameLoadHandle);
	} else {
		mainframe.onload = frameLoadHandle;
	}

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
				window.onblur = window.onlosecapture = null;
			};

		slideBtn.onclick = function(){
			if(bodyArea.className.indexOf('tool_bodyarea_hideslide') != -1){
				bodyArea.className = bodyArea.className.replace(/\s*tool_bodyarea_hideslide\s*/g, ' ');
				documentBlurHandle();


			} else {
				bodyArea.className += ' tool_bodyarea_hideslide';
				document.onclick = documentClickHandle;
				window.onblur = window.onlosecapture = documentBlurHandle;
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

	





	// 连接记录获取
	var myPos = jns.request.hash('pos');

	if(myPos){
		mainframe.src = myPos;
	} else {
		mainframe.src = defaultUrl;
	}


}