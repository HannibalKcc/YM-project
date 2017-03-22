// 函数——碰撞检测
function impact_check (temp_knife_now, temp_fruits_inf){
	// TODO 水果没有加载完毕就可以判定成功了
	if (typeof(temp_knife_now) == "undefined")
		return ;

	for (var i = 0; i < temp_fruits_inf.length; i++) {
		if (temp_fruits_inf[i].type == "peach" 
			|| temp_fruits_inf[i].type == "menu_peach")
		{
			if (Math.pow(temp_knife_now.x - temp_fruits_inf[i].x, 2) 
				+ Math.pow(temp_knife_now.y - temp_fruits_inf[i].y, 2)
				< 30*30)
			{
				console.log("impact peach!");
				temp_fruits_inf[i].id = i;
				return temp_fruits_inf[i];
			}
		}
		else if (temp_fruits_inf[i].type == "apple")
		{
			if (Math.pow(temp_knife_now.x - temp_fruits_inf[i].x, 2) 
				+ Math.pow(temp_knife_now.y - temp_fruits_inf[i].y, 2)
				< 33*33)
			{
				console.log("impact apple!");
				temp_fruits_inf[i].id = i;
				return temp_fruits_inf[i];
			}
		}
		else if (temp_fruits_inf[i].type == "basaha")
		{
			if (Math.pow(temp_knife_now.x - temp_fruits_inf[i].x, 2) 
				+ Math.pow(temp_knife_now.y - temp_fruits_inf[i].y, 2)
				< 34*34)
			{
				console.log("impact basaha!");
				temp_fruits_inf[i].id = i;
				return temp_fruits_inf[i];
			}
		}
		else if (temp_fruits_inf[i].type == "sandia" 
			|| temp_fruits_inf[i].type == "menu_watermelon")
		{
			var x1 = 24 * Math.cos(temp_fruits_inf[i].rotate);
			var y1 = 24 * Math.sin(temp_fruits_inf[i].rotate);
			var x2 = -24 * Math.cos(temp_fruits_inf[i].rotate);
			var y2 = -24 * Math.sin(temp_fruits_inf[i].rotate);
			var conversion_knife_x = temp_knife_now.x - temp_fruits_inf[i].x;
			var conversion_knife_y = temp_knife_now.y - temp_fruits_inf[i].y;
			if (Math.sqrt(Math.pow(conversion_knife_x- x1, 2) + Math.pow(conversion_knife_y - y1, 2))
				+ Math.sqrt(Math.pow(conversion_knife_x - x2, 2) + Math.pow(conversion_knife_y - y2, 2))
				< 98)
			{
				console.log("impact watermelon!");
				temp_fruits_inf[i].id = i;
				return temp_fruits_inf[i];
			}
		}
		else if (temp_fruits_inf[i].type == "banana" 
			|| temp_fruits_inf[i].type == "menu_banana")
		{
			// TODO 提升难度——能不能更精确？
			var x1 = 58 * Math.cos(temp_fruits_inf[i].rotate);
			var y1 = 58 * Math.sin(temp_fruits_inf[i].rotate);
			var x2 = -58 * Math.cos(temp_fruits_inf[i].rotate);
			var y2 = -58 * Math.sin(temp_fruits_inf[i].rotate);
			var conversion_knife_x = temp_knife_now.x - temp_fruits_inf[i].x;
			var conversion_knife_y = temp_knife_now.y - temp_fruits_inf[i].y;
			if (Math.sqrt(Math.pow(conversion_knife_x- x1, 2) + Math.pow(conversion_knife_y - y1, 2))
				+ Math.sqrt(Math.pow(conversion_knife_x - x2, 2) + Math.pow(conversion_knife_y - y2, 2))
				< 126)
			{
				console.log("impact banana!");
				temp_fruits_inf[i].id = i;
				return temp_fruits_inf[i];
			}
		}
		else if (temp_fruits_inf[i].type == "boom" 
			|| temp_fruits_inf[i].type == "menu_bomb") 
		{
			if (Math.pow(temp_knife_now.x - temp_fruits_inf[i].x, 2) 
				+ Math.pow(temp_knife_now.y - temp_fruits_inf[i].y, 2)
				< 33*33)
			{
				console.log("impact_bomb!");
				return temp_fruits_inf[i];
			}
		}
	};
}

