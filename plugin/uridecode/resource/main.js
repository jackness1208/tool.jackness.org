//原生扩展
String.prototype.trim = function(){return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g,"");};

var jns = window.jns || {};

jns.flash = {
	/**
	 * jns.flash.init(name,op) 初始化 flash对象，返回插入flash用的string代码
	 * @param   {string} name: 定义flash的名称,其中 <object> 的id 为 "object_" + name,<embed> 的id 为 "embed_" + name
	 * @param   {object} op:   配置接口
	 *                         wmode:     [string] - 设置wmode的模式取值范围为 opaque|transparent|window, 默认为 opaque
	 *                         width:     [number] - 设置flash对象的宽度值
	 *                         height:    [number] - 设置flash对象的高度值
	 *                         flashvars: [string] - 设置 flash对象的 flashvars值
	 *                         flashUrl:  [string] - 设置 flash对象的 地址
	 * @return:  {void}
	 * @date:    2012-9-26
	 * @version: 1.0
	 */
	init:function(name,op){
		var option = {
			wmode:"opaque",// opaque|transparent|window
			width:300,
			height:300,
			flashvars:"",
			flashUrl:""
		};

		if(typeof op == "object"){
			if (typeof op.wmode != "undefined"){ 
				switch(op.wmode.toLowerCase()){
					case "opaque":
						option.wmode = "opaque";
						break;
					case "window":
						option.wmode = "window";
						break;
					case "transparent":
						option.wmode = "transparent";
						break;
				}
				option.wmode = op.wmode;
			}
			typeof op.width != "undefined"? option.width = op.width:"";
			typeof op.height != "undefined"? option.height = op.height:"";
			typeof op.flashvars != "undefined"? option.flashvars = op.flashvars:"";
			typeof op.flashUrl != "undefined"? option.flashUrl = op.flashUrl:"";
		}
		if(option.flashUrl === ""){
			jns.console("jns.flash.write:flashUrl不能为空");
			return;
		}

		var writeHTML =[
			'<object id="object_' + name + '" name="' + name + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.32" width="' + option.width + '" height="' + option.height + '">',
				'<param name="movie" value="' + option.flashUrl + '" />',
				'<param name="flashvars" value="' + option.flashvars + '" />',
				'<param name="quality" value="high" />',
				'<param name="allowscriptaccess" value="always" />',
				'<param name="wmode" value="' + option.wmode + '"/>',
				'<embed id="embed_'+ name +'" src="' + option.flashUrl + '" width="' + option.width + '"  height="' + option.height + '" allowscriptaccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + option.flashvars + '" type="application/x-shockwave-flash" wmode="'+ option.wmode +'"></embed>',
			'</object>'
		].join("");
		return writeHTML;
	},
	/**
	 * jns.flash.write(name,op) 将flash对象通过 document.write 直接写在页面上
	 * @param:  {string} name:  定义flash的名称,其中 <object> 的id 为 "object_" + name,<embed> 的id 为 "embed_" + name
	 * @param:  {object} op:    配置接口
	 *                          wmode:     [string] - 设置wmode的模式取值范围为 opaque|transparent|window, 默认为 opaque
	 *                          width:     [number] - 设置flash对象的宽度值
	 *                          height:    [number] - 设置flash对象的高度值
	 *                          flashvars: [string] - 设置 flash对象的 flashvars值
	 *                          flashUrl:  [string] - 设置 flash对象的 地址
	 * @return:  {void}
	 * @date:    2012-9-26
	 * @version: 1.0
	 */
	write:function(name,op){
		var writeHTML = this.init(name,op);
		if(writeHTML){
			document.write(writeHTML);
		}
	},
	/*
	 * jns.flash.add(target,name,op) 将flash对象添加到指定的容器里面
	 * @param:  {object} target:目标对象
	 * @param:  {string} name:  定义flash的名称,其中 <object> 的id 为 "object_" + name,<embed> 的id 为 "embed_" + name
	 * @param:  {object} op:    配置接口
	 *                          wmode:     [string] - 设置wmode的模式取值范围为 opaque|transparent|window, 默认为 opaque
	 *                          width:     [number] - 设置flash对象的宽度值
	 *                          height:    [number] - 设置flash对象的高度值
	 *                          flashvars: [string] - 设置 flash对象的 flashvars值
	 *                          flashUrl:  [string] - 设置 flash对象的 地址
	 * @date:    2012-9-26
	 * @version: 1.0
	 */
	add:function(target,name,op){
		var innerHTML = this.init(name,op);
		if(!target){
			jns.console("jns.flash.add:对象为空");
			return;
		}
		if(innerHTML){
			target.innerHTML= innerHTML;
		}
	},
	/*
	 * jns.flash.ctrl(name) 
	 * 获取 flash对象(主要用于调用flash提供的方法),只有通过 jns.flash.write()/jns.flash.add()方法添加上去的flash才受控制
	 * <pre>
	 * jns.flash.ctrl("flashObj").f2s_alert();
	 * </pre>
	 * @param:   {string} name: 通过 jns.flash.write() 或者 jns.flash.add() 方法添加的flash对象中 的 name 值
	 * @date:    2012-9-26
	 * @version: 1.0 
	 */
	ctrl:function(name){
		var dc = document,
			embedElm = dc.getElementById("embed_" + name),
			objectElm = dc.getElementById("object_" + name);
		//非IE浏览器
		if(navigator.appName.indexOf("Microsoft") == -1){
			if(!embedElm){ 
				jns.console("jns.flash.ctrl: 非IE 下对象为空:" + "embed_" + name); 
				return;
			}
			return embedElm;
		
		} 
		//IE浏览器	
		else {
			if(!objectElm){ 
				jns.console("jns.flash.ctrl: IE 下对象为空:" + "object_" + name); 
				return;
			}
			return objectElm;
		}
	}
};

