var __sid = 2;
var textarea = $("#base64-textarea"),
bluebtns = $("#base64-buttons-container a.blue:not(.kok)"),
btns = $("#base64-buttons-container a.btn:not(.blue)"),
checkboxs = $("#base64-buttons-container span.checkbox"),
imgview = $("#base64-imgview"),
img = $("#base64-img"),
base64swf = $("#base64-swf").get(0);

btns.eq(0).click(function(){
	textarea.val("");
});

bluebtns.eq(0).click(function(){
	textarea.val( base64swf.getBase64( textarea.val() ) );
});

window.__oncopy = function(){
	alert("复制成功");
	return textarea.val();
};

checkboxs.click(function(){
	var index = checkboxs.index(this);
	if(index == 0 && !checkboxs.eq(0).hasClass("selected") ){
		checkboxs.removeClass("selected");	
	}else if( index == 1 && checkboxs.eq(1).hasClass("selected") ){
		checkboxs.addClass("selected");
	}
	changeData();
});

function changeData(){
	if( base64Data == "" ){
		return;	
	}
	var data = base64Data;
	if( checkboxs.eq(0).hasClass("selected") ){
		data = "data:image/" + base64Type + ";base64," + data;
		if( checkboxs.eq(1).hasClass("selected")){
			data = "background-image: url(\"" + data + "\");"
		}
	}
	textarea.val( data );	
}

var base64Data = "", base64Type = "";
window.__onbase64 = function(type, data){
	base64Type = type.slice(1);
	base64Data = data;
	changeData();
	img.attr("src", "data:image/" + type + ";base64," + data);
	imgview.show(1000);
};
