var width = 750;
var scale = screen.availWidth / width;
var meta = document.createElement("meta");
meta.setAttribute("name", "viewport");
meta.setAttribute("content", "width=" + width + ",target-densitydpi=device-dpi,user-scalable=yes,initial-scale=" + scale + ",minimum-scale=" + scale + ",maximum-scale=" + scale);
document.getElementsByTagName("head")[0].appendChild(meta);

//IOS下的回弹效果
document.addEventListener("load", function() {
	document.getElementById("body").addEventListener("touchmove", function(ev) {
		ev.stopPropagation();
	});
	document.addEventListener("touchmove", function(ev) {
		ev.preventDefault();
		return false;
	}, false);
});