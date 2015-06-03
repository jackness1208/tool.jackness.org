module.exports = function(){
    var pluginFrame = $('#pluginFrame')[0],
        cw;
    try{
        cw = pluginFrame.contentWindow;
    } catch(er){}

    if(cw && pluginFrame){
        pluginFrame.onload = function(){
            this.style.height = cw.document.body.scrollHeight + "px";
        };
    }
};
