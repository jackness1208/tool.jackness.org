/**
 * jns Foundation
 * date : 2015-02-10
 * ver  : 1.0.0
 */

!function(window, undefined){
	
//原生扩展
String.prototype.trim = function(){return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g,"");};

String.prototype.getBytes = function(){var bytes=0;for(var i=0;i<this.length;i++){if(this.charCodeAt(i)>256){bytes+=2;}else{bytes+=1;}}return bytes;};


Array.prototype.indexOf = Array.prototype.indexOf || function(s){
	for(var i = 0, len = this.length; i < len; i++){
		if(this[i] === s){
			return i;
		}
	}
	return -1;
};

//主体
var document = window.document,
	jns = {
		getPosition: function(target,cw){
			cw = cw || window;

			var dc = document,
				fparent = target,
				acc = target.getBoundingClientRect(),
				_x = fparent.offsetLeft,
				_y = fparent.offsetTop;

			while(fparent.offsetParent){
				fparent = fparent.offsetParent;
				_x += fparent.offsetLeft;
				_y += fparent.offsetTop;
			}

			return{
				left:_x,
				top:_y,
				right:document.body.scrollLeft + acc.right,
				bottom:document.body.scrollTop + acc.bottom
			};
		},
		isBelong: function(target,srcElement){
			for(var _srcElement = srcElement;_srcElement;_srcElement = _srcElement.parentNode){
				if(_srcElement === target){
					return true;
				}
			}
		},

		flash:{
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
		},
		cookies : {
			/** 
			 * 获取 cookies中的某个变量
			 * <pre>
			 * jns.cookies.get("jackNEss")
			 * </pre>
			 * @param:  {string} name 需要获取的cookies 属性名称
			 * @return: {void}
			 * @date:    2012-5-25
			 * @version: 1.0
			 */
			get:function(name){
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr !== null) {
					return window.unescape(arr[2]);
				}
				return null;
			},
			/**
			 * 在cookies中设置变量与值。
			 * <pre>
			 * jns.cookies.set("jackNEss","handle",20)
			 * </pre>
			 * @param:  {string} name       需要设置的cookies 属性名称
			 * @param:  {string} value      需要设置的cookies 属性值
			 * @param:  {number} delayHours 持续时间，单位:小时，默认值为24
			 * @param:  {string} path       cookies存放路径 以 "/" 结尾 如果 值为 "/" 则表示全站通用
			 * @param:  {string} domain     cookies作用域设置
			 * @param:  {string} secure     一个布尔类型的值，secure值为true时，在http中是无效的，在https中才有效。
			 * @return: {void}
			 * @date:    2013-1-28
			 * @version: 1.1
			 */
			set:function(name,value,delayHours,path,domain,secure){
				if(!delayHours){
					delayHours = 24;
				}
				var exp = new Date();    
				exp.setTime(exp.getTime() + delayHours*60*60*1000);
				document.cookie = name + "="+ window.escape(value) + ";expires=" + exp.toGMTString() + (domain?";domain=" + domain:"") + (path?";path=" + path:"") + (secure === true? ";secure":"");
			},
			/**
			 * 删除cookies中的某个变量
			 * <pre>
			 * jns.cookies.del("jackNEss")
			 * </pre>
			 * @param:  {string} name 需要删除的cookies 属性名称
			 * @return: {void}
			 * @date:    2012-5-25
			 * @version: 1.0
			 */
			del:function(name){
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = this.get(name);
				if(cval !== null){
					document.cookie= name + "="+cval+";expires="+exp.toGMTString();
				}
			}
		},

		request:{
			search:function(key){
				var s = location.search.replace(/[? ]/g,"");
				if(s === ""){return null;}

				var g = s.split("&");
				for(var i = 0, len = g.length; i < len; i++){
					var f = g[i].split("=");
					if(f.length <= 1){continue;}

					var k = f[0],
						v = f[1];
					if(k === key){return v;}
				}
				return null;
			},
			hash:function(key,val){
				var s = location.hash.replace(/[# ]/g,""),
					isVal = typeof val != "undefined",
					isMatch = false;
				if(s === "" && !isVal){return null;}

				var g = s.split("&");
					
				for(var i = 0, len = g.length; i < len; i++){
					var f = g[i].split("=");
					if(f.length <= 1){continue;}

					var k = f[0],
						v = f[1];
					if(k === key){
						if(isVal){
							g[i] = k + "=" + val;
							isMatch = true;
						} else {
							return v;
						}
					}
				}
				!isMatch && g.push(key + "=" + val);
				if(isVal){
					window.location.hash = g.join("&");
					return g.join("&");
				}

				return null;
			}
		},

		inertiaMotion: function(So,St,T,type){
		    var sArray = [],
		        S = Math.abs(St - So),
		    
		        //摆动，惯性运动,利用的是sin 的特性,再用次方 加强幅度
		        swingHandle = function(){
		            var S = St - So;
		            
		            for(var i = 0, len = T; i < len; i++){
		                sArray[i] = parseInt(S * Math.pow(Math.sin(i/T*Math.PI/2),3)*100)/100 + So;
		            }

		        },
		        //线性运动
				linearHandle = function(){
					var S = St - So,
						V = S / T;
					
					for(var i = 0, len = T; i < len; i++){
						sArray[i] = Math.round( (So + V * i) * 100 ) / 100;
					}
					sArray[0] = So;
					sArray[T - 1] = St;
				};

		    switch(type){

		        //摆动
		        case "swing":
		        	swingHandle();
		            break;

		        //直线匀速
				case "linear":
					linearHandle();
					break;

		        default:
		            swingHandle();
		            break;
		    }
		    
		    
		    
		    return{
		        Sn:function(Tn){
		            return Tn > T? St : sArray[Tn];
		        }
		    };
		},

		UA:{
			ie:(!!window.ActiveXObject && /msie (\d*)/i.test(navigator.userAgent) ? RegExp.$1 : false),

			mobile:(/Android|iPhone|IEMobile/.test(navigator.userAgent)),

			android:(/Android (\d\.\d)/i.test(navigator.userAgent) ? RegExp.$1 : false),

			ios:(/iPhone/.test(navigator.userAgent)),
			
			windowPhone:(/Windows Phone (\d\.\d)/i.test(navigator.userAgent) ? RegExp.$1 : false)
		},

		isArray: function(arr){
			return /Array/.test(Object.prototype.toString.call(arr));
		},

		stopBubble: function(e){
			e = e || window.event;
			e.stopPropagation && e.stopPropagation();
			e.cancelBubble = true;
		},

		JSON: function() {function f(n) {return n < 10 ? '0' + n: n; } Date.prototype.toJSON = function() {return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z'; }; var m = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'}; function stringify(value, whitelist) {var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g, v; switch (typeof value) {case 'string': return r.test(value) ? '"' + value.replace(r, function(a) {var c = m[a]; if (c) {return c; } c = a.charCodeAt(); return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16); }) + '"': '"' + value + '"'; case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) {return 'null'; } if (typeof value.toJSON === 'function') {return stringify(value.toJSON()); } a = []; if (typeof value.length === 'number' && !(value.propertyIsEnumerable('length'))) {l = value.length; for (i = 0; i < l; i += 1) {a.push(stringify(value[i], whitelist) || 'null'); } return '[' + a.join(',') + ']'; } if (whitelist) {l = whitelist.length; for (i = 0; i < l; i += 1) {k = whitelist[i]; if (typeof k === 'string') {v = stringify(value[k], whitelist); if (v) {a.push(stringify(k) + ':' + v); } } } } else {for (k in value) {if (typeof k === 'string') {v = stringify(value[k], whitelist); if (v) {a.push(stringify(k) + ':' + v); } } } } return '{' + a.join(',') + '}'; } } return {stringify: stringify, parse: function(text, filter) {var j; function walk(k, v) {var i, n; if (v && typeof v === 'object') {for (i in v) {if (Object.prototype.hasOwnProperty.apply(v, [i])) {n = walk(i, v[i]); if (n !== undefined) {v[i] = n; } else {delete v[i]; } } } } return filter(k, v); } if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {j = eval('(' + text + ')'); return typeof filter === 'function' ? walk('', j) : j; } throw new SyntaxError('parseJSON'); } }; }(),


		//本地存储
		locateData: {
			hname:location.hostname?location.hostname:'localStatus',
		    isLocalStorage:window.localStorage?true:false,
		    dataDom:null,
		    initDom:function(){ //初始化userData
				if(!this.dataDom){
					try{
						this.dataDom = document.createElement('input');//这里使用hidden的input元素
						this.dataDom.type = 'hidden';
						this.dataDom.style.display = "none";
						this.dataDom.addBehavior('#default#userData');//这是userData的语法
						document.body.appendChild(this.dataDom);
						var exDate = new Date();
						exDate = exDate.getDate()+30;
						this.dataDom.expires = exDate.toUTCString();//设定过期时间
					}catch(ex){
						return false;
					}
				}
				return true;
			},
			get:function(attr){
				var myValue;

				if(this.isLocalStorage){
					var storage = window.localStorage;
					myValue = storage.getItem(attr);
				} else {
					if(this.initDom()){
		                this.dataDom.load(this.hname);
		                myValue = this.dataDom.getAttribute(attr);
		            }
				}

				if(typeof myValue == "undefined"){
					return null;

				} else {
					return jns.JSON.parse(String(myValue));
				}
			},
			set:function(attr,value){
				if(typeof value == "undefined"){return;}
				if(this.isLocalStorage){
		            var storage = window.localStorage;

		            storage.removeItem(attr);
					storage.setItem(attr,jns.JSON.stringify(value));

		        }else{
		            if(this.initDom()){
		                this.dataDom.load(this.hname);
		                this.dataDom.setAttribute(attr,jns.JSON.stringify(value));
		                this.dataDom.save(this.hname);
		            }
		        }
			}
		},

		//延迟加载
		lazyload: function(op){
			var she = arguments.callee,
				option = {
					//需要延迟加载的 img 对象
					target:document.images,
					//距离可视区域多少开始加载 img
					distance:0,
					//替代的图片url地址
					defaultImg:"",

					ready:null,

					onload:null
				};
			
			op = op || {};
			op.target && (option.target = op.target);
			op.distance && (option.distance = op.distance);
			op.defaultImg && (option.defaultImg = op.defaultImg);
			op.onload && (option.onload = op.onload);
			op.ready && (option.ready = op.ready);
			
			if(she.hasInit === undefined){
				she.items = [];
				she.hasInit = false;
				she.defaultImg = "";
				she.onload = null;
				she.init = null;

				she.lazyHandle = function(){
					if(she.items.length){

						var screenHeight = document.documentElement.clientHeight,
							screenTop = document.documentElement.scrollTop||document.body.scrollTop,
							screenBottom = screenHeight + screenTop,
							cellTop,
							cellBottom,
							fs,
							lazySrc;


						for( var i = 0; i < she.items.length;){
							fs = she.items[i];
							lazySrc = fs.getAttribute("_src");

							if(!lazySrc){
								she.items.splice(i,1);
								continue;
							}

							cellTop = jns.getPosition(fs).top;
							cellBottom = cellTop + (fs.offsetHeight || 0);

							if(( cellBottom > screenTop - she.distance && cellBottom < screenBottom )||( cellTop < screenBottom + she.distance && cellTop > screenTop )){
								fs.src = lazySrc;
								fs.setAttribute("_src","");
								she.items.splice(i,1);
							}
							else{
								i++;
							}
						}


					} else {
						she.stop();
					}
				};

				she.add = function(imgs){
					var myImgs = imgs || document.images,
						fs,lazySrc,
						onerrorHandle = function(){
							this.onerror = null;
							this.src = she.defaultImg;
						};

					!she.items.length && she.init();
					
					if(myImgs.nodeType == 1){
						myImgs = [myImgs];
					}

					for(var i = 0, len = myImgs.length; i < len; i++){
						fs = myImgs[i];
						lazySrc = fs.getAttribute("_src");
						if(lazySrc && fs.src != lazySrc){
							she.defaultImg && (fs.onerror = onerrorHandle);
							she.onload && (fs.onload = she.onload);
							she.ready && she.ready.call(fs);
							she.items.push(fs);

						}
					}

					she.lazyHandle();
					
				};

				she.stop = function(){
					she.items = [];
					$(window).unbind("resize",she.lazyHandle);
					$(window).unbind("scroll",she.lazyHandle);
				};

				she.init = function(target){
					$(window).bind("resize",she.lazyHandle);
					$(window).bind("scroll",she.lazyHandle);
				};

			}

			she.distance = option.distance;
			she.defaultImg = option.defaultImg;
			she.onload = option.onload;
			she.ready = option.ready;
			
			she.add(option.target);


			return she;

		},

		//页码重构
		leafRebuild: function(nowPage,showNum,total,source){

			var op = {
				leafCount: 5,
				//分页样式
				classes: {
					//第一页
					prev:"prev",
					//第一页 失效
					prevDisable:"prev_disable",
					//省略号
					ellipiss:"s",
					//页码
					number:"number",
					//页码 选中
					numberCurrent:"current",
					//最后一页
					next:"next",
					//最后一页 失效
					nextDisable:"next_disable",

					//跳转到第几页 样式
					jump:"jumpto"
				}
			};

			nowPage = Number(nowPage);
			showNum = Number(showNum);
			total = Number(total);

			if(showNum === 0){ return "";}

			var html = "",
				leafCount = op.leafCount,
				focus = Math.floor(leafCount/2),
				pageTotal = Math.ceil(total/showNum) - 1,
				pageStart = (nowPage - focus > 0?nowPage - focus:0),
				pageEnd = (nowPage + focus < pageTotal? nowPage + focus:pageTotal),
				hrefRebuild = typeof source == "string"? function(page){
					page < 0? page = 0:"";
					page > pageTotal? page = pageTotal:"";
					//传方法名执行
					return "javascript:" + source +'('+ page +');'; 

				}:function(page){
					page < 0? page = 0:"";
					page > pageTotal? page = pageTotal:"";
					
					//传参数 object页面跳转： href - 链接，devi - 初始索引值
					return source.href + (Number(page) + Number(source.devi || 0) );
				},

				jumpFuncStr = typeof source == "string"? (
					"this.parentNode.children[0].value &&" + source + "(Number(this.parentNode.children[0].value) - 1)"
				):(
					"this.parentNode.children[0].value && (window.location.href=\\'"+ source.href +"\\' + Number(this.parentNode.children[0].value) + " + Number(source.devi || 0) + ")"
				);


			if(isNaN(nowPage) || isNaN(showNum) || isNaN(total)){return "";}

			pageEnd > pageTotal? pageEnd = pageTotal:"";
			pageEnd - pageStart < leafCount?(
				pageStart + leafCount - 1 <= pageTotal?(
					pageEnd = pageStart + leafCount - 1
				):(
					pageEnd - leafCount + 1 >= 0 ? pageStart = pageEnd - leafCount + 1:""
				)
			):"";

			if(pageStart != pageEnd){
				html += '<a href="'+ (nowPage === 0?'javascript:;':hrefRebuild(nowPage - 1)) +'" class="'+ op.classes.prev + (nowPage === 0? ' '+ op.classes.prevDisable:'') + '">&laquo;上一页</a>';
			}

			if(pageStart !== 0){
				html += '<a href="'+ hrefRebuild(0) +'" class="'+ op.classes.number +'">1</a>';
			}

			if(nowPage > focus && pageStart !== 0 && pageStart != 1){
				html += '<span class="'+ op.classes.ellipiss +'">…</span>';
			}

			for(var i = pageStart; i <= pageEnd && pageStart != pageEnd; i++ ){
				html += '<a class="'+ op.classes.number +' '+ (i == nowPage?op.classes.numberCurrent:'') +'" href="'+ (i == nowPage?'javascript:;': hrefRebuild(i)) + '">'+ (i + 1) +'</a>';
			}

			if(nowPage < pageTotal - focus - 1 && pageEnd != pageTotal){
				html += '<span class="'+ op.classes.ellipiss +'">…</span>';
			}

			if(pageEnd != pageTotal){
				html += '<a href="'+ hrefRebuild(pageTotal) +'" class="'+ op.classes.number +'">'+ (pageTotal + 1) +'</a>';
			}
			if(pageStart != pageEnd){
				html += '<a href="'+ (nowPage == pageTotal?'javascript:;':hrefRebuild(nowPage + 1)) +'" class="'+ op.classes.next +' ' + (nowPage == pageTotal? ' '+ op.classes.nextDisable:'') + '">下一页&raquo;</a>';
			}
			if(pageTotal > 1){
				html += '<span class="'+ op.classes.jump +'">跳转到第 <input type="text" class="ipt" onblur="isNaN(this.value) || Number(this.value) <= 0 ?this.value=1:(Number(this.value) > '+ (pageTotal + 1) +'?this.value='+ (pageTotal + 1) +':\'\')" /> 页 <input type="button" class="btn" onclick="'+ jumpFuncStr +'" value="GO" /></span>';
			}
			
			
			return html;
		},


		getCssProperty: function(cssProperty){
			var firstLetter = cssProperty.substr(0,1),
				otherStrs = cssProperty.substr(1),
				fUpperStrs = firstLetter.toUpperCase() + otherStrs,
				fLowerStrs = firstLetter.toLowerCase() + otherStrs,
				privateAttrs = [
					fLowerStrs,
					"Webkit" + fUpperStrs,
					"Moz" + fUpperStrs,
					"O" + fUpperStrs,
					"Ms" + fUpperStrs
				],
				style = document.documentElement.style;
			for(var i = 0, len = privateAttrs.length; i < len; i++){
				var fCssAttr = privateAttrs[i];
				if(fCssAttr in style){
					return fCssAttr;
				}
			}
			return null;
		},

		//内部函数 - 弹出层
		dialog: function (type, op) {
			var me = jns.dialog;

			if(!document.body){
				me.readyKey = setTimeout(function(){
					me(type,op);
				},200);
				return;
			}

			if(!me.myScroll){
				document.body.scrollTop += 1;
				document.documentElement.scrollTop += 1;

				if(document.body.scrollTop){
					me.myScroll = document.body;
				} else {
					me.myScroll = document.documentElement;
				}

				me.TransKey = jns.getCssProperty("transition");
				me.queue = [];
			}


			var dc = document,
				option = {
					//标题
					title: "温馨提示",
					//内容
					content: "",
					//显示时间
					timeout: 2000,
					//必须先确认
					mustConfirm: false,
					//回调函数
					callback: function() {},
					//取消操作的时候回调的函数
					cancelCallback: function() {},

					//加载完成时候
					onload:function(){},

					type:"normal",

					width:"",
					height:"auto",
					zIndex:100,

					//默认显示
					show:true,

					//允许调整宽高
					resize:false,

					//允许最小化
					minimize:false,

					//弹窗默认显示状态：normal|max
					sizingType:"normal",

					//loading 用参数
					overtime: 8000,
					delay: 1000,
					appendTarget: document.body,
					onovertime: function() {}

				},
				paramInit = function(o){
					o = o || {};
					var limitType;
					for(var key in o){
						if(o.hasOwnProperty(key)){
							limitType = "";
							switch(key){
								case "title":
								case "sizingType":
								case "type": limitType = "string"; break;

								case "content": limitType = "object|string"; break;

								case "timeout":
								case "overtime": limitType = "number"; break;

								case "callback":
								case "cancelCallback":
								case "onload":
								case "onovertime": limitType = "function"; break;

								case "width":
								case "height":
								case "zIndex": limitType = "string|number"; break;

								case "resize":
								case "minimize":
								case "show": limitType = "boolean"; break;

								case "appendTarget": limitType = "object"; break;


								default : break;
							}
							limitType && limitType.indexOf(typeof o[key]) != -1 && (option[key] = o[key]);
						}
					}
				},
				popConfig = function(t){
					var classConfig = {
							"popup":"bs_pop"
						},
						idConfig = {
							"popup":"",
							"content":"Cnt",
							"head":"Hd",
							"body":"Body",
							"title":"Tl",
							"status":"Status",
							"close":"Close",
							"maximi":"Maximi",
							"mini":"Mini",
							"okBtn":"OkBtn",
							"cancelBtn":"CancelBtn",
							"foot":"Foot",
							"resizeL":"resizeL",
							"resizeB":"resizeB",
							"resizeR":"resizeR",
							"resizeRb":"resizeRb",
							"resizeLb":"resizeLb",
							"resizeArea":"resizeArea"
						},
						htmlRebuild = function(type){
							if(/normal|alert|error|success/g.test(type) && option.timeout){
								option.minimize = false;
								option.resize = false;
							}
							switch(type){
								case "confirm":
									return [
										'<div class="bs_pop_hd" id="'+ idConfig.head +'">',
											'<h3 class="h_tl" id="'+ idConfig.title +'"></h3>',
											'<div class="h_ctrl">',
												'<a href="javascript:;" '+ (option.minimize?'':'style="display:none;"') +'  class="mini" id="'+ idConfig.mini +'">mini</a>',
												'<a href="javascript:;" '+ (option.resize?'':'style="display:none;"') +' class="maximi" id="'+ idConfig.maximi +'">maximi</a>',
												'<a href="javascript:;" class="close" id="'+ idConfig.close +'">CLOSE</a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize">',
											'<i class="bs_pop_resize_l" id="'+ idConfig.resizeL +'"></i>',
											'<i class="bs_pop_resize_b" id="'+ idConfig.resizeB +'"></i>',
											'<i class="bs_pop_resize_r" id="'+ idConfig.resizeR +'"></i>',
											'<i class="bs_pop_resize_lb" id="'+ idConfig.resizeLb +'"></i>',
											'<i class="bs_pop_resize_rb" id="'+ idConfig.resizeRb +'"></i>',

											'<div class="bs_pop_bd" id="'+ idConfig.body +'">',
												'<div class="bs_pop_bd_cnt" id="'+ idConfig.content +'"></div>',
											'</div>',
											'<div class="bs_pop_ft" id="'+ idConfig.foot +'">',
												'<a href="javascript:;" class="bs_btn_s01 bs_btn_small" id="'+ idConfig.okBtn +'"><span>确定</span></a>',
												'<a href="javascript:;" class="bs_btn_s03 bs_btn_small" id="'+ idConfig.cancelBtn +'"><span>取消</span></a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize_area" id="'+ idConfig.resizeArea +'" style="display:none;"></div>',
										'<iframe class="bs_pop_if" frameborder="0"></iframe>'
									].join("");

								case "loading":
									return [
										'<div class="bs_loading_icon"></div>',
										'<a href="javascript:;" class="close" id="'+ idConfig.close +'">CLOSE</a>',
										'<div class="bs_pop_bd" id="'+ idConfig.content +'"></div>',
										'<iframe class="bs_pop_if" frameborder="0"></iframe>'
									].join("");

								case "normal":
								case "alert":
									
									return [
										'<div class="bs_pop_hd" id="'+ idConfig.head +'">',
											'<h3 class="h_tl" id="'+ idConfig.title +'"></h3>',
											'<div class="h_ctrl">',
												'<a href="javascript:;" '+ (option.minimize?'':'style="display:none;"') +'  class="mini" id="'+ idConfig.mini +'">mini</a>',
												'<a href="javascript:;" '+ (option.resize?'':'style="display:none;"') +' class="maximi" id="'+ idConfig.maximi +'">maximi</a>',
												'<a href="javascript:;" class="close" id="'+ idConfig.close +'">CLOSE</a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize">',
											'<i class="bs_pop_resize_l" id="'+ idConfig.resizeL +'"></i>',
											'<i class="bs_pop_resize_b" id="'+ idConfig.resizeB +'"></i>',
											'<i class="bs_pop_resize_r" id="'+ idConfig.resizeR +'"></i>',
											'<i class="bs_pop_resize_lb" id="'+ idConfig.resizeLb +'"></i>',
											'<i class="bs_pop_resize_rb" id="'+ idConfig.resizeRb +'"></i>',

											'<div class="bs_pop_bd" id="'+ idConfig.body +'">',
												'<div class="bs_pop_status" id="'+ idConfig.status +'"></div>',
												'<div class="bs_pop_bd_cnt" id="'+ idConfig.content +'"></div>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize_area" id="'+ idConfig.resizeArea +'" style="display:none;"></div>',
										'<iframe class="bs_pop_if" frameborder="0"></iframe>'
									].join("");

								case "error":
								case "success":
									
									return [
										'<div class="bs_pop_hd" id="'+ idConfig.head +'">',
											'<h3 class="h_tl" id="'+ idConfig.title +'"></h3>',
											'<div class="h_ctrl">',
												'<a href="javascript:;" '+ (option.minimize?'':'style="display:none;"') +'  class="mini" id="'+ idConfig.mini +'">mini</a>',
												'<a href="javascript:;" '+ (option.resize?'':'style="display:none;"') +' class="maximi" id="'+ idConfig.maximi +'">maximi</a>',
												'<a href="javascript:;" class="close" id="'+ idConfig.close +'">CLOSE</a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize">',
											'<i class="bs_pop_resize_l" id="'+ idConfig.resizeL +'"></i>',
											'<i class="bs_pop_resize_b" id="'+ idConfig.resizeB +'"></i>',
											'<i class="bs_pop_resize_r" id="'+ idConfig.resizeR +'"></i>',
											'<i class="bs_pop_resize_lb" id="'+ idConfig.resizeLb +'"></i>',
											'<i class="bs_pop_resize_rb" id="'+ idConfig.resizeRb +'"></i>',

											'<div class="bs_pop_bd" id="'+ idConfig.body +'">',
												'<div class="bs_pop_status" id="'+ idConfig.status +'"></div>',
												'<div class="bs_pop_bd_cnt" id="'+ idConfig.content +'"></div>',
											'</div>',
											'<div class="bs_pop_ft" id="'+ idConfig.foot +'">',
												'<a href="javascript:;" class="bs_btn_s03 bs_btn_small" mod-init="true" id="'+ idConfig.okBtn +'"><span>确定</span></a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize_area" id="'+ idConfig.resizeArea +'" style="display:none;"></div>',
										'<iframe class="bs_pop_if" frameborder="0"></iframe>'
									].join("");

								

								default: 
									return [
										'<div class="bs_pop_hd" id="'+ idConfig.head +'">',
											'<h3 class="h_tl" id="'+ idConfig.title +'"></h3>',
											'<div class="h_ctrl">',
												'<a href="javascript:;" '+ (option.minimize?'':'style="display:none;"') +'  class="mini" id="'+ idConfig.mini +'">mini</a>',
												'<a href="javascript:;" '+ (option.resize?'':'style="display:none;"') +' class="maximi" id="'+ idConfig.maximi +'">maximi</a>',
												'<a href="javascript:;" class="close" id="'+ idConfig.close +'">CLOSE</a>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize">',
											'<i class="bs_pop_resize_l" id="'+ idConfig.resizeL +'"></i>',
											'<i class="bs_pop_resize_b" id="'+ idConfig.resizeB +'"></i>',
											'<i class="bs_pop_resize_r" id="'+ idConfig.resizeR +'"></i>',
											'<i class="bs_pop_resize_lb" id="'+ idConfig.resizeLb +'"></i>',
											'<i class="bs_pop_resize_rb" id="'+ idConfig.resizeRb +'"></i>',

											'<div class="bs_pop_bd" id="'+ idConfig.body +'">',
												'<div class="bs_pop_status" id="'+ idConfig.status +'"></div>',
												'<div class="bs_pop_bd_cnt" id="'+ idConfig.content +'"></div>',
											'</div>',
										'</div>',
										'<div class="bs_pop_resize_area" id="'+ idConfig.resizeArea +'" style="display:none;"></div>',
										'<iframe class="bs_pop_if" frameborder="0"></iframe>'
									].join("");

							}
						},

						frontName = "bsPop",
						html = "",
						key;

					switch(t){
						case "confirm":
							frontName += "Confirm";
							break;

						case "loading":
							frontName += "Loading";
							classConfig.popup += " bs_pop_loading";
							break;

						case "error":
							frontName += "Status";
							classConfig.popup += " bs_pop_error";
							break;

						case "success":
							frontName += "Status";
							classConfig.popup += " bs_pop_success";
							break;

						case "normal":
						case "alert":
							frontName += "Normal";
							break;

						default:
							frontName = t;
							break;
						
					}

					for(key in idConfig){
						if(idConfig.hasOwnProperty(key)){
							idConfig[key] = frontName + idConfig[key];
						}
						
					}

					return {
						"className":classConfig,
						"id":idConfig,
						"html":htmlRebuild(t)
					};
				},

				queueIt = function(){
					if(me.queue.length === 0 || (me.queue[me.queue.length - 1] === popup && popup.style.zIndex === me.queue.maxZ)){
						return;
					}
					var fs,i,len;
					i = me.queue.indexOf(popup);

					i != -1 && me.queue.splice(i,1);

					me.queue.push(popup);


					for(i = 0, len = me.queue.length; i < len; i++){
						fs = me.queue[i];
						fs.style.zIndex = option.zIndex + i * 10;
						i === len - 1 && (me.queue.maxZ = fs.style.zIndex);
					}
				},

				//调整大小用区域 初始化
				resizeAreaInit = function(e,type){
					e = e || window.event;

					var rArea = popup.srcResizeArea,
						colResize = false,
						rowResize = false,
						isLeft = false,
						rWidth = 0,
						rHeight = 0;

					if(!rArea){
						return;
					}

					if(typeof rArea.borderColWidth == "undefined"){
						rArea.borderColWidth = (parseInt($(popup).css("border-left-width"),10) || 0) + (parseInt($(popup).css("border-top-width"),10) || 0);

						rArea.borderRowWidth = (parseInt($(popup).css("border-top-width"),10) || 0) + (parseInt($(popup).css("border-bottom-width"),10) || 0);
					}

					rWidth = parseInt(popup.style.width,10);
					rHeight = popup.offsetHeight - rArea.borderRowWidth;

					rArea.style.display = "";

					rArea.style.width = rWidth + "px";
					rArea.style.height = rHeight + "px";

					rArea.style.left = rArea.style.right = rArea.style.top = rArea.style.bottom = "auto";
					
					rArea.posX = e.clientX;
					rArea.posY = e.clientY;

					switch(type){
						case "left":
							rArea.style.right = rArea.style.top = 0;
							rArea.style.cursor = "w-resize";
							colResize = true;
							isLeft = true;
							break;

						case "left-bottom":
							rArea.style.right = rArea.style.top = 0;
							rArea.style.cursor = "sw-resize";
							colResize = rowResize = true;
							isLeft = true;
							break;

						case "right-bottom":
							rArea.style.left = rArea.style.top = 0;
							rArea.style.cursor = "se-resize";
							colResize = rowResize = true;
							break;

						case "right":
							rArea.style.left = rArea.style.top = 0;
							rArea.style.cursor = "e-resize";
							colResize = true;
							break;

						case "bottom":
							rArea.style.left = rArea.style.top = 0;
							rArea.style.cursor = "s-resize";
							rowResize = true;
							break;

					}

					document.onmousemove = function(e){
						e = e || window.event;

						var myWidth = rWidth + (isLeft? rArea.posX - e.clientX : e.clientX - rArea.posX),
							myHeight = rHeight +  e.clientY - rArea.posY;

						myWidth < 180 && (myWidth = 180);
						myHeight < 100 && (myHeight = 100);

						myWidth > document.documentElement.clientWidth - rArea.borderColWidth && (myWidth = document.documentElement.clientWidth - rArea.borderColWidth);
						myHeight > document.documentElement.clientHeight - rArea.borderRowWidth && (myHeight = document.documentElement.clientHeight - rArea.borderRowWidth);

						colResize && (rArea.style.width = myWidth + "px");
						rowResize && (rArea.style.height = myHeight + "px");

						window.getSelection && window.getSelection().removeAllRanges();
						document.selection && document.selection.empty();
						e.preventDefault && e.preventDefault();
						e.returnValue = false;
					};

					window.onblur = window.onlosecapture = document.onmouseup = function(){
						colResize && (popup.style.width = rArea.style.width);

						rowResize && popup.srcBody && (popup.srcBody.style.height = rArea.offsetHeight - (popup.offsetHeight - popup.srcBody.offsetHeight) + "px");

						rArea.style.display = "none";
						popup.fixed();
						window.onblur = window.onlosecapture = document.onmouseup = document.onmousemove = null;
					};
				},
				
				checkTarget = arguments.length == 1? type:op,
				popup, bg,myConfig, myId,
				i,len, fs, isSame = false;

			clearTimeout(me.readyKey);
			

			if(typeof checkTarget === "string"){
				option.content = checkTarget;

			} else if(typeof checkTarget === "object") {
				paramInit(checkTarget);
			}

			if(arguments.length == 2 && typeof type == "string"){
				option.type = type;
			}

			
			myConfig = popConfig(option.type);
			popup = $("#" + myConfig.id.popup)[0];
			if(!popup){
				popup = dc.createElement("div");
				popup.className = myConfig.className.popup;
				popup.id = myConfig.id.popup;
				popup.innerHTML = myConfig.html;

				popup.posX = popup.posY = 0;
				popup.myLeft = popup.myTop = NaN;

				popup.hide = function() {
					var that = this;
					clearTimeout(that.timeoutKey);
					$(that).removeClass("bs_pop_cur");

					popup.myLeft = popup.myTop = NaN;

					document.onmousemove = document.onmouseup = document.onselectstart = null;
					
					that.srcBg && that.srcBg.hide();
					that.srcHideCallback && that.srcHideCallback();
				};

				popup.fixed = function(){
					if(popup.sizingType == "max"){
						popup.style.width = popup.style.width = document.documentElement.clientWidth - (popup.offsetWidth - popup.srcHead.offsetWidth) + "px";
						//popup.srcBody && (popup.srcBody.style.height = document.documentElement.clientHeight - popup.srcHead.offsetHeight - 2 - (popup.srcFoot? popup.srcFoot.offsetHeight : 0) - popup.srcResizeB.offsetHeight + "px");
						popup.srcBody && (popup.srcBody.style.height = document.documentElement.clientHeight - (popup.offsetHeight - popup.srcBody.offsetHeight) + "px");
					}

					var that = this,
						extTop = jns.UA.ie && jns.UA.ie <= 6? me.myScroll.scrollTop: 0,
						extLeft = jns.UA.ie && jns.UA.ie <= 6? me.myScroll.scrollLeft: 0,

						limitLeft = extLeft,
						limitRight = extLeft + document.documentElement.clientWidth - popup.offsetWidth,

						limitTop = extTop,
						limitBottom = extTop + document.documentElement.clientHeight - popup.offsetHeight,

						myLeft = !isNaN(popup.myLeft)? (
							extLeft + popup.myLeft
						) : (
							extLeft + (document.documentElement.clientWidth - popup.offsetWidth) / 2
						),
						myTop = !isNaN(popup.myTop)? (
							extTop + popup.myTop
						) : (
							extTop +  (document.documentElement.clientHeight - popup.offsetHeight) / 2
						);

					
					
					//位置判断
					myLeft > limitRight && (myLeft = limitRight);
					myLeft < limitLeft && (myLeft = limitLeft);
					myTop > limitBottom && (myTop = limitBottom);
					myTop < limitTop && (myTop = limitTop);
					
					popup.style.left = myLeft + "px";
					popup.style.top = myTop + "px";

				};

				popup.sizingChange = function(type){
					switch(type){
						case "max":
						$(popup.srcMaximi).removeClass("maximi").addClass("reduce");

						popup.style.width = popup.style.width = document.documentElement.clientWidth - 2 + "px";
						popup.srcBody && (popup.srcBody.style.height = document.documentElement.clientHeight - popup.srcHead.offsetHeight - 2 - (popup.srcFoot? popup.srcFoot.offsetHeight : 0) + "px");

						popup.myLeft = popup.myTop = NaN;

						popup.sizingType = "max";
						break;

						case "mini":
						break;
						//..
						case "reduce":
						$(popup.srcMaximi).removeClass("reduce").addClass("maximi");
						popup.style.width = !isNaN(option.width) && option.width !== "" ? option.width + "px" : option.width;
						popup.srcBody && (popup.srcBody.style.height = !isNaN(option.height) && option.height !== ""  ? option.height + "px" : option.height);

						popup.myLeft = popup.myTop = NaN;

						popup.sizingType = "reduce";

						//..
						break;

					}
					me.TransKey && (popup.style[me.TransKey] = "none");
					popup.fixed();
					me.TransKey && (popup.style[me.TransKey] = "");
				};

				if(option.type == "loading"){
					popup.srcDelay = option.mustConfirm ? 0 : option.delay;
					popup.srcOvertime = option.overtime;
					popup.srcOnovertime = option.onovertime;

					popup.show = function(){
						var that = this;
						clearTimeout(that.timeoutKey);
						

						that.timeoutKey = setTimeout(function(){
							that.srcBg && that.srcBg.show();
							$(that).addClass("bs_pop_cur");
							that.fixed();
							that.focus();

							if (that.srcOvertime) {
								clearTimeout(that.overtimeKey);
								that.overtimeKey = setTimeout(function() {
									that.srcOnovertime();
								}, that.srcOvertime);
							}

							setTimeout(function(){
								queueIt();
							},10);

							that.srcShowCallback && that.srcShowCallback();

						},popup.srcDelay);

					};

				} else {
					popup.show = function(){
						var that = this;
						that.srcBg && that.srcBg.show();

						
						$(that).addClass("bs_pop_cur");
						that.focus();
						that.fixed();
						clearTimeout(this.aniKey);
						this.aniKey = setTimeout(function(){
							if(option.type == "confirm"){
								popup.srcOkBtn.focus();
							} else {
								popup.srcClose && popup.srcClose.focus();
							}
							queueIt();
						},200);
						switch(option.sizingType){
							case "max":
								that.sizingChange("max");
								break;
							case "normal":
								that.sizingChange("reduce");
								break;
							default:
								that.sizingChange("reduce");
								break;
						}
						
						
						that.srcShowCallback && that.srcShowCallback();
					};
				}


				option.appendTarget.appendChild(popup);
				

				popup.srcClose = $("#" + myConfig.id.close)[0];
				popup.srcMaximi = $("#" + myConfig.id.maximi)[0];
				popup.srcMini = $("#" + myConfig.id.mini)[0];
				popup.srcTitle = $("#" + myConfig.id.title)[0];
				popup.srcContent = $("#" + myConfig.id.content)[0];
				popup.srcHead = $("#" + myConfig.id.head)[0];
				popup.srcBody = $("#" + myConfig.id.body)[0];
				popup.srcFoot = $("#" + myConfig.id.foot)[0];

				popup.srcResizeL = $("#" + myConfig.id.resizeL)[0];
				popup.srcResizeR = $("#" + myConfig.id.resizeR)[0];
				popup.srcResizeB = $("#" + myConfig.id.resizeB)[0];
				popup.srcResizeLb = $("#" + myConfig.id.resizeLb)[0];
				popup.srcResizeRb = $("#" + myConfig.id.resizeRb)[0];
				popup.srcResizeArea = $("#" + myConfig.id.resizeArea)[0];

				popup.srcDelay = option.delay;
				popup.type = option.type;

				$(popup.srcClose).bind("click",function(e){
					popup.hide();
					popup.srcHideCallback && popup.srcHideCallback();
					jns.stopBubble(e);
				});

				$(popup.srcMaximi).bind("click",function(e){
					popup.srcMaximi.className.indexOf("maximi") != -1? popup.sizingChange("max"): popup.sizingChange("reduce");
					jns.stopBubble(e);
				});

				$(popup.srcMini).bind("click",function(e){
					$(popup.srcClose).trigger("click");
				});

				$(popup.srcClose).bind("keydown",function(e){
					e = e || window.event;
					if(e.keyCode == 27 || e.keyCode == 32){
						popup.hide();
						popup.srcOkCallback();
					}
				});

				$(popup.srcHead).bind("mousedown",function(e){
					e = e || window.event;
					
					me.TransKey && (popup.style[me.TransKey] = "none");


					popup.posX = e.clientX - (parseFloat(popup.style.left) || 0);
					popup.posY = e.clientY - (parseFloat(popup.style.top) || 0);



					document.onselectstart = function(){return false;};
					document.onmousemove = function(e){
						e = e || window.event;

						var myLeft = e.clientX - popup.posX,
							myTop = e.clientY - popup.posY,
							extTop = jns.UA.ie && jns.UA.ie <= 6? me.myScroll.scrollTop: 0,
							extLeft = jns.UA.ie && jns.UA.ie <= 6? me.myScroll.scrollLeft: 0;
							

						popup.myLeft = myLeft - extLeft;
						popup.myTop = myTop - extTop;

						

						popup.fixed();

						window.getSelection && window.getSelection().removeAllRanges();
						document.selection && document.selection.empty();
						e.preventDefault && e.preventDefault();
						e.returnValue = false;

						return false;
					};

					window.onblur = window.onlosecapture = document.onmouseup = function(){
						me.TransKey && (popup.style[me.TransKey] = "");
						document.onmousemove = document.onmouseup = document.onselectstart = null;

						return false;
					};

					queueIt();

					e.preventDefault && e.preventDefault();
					e.returnValue = false;
				});
				
				//拖放 左
				$(popup.srcResizeL).bind("mousedown",function(e){
					resizeAreaInit(e,'left');
				});

				//拖放 右
				$(popup.srcResizeR).bind("mousedown",function(e){
					resizeAreaInit(e,'right');
				});

				//拖放 下
				$(popup.srcResizeB).bind("mousedown",function(e){
					resizeAreaInit(e,'bottom');
				});

				//拖放 左下
				$(popup.srcResizeLb).bind("mousedown",function(e){
					resizeAreaInit(e,'left-bottom');
				});

				//拖放 右下
				$(popup.srcResizeRb).bind("mousedown",function(e){
					resizeAreaInit(e,'right-bottom');
				});

				$(window).bind("resize",popup.fixed);
				jns.UA.ie && jns.UA.ie <= 6 && $(window).bind("scroll",popup.fixed);

				switch(option.type){
					case "confirm":
						popup.srcOkBtn = $("#" + myConfig.id.okBtn)[0];
						popup.srcCancelBtn = $("#" + myConfig.id.cancelBtn)[0];

						$(popup.srcCancelBtn).bind("keydown",function(e) {
							if (e.keyCode == 9) {
								e.preventDefault && e.preventDefault();
								e.returnValue = false;
								popup.srcOkBtn.focus();

							}
						});

						popup.srcOkBtn.onkeydown = function(e){
							e = e || window.event;
							if(e.keyCode == 27 || e.keyCode == 32){
								popup.hide();
								popup.srcCancelCallback();
							}
						};

						popup.srcOkBtn.onclick = function() {
							popup.hide();
							popup.srcOkCallback();
						};

						popup.srcCancelBtn.onclick = function() {
							popup.hide();
							popup.srcCancelCallback();
						};

						break;

					case "loading":
						break;

					case "normal":
						break;

					case "success":
					case "error":
						popup.srcOkBtn = $("#" + myConfig.id.okBtn)[0];
						
						popup.srcOkBtn.onclick = function() {
							popup.hide();
							popup.srcOkCallback();
						};

						break;
					
						

					default:
						break;
				}

				me.queue.push(popup);
			}

			

			switch(option.type){
				case "confirm":
					
					popup.srcShowCallback = function(){
						var that = this;
						that.srcOkBtn.focus();
						option.onload.call(that);
					};

					popup.srcHideCallback = function(){
						var that = this;
						that.srcCancelCallback();
					};

					popup.srcOkCallback = function(){
						var that = this;
						option.callback.call(that);
					};

					popup.srcCancelCallback = function(){
						var that = this;
						option.cancelCallback.call(that);
					};

					break;

				case "loading":

					popup.srcDelay = (option.mustConfirm ? 0 : 1000);
					popup.srcOvertime = option.overtime;
					popup.srcOnovertime = option.onovertime;

					popup.srcShowCallback = function(){
						var that = this;
						clearTimeout(that.timeoutKey);
						that.timeoutKey = setTimeout(function() {
							dc.body.appendChild(that);
							that.style.marginLeft = -that.offsetWidth / 2 + "px";
							that.style.marginTop = -that.offsetHeight / 2 + "px";
							$(that).addClass("bs_pop_cur");
							if (that.srcOvertime) {
								clearTimeout(that.overtimeKey);
								that.overtimeKey = setTimeout(function() {
									that.srcOnovertime();
								}, that.srcOvertime);
							}
							
							option.onload && option.onload.call(that);
						}, that.srcDelay);
					};
					break;


				case "normal":
				case "error":
				case "success":
					popup.srcShowCallback = function(){
						var that = this;
						option.onload.call(that);
						clearTimeout(that.timeoutKey);

						if(option.timeout > 0){
							that.timeoutKey = setTimeout(function(){
								that.hide();
							},option.timeout);
						}
					};

					popup.srcHideCallback = function(){
						var that = this;
						option.callback.call(that);
					};

					popup.srcOkCallback = function(){
						var that = this;
						option.callback.call(that);
					};
					break;

				default:
					popup.srcShowCallback = function(){
						var that = this;
						option.onload.call(that);
					};

					popup.srcHideCallback = function(){
						var that = this;
						option.callback.call(that);
					};

					popup.srcOkCallback = function(){
						var that = this;
						option.callback.call(that);
					};
					break;

			}

			

			if(option.mustConfirm){
				bg = $("#bsPopBg")[0];
				if(!bg){
					bg = dc.createElement("div");
					bg.className = "bs_pop_bg";
					bg.id = "popupBg";
					bg.show = function() {
						this.style.visibility = "visible";
					};
					bg.hide = function() {
						this.style.visibility = "hidden";
					};
					bg.onclick = function() {
						var _this = this;
						clearTimeout(this.timeoutKey);
						$(this.srcPopup).addClass("bs_pop_animate");
						this.timeoutKey = setTimeout(function() {
							$(_this.srcPopup).removeClass("bs_pop_animate");
						}, 1000);

					};

					dc.body.appendChild(bg);
				}
			}

			if(popup.srcTitle){
				popup.srcTitle.innerHTML = option.title;
				popup.srcTitle.style.display = (option.title === ""?"none":"");
			}
			popup.className = myConfig.className.popup;

			popup.style.width = !isNaN(option.width) && option.width !== "" ? option.width + "px" : option.width;
			popup.srcBody && (popup.srcBody.style.height = !isNaN(option.height) && option.height !== ""  ? option.height + "px" : option.height);
			

			popup.style.zIndex = option.zIndex;
			if((typeof option.content == "object" && option.content.nodeType == 1) || (typeof option.content == "string" && /^[a-z\.#]/ig.test(option.content) && $(option.content).length > 0)){
				$(option.content).show();
				$(popup.srcContent).append($(option.content));
			} else {
				popup.srcContent.innerHTML = option.content;
			}

			//判断是否可调整宽度
			if(option.resize){
				$(popup.srcResizeL).parent().removeClass("bs_pop_resize_disable");
			} else {
				$(popup.srcResizeL).parent().addClass("bs_pop_resize_disable");
			}

			
			option.show && popup.show();

			return popup;
		}

	};

// 输出
if(typeof define == 'function' && define.amd){
	define('jns', [], function(){return jns});

} else {
	window.jns = jns;
}


}(window, undefined);
