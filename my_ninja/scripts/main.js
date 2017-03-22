// requestAnimationFrame 的浏览器兼容性处理
var w = window;
requestAnimationFrame = w.requestAnimationFrame 
						|| w.webkitRequestAnimationFrame 
						|| w.msRequestAnimationFrame 
						|| w.mozRequestAnimationFrame;
var then = Date.now();

// 启动！
menu_init();
menu_draw();