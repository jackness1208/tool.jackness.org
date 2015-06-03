module.exports = function(orgin, data, grunt) {
	var she = this,
		
		clone = function(obj){

			if(typeof(obj) != 'object' || obj === null){
				return obj;
			}
			
			var r = Array.prototype.splice === obj.splice?[]:{};
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					r[i] = clone(obj[i]);

				}
			}
			
			return r;

		},

        isArray = function(obj){
            return /Array/.test(Object.prototype.toString.call(obj))
        },

        isEqual = function(o1,o2){
            if(typeof o1 != typeof o2){
                return false;
            }

            var same = true;

            !function doit(o1,o2){
                

                if(!same || typeof o1 != typeof o2){
                    same = false;
                    return false;
                }


                switch(typeof o1){
                    case "object":
                        var key;
                        if(o1 === null || o2 === null){
                            if(o1 !== o2){
                                same = false;
                                return false;
                            }

                        } else {
                            for(key in o1){
                                if(o1.hasOwnProperty(key)){
                                    if(!same || doit(o1[key],o2[key]) === false){
                                        return false;
                                    }
                                    
                                }
                            }
                        }
                        
                        break;

                    case "function":
                        if(o1.toString() !== o2.toString()){
                            same = false;
                            return false;
                        }
                        break;

                    case "string":
                    case "number":
                        if(o1 !== o2){
                            same = false;
                            return false;
                        }
                        break;

                    default:
                        if(o1 !== o2){
                            same = false;
                            return false;
                        }
                        break;
                }
            }(o1,o2);

            return same;
        },
		//以 o1为准，
		objConcat = function(o1, o2){
            if(typeof o1 != 'object'){
                if(o1 === undefined || o1 === null){
                    return clone(o2);

                } else {
                    return clone(o1);
                }

            } else {
                var r = clone(o1);
                if(/Array/.test(Object.prototype.toString.call(r))){
                    var r2, isRepeat, j, jlen;

                    if(/Array/.test(Object.prototype.toString.call(o2))){
                        r2 = o2;
                    } else {
                        r2 = [o2];
                    }
                    for(var i = 0, len = r2.length; i < len; i++){
                        isRepeat = false;
                        for(j = 0, jlen = r.length; j < jlen; j++){
                            if(isEqual(r[j],r2[i])){
                                isRepeat = true;
                                break;
                            }
                        }
                        
                        if(!isRepeat){
                            r.push(r2[i]);
                        }
                    }

                } else {
                    for(var key in o2){
                        if(o2.hasOwnProperty(key)){
                            r[key] = objConcat(r[key], o2[key]);
                        }
                    }
                }
                

                return r;
            }

		},
		release = {

			uglify: function(source){
                var r = {};

				//seajs执行部分
                for(key in source){
                    if(source.hasOwnProperty(key) && source[key].js && isArray(source[key].js)){
                        for(i = 0, len = source[key].js.length; i < len; i++){
                            fdata = source[key].js[i];
                            fdata.cwd = fdata.cwd || '';
                            if(typeof fdata != "object" || !isArray(fdata.src) || !fdata.dest){
                                continue;
                            }
                            if(!r[key]){
                                r[key] = {
                                    files: {}
                                };
                            }

                            r[key].files[fdata.cwd + fdata.dest] = fdata.cwd + fdata.dest;
                        }
                    }
                }
                return r;
			},
			copy: function(source){
				var r = {},
                    attr,

                    pathKey,
                    pathAttr,
                    pathValue,

                    key,
                    i, len, fdata,
                    src2Items = function(srcs,path, cwd){
                        var r = [],
                            i, len, key, src,
                            mySrcs;

                        if(!srcs){
                            mySrcs = [];
                        }

                        if(!cwd){
                            cwd = "";
                        }

                        if(!isArray(srcs)){
                            mySrcs = [srcs];
                        } else {
                            mySrcs = srcs;
                        }

                        for(i = 0, len = mySrcs.length; i < len; i++){
                            src = mySrcs[i];
                            r.push({
                                "src": cwd + src,
                                "dest": cwd + path
                            });
                            
                        }

                        return r;
                    };

                //seajs执行部分
                for(key in source){
                    if(source.hasOwnProperty(key) && source[key].js && /Array/.test(Object.prototype.toString.call(source[key].js))){
                        for(i = 0, len = source[key].js.length; i < len; i++){
                            fdata = source[key].js[i];

                            if(typeof fdata != "object" || !isArray(fdata.src) || !fdata.dest){
                                continue;
                            }
                            if(!r[key]){
                                r[key] = {
                                    files:[]
                                };
                            }

                            r[key].files = r[key].files.concat(
                                src2Items(
                                    fdata.src[0],
                                    fdata.dest,
                                    fdata.cwd
                                )
                            );
                        }
                    }
                }
                

                //项目复制部分
                for(key in source){
                    if(source.hasOwnProperty(key)){

                        for(pathKey in source[key].path){
                            if(source[key].path.hasOwnProperty(pathKey)){

                                for(attr in source[key]){
                                    if(source[key].hasOwnProperty(attr) && attr != "path" ){

                                        if(!r[key]){
                                            r[key] = {
                                                files:[]
                                            };
                                        }

                                        pathAttr = key + "-" + pathKey;
                                        pathValue = source[key].path[pathKey];

                                        if(!r[pathAttr]){
                                            r[pathAttr] = {
                                                files:[]
                                            };
                                        }

                                        for(i = 0, len = source[key][attr].length; i < len; i++){
                                            fdata = source[key][attr][i];
                                            
                                            if(typeof fdata == "object"){
                                                fdata.cwd = fdata.cwd || '';
                                                r[pathAttr].files = r[pathAttr].files.concat(
                                                    src2Items(
                                                        fdata.cwd + fdata.src,
                                                        pathValue
                                                        
                                                    )
                                                );
                                                r[pathAttr].files = r[pathAttr].files.concat(
                                                    src2Items(
                                                        fdata.cwd + fdata.dest,
                                                        pathValue
                                                        
                                                    )
                                                );

                                            
                                            } else {
                                                fdata.cwd = fdata.cwd || '';

                                                r[pathAttr].files = r[pathAttr].files.concat(
                                                    src2Items(
                                                        fdata.cwd + fdata,
                                                        pathValue
                                                        
                                                    )
                                                );
                                            }
                                            
                                        }
                                        
                                    }
                                }
                            }
                        }

                        

                    }
                }

                return r;
			},

            transport: function(source){
                var r = {},
                    src2Items = function(srcs, path, cwd){
                        var r = {},
                            i, len, key, src,
                            mySrcs;

                        !srcs && (srcs = []);
                        !cwd && (cwd = '');

                        !isArray(srcs)?(
                            mySrcs = [srcs]
                        ):(
                            mySrcs = srcs
                        );

                        mySrcs = clone(mySrcs);
                            
                        mySrcs[0] = path;

                        r = {
                            "src": mySrcs,
                            "dest": '.build/' + cwd,
                            "cwd": cwd,
                        };

                        return r;
                    };

                //seajs执行部分
                for(key in source){
                    if(source.hasOwnProperty(key) && source[key].js && isArray(source[key].js)){
                        for(i = 0, len = source[key].js.length; i < len; i++){
                            fdata = source[key].js[i];
                            if(typeof fdata != "object" || !isArray(fdata.src) || !fdata.dest){
                                continue;
                            }
                            if(!r[key]){
                                r[key] = {
                                    options: {
                                        'relative': true,
                                        'format': fdata.format
                                    },
                                    files: []
                                };
                            }

                            r[key].files.push( src2Items( fdata.src, fdata.dest, fdata.cwd ) );
                            
                        }
                    }
                }
                
                return r;
            },

            concat: function(source){
                var r = {};

                //seajs执行部分
                for(key in source){
                    if(source.hasOwnProperty(key) && source[key].js && isArray(source[key].js)){
                        for(i = 0, len = source[key].js.length; i < len; i++){
                            fdata = source[key].js[i];
                            fdata.cwd = fdata.cwd || '';
                            if(typeof fdata != "object" || !isArray(fdata.src) || !fdata.dest){
                                continue;
                            }
                            if(!r[key]){
                                r[key] = {
                                    options: {
                                    },
                                    files: {}
                                };
                            }

                            r[key].files[fdata.cwd + fdata.dest] = '.build/' + fdata.cwd + fdata.dest;
                        }
                    }
                }

                return r;
            },

            clean: function(source){
                var r = {};
                //seajs执行部分
                for(key in source){
                    if(source.hasOwnProperty(key)){
                        r[key] = ['.build'];
                    }
                }

                return r;
            },

			watch: function(source){
				var r = {},
                    i, len, fdata,
                    j, jlen, fsrc;
                for(var key in source){
                    if(source.hasOwnProperty(key)){
                        for(i = 0, len = source[key].js.length; i < len; i++){
                            fdata = source[key].js[i];
                            !fdata.cwd && (fdata.cwd = '');
                            if(typeof fdata == "object"){
                                if(!r[key]){
                                    r[key] = {
                                        tasks:["default"],
                                        files:[]
                                    };
                                }
                                if(isArray(fdata.src)){
                                    for(j = 0, jlen = fdata.src.length; j < jlen; j++){
                                        fsrc = fdata.src[j];
                                        r[key].files.push(fdata.cwd + fsrc);
                                    }

                                } else {
                                    r[key].files.push(fdata.cwd + fdata.src);
                                }
                                
                            }
                        }
                    }
                }

                return r;
			}
		},
		r = clone(orgin);

    //初始化
    for(var key in release){
        if(release.hasOwnProperty(key)){
            r[key] = objConcat(r[key], release[key](data));
        }
    }

	return r;
}