// 碎片图类
var Pieces_inf = {
　　　　createNew: function(){
　　　　　　var pieces_inf = {};
			pieces_inf.left_pic = new Image();
			pieces_inf.left_pic.src;
			pieces_inf.right_pic = new Image();
			pieces_inf.right_pic.src;
			pieces_inf.base_impact_x =0;
			pieces_inf.base_impact_y =0;
			pieces_inf.base_angle = 0 * Math.PI/180;
			pieces_inf.lifecycle = 1;
　　　　　　return pieces_inf;
　　　　}
};
var fruit_pieces_inf = new Array();

// 闪光类
var Flash_inf = {
　　　　createNew: function(){
　　　　　　var flash_inf = {};
			flash_inf.x = 0;
			flash_inf.y = 0;
			flash_inf.angle = 0 * Math.PI/180;
			flash_inf.lifecycle = 1;
　　　　　　return flash_inf;
　　　　}
};
var comm_flash_inf = new Array();

// 果汁类
var Juice_inf = {
　　　　createNew: function(){
　　　　　　var juice_inf = {};
			juice_inf.base_x = 0;
			juice_inf.base_y = 0;
			juice_inf.dis_x = [];
			juice_inf.dis_y = [];
			juice_inf.dir = [];
			juice_inf.color;
			juice_inf.lifecycle = 1;
　　　　　　return juice_inf;
　　　　}
};
var comm_juice_inf = new Array();

