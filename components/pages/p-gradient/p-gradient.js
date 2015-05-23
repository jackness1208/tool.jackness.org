module.exports = function(){
  var gGradientEditor = new Gradient.Editor('gradient-control-1');
  if (!gGradientEditor.cssGradientsSupported()) {
      Dialog.alert("Looks like your browser doesn't fully support CSS gradients. You need a recent version of Firefox, Chrome or Safari to use this tool.", {width:300, height:110, okLabel: "OK", ok:function(win) {return true;}}); 
  }

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-1155620-3']);
  _gaq.push(['_trackPageview']);



  window.showLoopDialog = function(show) {
      if (show) {
          $('loop-dialog').show();
      }
  }
};