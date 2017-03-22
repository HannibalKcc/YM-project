// 刀点坐标类
var Points_loc = {
　　　　createNew: function(){
　　　　　　var points_loc = {};
　　　　　　points_loc.x = 0;
			points_loc.y = 0;
			points_loc.rate = 1;
　　　　　　return points_loc;
　　　　}
};
var knife_points = new Array();

var mousemove_delta = 0;
var mousemove_then = Date.now();
// 监听事件——记录刀点
my_canvas.onmousedown = function (even){
	my_canvas.onmousemove = function (even){
		var j_even = even || window.event;
		var mousemove_now = Date.now();
		mousemove_delta += mousemove_now - mousemove_then;
		mousemove_then = mousemove_now;
		if (mousemove_delta / 1000 >= 0.01)
		{
			mousemove_delta = 0;

			var my_points_loc = Points_loc.createNew();
			// console.log(j_even.offsetX);
			my_points_loc.x = j_even.offsetX;
			my_points_loc.y = j_even.offsetY;
			knife_points.push(my_points_loc);
		}
		// console.log(knife_points);
	};
	//当鼠标松开后关闭记录刀点事件和自身事件
	document.onmouseup = function () {      
        my_canvas.onmousemove = null;
        my_canvas.onmouseup = null;
    }
};

// 函数——刀绘画
function knife_render (modifier)
{
	for (var i = 0; i < knife_points.length-1; i++) {
		var angle = Math.atan2(knife_points[i+1].y - knife_points[i].y 
					,knife_points[i+1].x - knife_points[i].x);
		var cable_length_pow2 = 0;
		cable_length_pow2 = Math.pow(knife_points[i+1].x - knife_points[i].x,2) 
					+ Math.pow(knife_points[i+1].y - knife_points[i].y,2);
		// 绘画刀
		ctx.save();
		ctx.translate(knife_points[i].x, knife_points[i].y);
		ctx.scale(1,1);
		ctx.rotate(angle);
		ctx.fillStyle='grey';
		ctx.fillRect(0, 0, Math.sqrt(cable_length_pow2) + 3
			,10 *knife_points[i].rate);
		ctx.restore();

		// 刀点周期设置以及删除
		knife_points[i].rate -= modifier * 3;
		if (knife_points[i].rate <= 0.3)
		{
			knife_points.splice(i, 1);
		}
		if (knife_points.length == 1)
		{
			knife_points.splice(0, 1);
		}				
	}
}