// 函数——写入碎片水果图 && 闪光 && 果汁
function get_impact_inf (temp_kinfe_point1
	, temp_kinfe_point2
	, temp_impact_fruit){	
	if (typeof(temp_impact_fruit) == "undefined" 
		|| typeof(temp_kinfe_point1) == "undefined" 
		|| typeof(temp_kinfe_point2) == "undefined" )
		return;
	var my_fruit_pieces_inf = Pieces_inf.createNew();
	var my_comm_flashs_inf = Flash_inf.createNew();
	var my_comm_juice_inf = Juice_inf.createNew();
	// 分裂角度
	var angle = Math.atan2(temp_kinfe_point1.y - temp_kinfe_point2.y 
					,temp_kinfe_point1.x - temp_kinfe_point2.x);
	my_comm_flashs_inf.angle = angle;
	if (angle < 0)
	{
		angle += Math.PI;
	}
	// 消失老图 && 根据原图写入碎片水果图,果汁颜色
	if(temp_impact_fruit.type == "apple")
	{
		if (temp_impact_fruit.id != -1)
		{
			// 计分  && 删除原图
			// 下同
			gaming_ele_render.counter++;
			gaming_ele_render.get_flag = 1;
			gaming_fruits_render.inf_arr.splice(temp_impact_fruit.id, 1);

		}
		// 写入左右碎片图src && 图片补正 && 果汁颜色
		// 下同
		my_fruit_pieces_inf.left_pic.src = comm_fruits_pieces[0].image.src;
		my_fruit_pieces_inf.right_pic.src = comm_fruits_pieces[1].image.src;
		my_fruit_pieces_inf.base_angle = angle - 45 * Math.PI/180;
		my_comm_juice_inf.color = "#c8e925";
		// 加入音效
		music_splatter.play();
	}
	else if(temp_impact_fruit.type == "banana")
	{
		if (temp_impact_fruit.id != -1)
		{
			gaming_ele_render.counter++;
			gaming_ele_render.get_flag = 1;
			gaming_fruits_render.inf_arr.splice(temp_impact_fruit.id, 1);
		}
		my_fruit_pieces_inf.left_pic.src = comm_fruits_pieces[2].image.src;
		my_fruit_pieces_inf.right_pic.src = comm_fruits_pieces[3].image.src;
		my_fruit_pieces_inf.base_angle = angle + 90 * Math.PI/180;
		my_comm_juice_inf.color = "#FFD700";
		// 加入音效
		music_splatter.play();
	}
	else if(temp_impact_fruit.type == "basaha")
	{
		if (temp_impact_fruit.id != -1)
		{
			gaming_ele_render.counter++;
			gaming_ele_render.get_flag = 1;
			gaming_fruits_render.inf_arr.splice(temp_impact_fruit.id, 1);
		}
		my_fruit_pieces_inf.left_pic.src = comm_fruits_pieces[4].image.src;
		my_fruit_pieces_inf.right_pic.src = comm_fruits_pieces[5].image.src;
		my_fruit_pieces_inf.base_angle = angle - 135 * Math.PI/180;
		my_comm_juice_inf.color = "#c00";
		// 加入音效
		music_splatter.play();
	}
	else if (temp_impact_fruit.type == "menu_peach"
		|| temp_impact_fruit.type == "peach")
	{
		if (temp_impact_fruit.id != -1 && temp_impact_fruit.type == "peach")
		{
			gaming_ele_render.counter++;
			gaming_ele_render.get_flag = 1;
			gaming_fruits_render.inf_arr.splice(temp_impact_fruit.id, 1);
		}
		else
		{
			order_trans_step_i[3][7][0] = -10000;
		}
		my_fruit_pieces_inf.left_pic.src = comm_fruits_pieces[6].image.src;
		my_fruit_pieces_inf.right_pic.src = comm_fruits_pieces[7].image.src;
		my_fruit_pieces_inf.base_angle = angle - 45 * Math.PI/180;
		my_comm_juice_inf.color = "#e6c731";
		// 加入音效
		music_splatter.play();
	}
	else if(temp_impact_fruit.type == "menu_watermelon"
		|| temp_impact_fruit.type == "sandia")
	{
		if (temp_impact_fruit.id != -1 && temp_impact_fruit.type == "sandia")
		{
			gaming_ele_render.counter++;
			gaming_ele_render.get_flag = 1;
			gaming_fruits_render.inf_arr.splice(temp_impact_fruit.id, 1);
		}
		else
		{
			console.log("Hi");
			order_trans_step_i[3][8][0] = -10000;
		}
		my_fruit_pieces_inf.left_pic.src = comm_fruits_pieces[8].image.src;
		my_fruit_pieces_inf.right_pic.src = comm_fruits_pieces[9].image.src;
		my_fruit_pieces_inf.base_angle = angle - 90 * Math.PI/180;
		my_comm_juice_inf.color = "#c00";
		// 加入音效
		music_splatter.play();
	}
	else if(temp_impact_fruit.type == "menu_bomb"
		|| temp_impact_fruit.type == "boom")
	{
		// 炸弹没有碎片 闪光 果汁
		my_fruit_pieces_inf.lifecycle = -1;
		my_comm_flashs_inf.lifecycle = -1;
		my_comm_juice_inf.lifecycle = -1;
		// 加入音效
		music_boom.play();
	}
	my_fruit_pieces_inf.base_impact_x = temp_impact_fruit.x;
	my_fruit_pieces_inf.base_impact_y = temp_impact_fruit.y;
	my_comm_flashs_inf.x = temp_impact_fruit.x;
	my_comm_flashs_inf.y = temp_impact_fruit.y;
	my_comm_juice_inf.base_x = temp_impact_fruit.x;
	my_comm_juice_inf.base_y = temp_impact_fruit.y;
	for (var i = 0; i < 15; i++) {
		my_comm_juice_inf.dis_x[i] = Math.random() * 100 + 20;
		my_comm_juice_inf.dis_y[i] = Math.random() * 100 + 20;
		my_comm_juice_inf.dir[i] = Math.round(Math.random() * 360) * Math.PI/180;
	};

	// 添加新的 碎片水果图 && 闪光图 && 果汁
	fruit_pieces_inf.push(my_fruit_pieces_inf);
	comm_flash_inf.push(my_comm_flashs_inf);
	comm_juice_inf.push(my_comm_juice_inf);

}