function mainInit(){
	var textArea = document.getElementById('textArea'),
		encodeBtn = document.getElementById('encodeBtn'),
		decodeBtn = document.getElementById('decodeBtn'),
		copyBtn = document.getElementById('copyBtn'),
		msgBox = document.getElementById('msgBox'),
		clearBtn = document.getElementById('clearBtn');

	textArea.onfocus = function(){
		if(this.value == this.defaultValue){
			this.value = '';
		}
	};

	textArea.onblur = function(){
		if(this.value.trim() == ''){
			this.value = this.defaultValue;
		}
	};

	msgBox.hide = function(){
		var she = this;
		clearTimeout(she.msgKey);
		she.msgKey = setTimeout(function(){
			she.innerHTML = '';
			she.className = she.className.replace(/\s*urlen_msg_success|urlen_msg_error\s*/, ' ');
		}, 2000);
	};

	msgBox.success = function(txt){
		this.className = this.className.replace(/\s*urlen_msg_success|urlen_msg_error\s*/, ' ');
		this.className += ' urlen_msg_success';
		this.innerHTML = txt;
		this.hide();
	};

	msgBox.error = function(){
		this.className = this.className.replace(/\s*urlen_msg_success|urlen_msg_error\s*/, ' ');
		this.className += ' urlen_msg_error';
		this.innerHTML = txt;
		this.hide();
	};

	encodeBtn.onclick = function(){
		if(textArea.value == textArea.defaultValue){
			return;
		}
		try{
			textArea.value = encodeURIComponent(textArea.value);
			msgBox.success('编码成功');
			textArea.focus();
			textArea.select();
		} catch(er){
			msgBox.error('编码出错，此内容不符合 URIencode 规则');
		}
	};

	decodeBtn.onclick = function(){
		if(textArea.value == textArea.defaultValue){
			return;
		}
		try{
			textArea.value = encodeURIComponent(textArea.value);
			msgBox.success('解码成功');
			textArea.focus();
			textArea.select();
		} catch(er){
			msgBox.error('解码出错，此内容不符合 URIdecode 规则');
		}
	};

	clearBtn.onclick = function(){
		textArea.value = textArea.defaultValue;

	};

	//插入复制用 flash
	window.alert = function(){};
	window.__copyHandle = function(){
		if(textArea.value == textArea.defaultValue || textArea.value === ''){
			msgBox.error('没任何复制内容');
			return '';
		} else {
			msgBox.success('复制成功');
			return textArea.value;
		}
	};
	copyBtn.innerHTML += jns.flash.init('copyFlash',{'wmode':'transparent', 'width': 46, 'height': 28, 'flashUrl':'resource/clipboard.swf?callback=__copyHandle' });
}