require('resource/jquery-1.js?__inline');
require('resource/iColorPicker.js?__inline');
require('resource/public.js?__inline');
require('resource/index.js?__inline');
require('resource/basefn.js?__inline');
require('resource/qrcode.js?__inline');
require('resource/canvas.js?__inline');
require('resource/subnav.js?__inline');
require('resource/html5.js?__inline');
require('resource/ie.js?__inline');


module.exports = function(){
    var _speedMark = new Date();

    <!--
    defalutText($('#text_text'), '支持文本、网址和电子邮箱');
    changeWifi();
    tabfn($('#fntab li'), $('#fnbox .sub'));
    //fixtaba($('#fntab a'), $('#fntab li'));
    tabfn($('#tabset .tabelem'), $('#fnblock .fnsubv'));
    elemfocus($('#fnbox .dinput,#url_url,#text_text,#sms_sms'));
    elemSwitch($('#addelem'), $('#litel'));
    openmore($('#urloptions'), $('#urlset'));
    addpic($('#logoimg'), $('#picelem'), $('#turn'), $('#format'));
    hideelem($('#hidetel'), $('#litel'), $('#addelem'), function() {
        $('#card_phone').val('');
    });
    urlselect();

    resetAll();
    
    //-->
};