// 函数——碎片水果绘画
function pieces_render (modifier)
{
	for (var i = 0; i < fruit_pieces_inf.length; i++) {
		// 删除过期碎片图
		if (fruit_pieces_inf[i].lifecycle < 0)
		{
			fruit_pieces_inf.splice(i,1);
			continue;
		}
		// 绘画左边碎片水果
		ctx.save();
		ctx.translate(fruit_pieces_inf[i].base_impact_x - Math.pow((1 - fruit_pieces_inf[i].lifecycle) * 200, 1)
			, fruit_pieces_inf[i].base_impact_y + Math.pow((1 - fruit_pieces_inf[i].lifecycle) * 30, 2));
		ctx.rotate(fruit_pieces_inf[i].base_angle
			- (1 - fruit_pieces_inf[i].lifecycle) * 120 * Math.PI/180);
		ctx.drawImage(fruit_pieces_inf[i].left_pic
				, -fruit_pieces_inf[i].left_pic.width/2 
				, -fruit_pieces_inf[i].left_pic.height/2
				, fruit_pieces_inf[i].left_pic.width
				, fruit_pieces_inf[i].left_pic.height);
		ctx.restore();
		// 绘画右边碎片水果
		ctx.save();
		ctx.translate(fruit_pieces_inf[i].base_impact_x + Math.pow((1 - fruit_pieces_inf[i].lifecycle) * 200, 1)
			, fruit_pieces_inf[i].base_impact_y + Math.pow((1 - fruit_pieces_inf[i].lifecycle) * 30, 2));
		ctx.rotate(fruit_pieces_inf[i].base_angle
			+ (1 - fruit_pieces_inf[i].lifecycle) * 120 * Math.PI/180);
		ctx.drawImage(fruit_pieces_inf[i].right_pic
				, -fruit_pieces_inf[i].right_pic.width/2 
				, -fruit_pieces_inf[i].right_pic.height/2
				, fruit_pieces_inf[i].right_pic.width
				, fruit_pieces_inf[i].right_pic.height);
		ctx.restore();
		fruit_pieces_inf[i].lifecycle -= modifier / 2;
	};
}

// 函数——闪光绘画
function flash_render (modifier){
	for (var i = 0; i < comm_flash_inf.length; i++) {
		if (comm_flash_inf[i].lifecycle < 0)
		{
			comm_flash_inf.splice(i, 1);
			continue;
		}
		ctx.save();
		ctx.translate(comm_flash_inf[i].x, comm_flash_inf[i].y);
		ctx.rotate(comm_flash_inf[i].angle);
		ctx.drawImage(comm_flash.image
				, -300 / 2
				, -15 / 2
				, 300
				, 15);
		ctx.restore();
		comm_flash_inf[i].lifecycle -= modifier / 0.15;
	};

}

// 函数——果汁绘画
function juice_render (modifier){
	for (var i = 0; i < comm_juice_inf.length; i++) {
		if (comm_juice_inf[i].lifecycle < 0)
		{
			comm_juice_inf.splice(i, 1);
			continue;
		}
		for (var vi = 0; vi < 15; vi++) {
			ctx.save();
			ctx.translate(comm_juice_inf[i].base_x, comm_juice_inf[i].base_y);
			ctx.beginPath();
			ctx.arc((comm_juice_inf[i].dis_x[vi] + (1 - comm_juice_inf[i].lifecycle) * 150) * Math.cos(comm_juice_inf[i].dir[vi])
				, (comm_juice_inf[i].dis_y[vi] + (1 - comm_juice_inf[i].lifecycle) * 150) * Math.sin(comm_juice_inf[i].dir[vi]) + 100 * Math.pow(1 - comm_juice_inf[i].lifecycle, 2)
				, 7 * comm_juice_inf[i].lifecycle
				, 0, 2*Math.PI);
			ctx.fillStyle = comm_juice_inf[i].color;
			ctx.fill();
			ctx.restore();
		};
		comm_juice_inf[i].lifecycle -= modifier / 0.7;
	};
}
