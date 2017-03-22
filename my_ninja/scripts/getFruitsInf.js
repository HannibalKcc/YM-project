// 水果信息类
var Fruits_inf = {
　　　　createNew: function(){
　　　　　　var fruits_inf = {};
			fruits_inf.id = -1;
			fruits_inf.type;
			fruits_inf.image = new Image();
			fruits_inf.image.src = "";
			fruits_inf.x = 0;
			fruits_inf.y = 0;
			fruits_inf.start_x = 0;
			fruits_inf.end_x = 0;
			fruits_inf.a = 0;
			fruits_inf.b = 0;
			fruits_inf.c = 0;
			fruits_inf.rotate = 0 * Math.PI/180;
			fruits_inf.rotate_rate = 0 * Math.PI/180;
　　　　　　return fruits_inf;
　　　　}
};

// 函数——获取菜单的水果信息
function getFruitsInf_menu (){
	var fruits_inf = new Array();
	for (var i = 0; i < 3; i++)
	{
		fruits_inf[i] = Fruits_inf.createNew();
	}
	fruits_inf[0].type = "menu_peach";
	fruits_inf[0].x = order_trans_step_i[3][7][0];
	fruits_inf[0].y = order_trans_step_i[3][7][1];

	fruits_inf[1].type = "menu_watermelon";
	fruits_inf[1].x = order_trans_step_i[3][8][0];
	fruits_inf[1].y = order_trans_step_i[3][8][1];
	fruits_inf[1].rotate = order_rotate_step_i[4][8];

	fruits_inf[2].type = "menu_bomb";
	fruits_inf[2].x = order_trans_step_i[3][9][0];
	fruits_inf[2].y = order_trans_step_i[3][9][1];

	return fruits_inf;
}