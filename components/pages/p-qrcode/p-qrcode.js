module.exports = function(){
    var _speedMark = new Date();
    
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

    __inline('/views/page/p-qrcode/js/subnav.js');
    __inline('/views/page/p-qrcode/js/html5.js');
    __inline('/views/page/p-qrcode/js/ie.js');
};