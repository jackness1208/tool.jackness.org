pagelet.router('/:page/index', function(ctx, options, event, next){
    if(/^\w+$/.test(ctx.page)){
        var navs = document.getElementById('toolNav').getElementsByTagName("a"),
        	widgetTl = document.getElementById('widgetTl'),

        	curTitle = '';

        for(var i = 0, fd, len = navs.length; i < len; i++){
        	fd = navs[i];
        	if(fd.href.indexOf(ctx.page) == -1){
        		fd.parentNode.className = '';

        	} else {
        		fd.parentNode.className = 'cur';
        		curTitle = fd.innerText || fd.textContent;
        	}
        	fd.parentNode.className = fd.href.indexOf(ctx.page) == -1? '': 'cur';
        }

        widgetTl.innerHTML = curTitle;
        document.title = "jackNEss 窝窝 - " + curTitle;
        
    }
    next();
});
