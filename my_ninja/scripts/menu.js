// 函数——菜单元素赋值
var menu_update = function (modifier){
	// step0——蒙版 && 大标题拉下
	if (menu_step == 0)
	{
		home_mask.y += modifier * home_mask.speed;
		fruit_title1.y = home_mask.y;
		if (home_mask.y >= 0)
		{
			fruit_title1.y = home_mask.y = 0;
			menu_step = 1;
		}
	}
	// step1——NIJI标题弹跳
	if (menu_step == 1)
	{
		if (ninj_t < ninj_T)
		{
			ninj_title.y = Tween.Bounce.easeOut(
				Math.round(ninj_t), ninj_start, 
				ninj_change, ninj_T);
		}
		else
		{
			menu_step = 2;
		}
		ninj_t += modifier * 100;
	}
	// step2——小标题右移
	if (menu_step == 2)
	{
		if (fruit_title2_t < fruit_title2_T)
		{
			fruit_title2.x = Tween.Sine.easeIn(
					Math.round(fruit_title2_t), fruit_title2_start, 
					fruit_title2_change, fruit_title2_T);
			// console.log(fruit_title2.x);
		}
		else
		{
			menu_step = 3;
		}
		fruit_title2_t += modifier * 100;
	}
	// step3——三环出现
	if (menu_step == 3)
	{
		if (rings_t < rings_T)
		{
			step3_rotate = Tween.Cubic.easeIn(rings_t, rings_start,
				 rings_change, rings_T)/ 100;
			for (var i = 4; i < 4+7; i++) {
				order_scale_step_i[3][i] = step3_rotate;
			};
		}
		else
		{
			menu_step = 4;
		}
		rings_t += modifier * 100;
	}
	// step4——三环常驻旋转
	if (menu_step >= 4)
	{
		// order_rotate_step_i[step][ele_num]
		order_rotate_step_i[4][4] += modifier * Math.PI/180 * 30;
		order_rotate_step_i[4][5] += -modifier * Math.PI/180 * 50;
		order_rotate_step_i[4][6] += modifier * Math.PI/180 * 25;
		order_rotate_step_i[4][7] += modifier * Math.PI/180 * 20;
		order_rotate_step_i[4][8] += -modifier * Math.PI/180 * 10;
	}
	// step5_end——菜单结束
	if (menu_step == 5)
	{
		// 清除其他元素
		// order_trans_step_i[step][ele_num][x or y]
		order_trans_step_i[5][0][0] = -1000;
		order_trans_step_i[5][0][1] = -1000;
		order_trans_step_i[5][1][0] = -1000;
		order_trans_step_i[5][1][1] = -1000;
		order_trans_step_i[5][2][0] = -1000;
		order_trans_step_i[5][2][1] = -1000;
		order_trans_step_i[5][3][0] = -1000;
		order_trans_step_i[5][3][1] = -1000;
		order_trans_step_i[5][10][0] = -1000;
		order_trans_step_i[5][10][1] = -1000;
		order_trans_step_i[3][4][0] = -1000;
		order_trans_step_i[3][4][1] = -1000;
		order_trans_step_i[3][5][0] = -1000;
		order_trans_step_i[3][5][1] = -1000;
		order_trans_step_i[3][6][0] = -1000;
		order_trans_step_i[3][6][1] = -1000;
		boom_spark.image.src = "";

		// 水果动画
		order_trans_step_i[3][7][0] += -modifier / 0.5 * 30;
		order_trans_step_i[3][7][1] += Math.pow(modifier / 0.5 * 50, 2);
		order_trans_step_i[3][8][0] += -modifier / 0.5 * 30;
		order_trans_step_i[3][8][1] += Math.pow(modifier / 0.5 * 50, 2);
		order_trans_step_i[3][9][0] += modifier / 0.5 * 30;
		order_trans_step_i[3][9][1] += Math.pow(modifier / 0.5 * 50, 2);
	}
}

// 函数——菜单元素绘画
var menu_render = function (tmep_menu_ele_array){
	for (var i = 0; i < tmep_menu_ele_array.length; i++) {
		ctx.save();
		if (tmep_menu_ele_array[i].ready)
		{
			// 特殊操作
			// trans
			if ( i >= 4 && i <= 9)
			{
				ctx.translate(order_trans_step_i[3][i][0],
					order_trans_step_i[3][i][1]);
			}
			else
			{
				ctx.translate(order_trans_step_i[menu_step][i][0],
					order_trans_step_i[menu_step][i][1]);
			}

			// scale
			if ( i >= 4 && i <= 10)
			{
				ctx.scale(order_scale_step_i[3][i],
					order_scale_step_i[3][i]);
			}
			else
			{
				ctx.scale(order_scale_step_i[menu_step][i],
					order_scale_step_i[menu_step][i]);
			}

			// rotate
			if (menu_step >= 4 && i >= 4 && i <= 9)
			{
				ctx.rotate(order_rotate_step_i[4][i]);
			}
			else
			{
				ctx.rotate(order_rotate_step_i[menu_step][i]);
			}

			// 绘画
			ctx.drawImage(tmep_menu_ele_array[i].image
				, tmep_menu_ele_array[i].x
				, tmep_menu_ele_array[i].y
				, tmep_menu_ele_array[i].image.width
				, tmep_menu_ele_array[i].image.height);
		}
		ctx.restore();		
	}
}

// 函数——火花绘画
function spark_render (modifier)
{
	// 火花绘画
	if (menu_step >= 4)
	{
		for (var vi = 0; vi < 10; vi++)
		{
			spark_base[vi] -= modifier;
			if (spark_base[vi] < 0) 
				spark_base[vi] = 1;
			var temp_rate = spark_base[vi];
			ctx.save();
			ctx.translate(500,345);
			ctx.scale(temp_rate,temp_rate);
			ctx.rotate(vi * 36 * Math.PI/180);
			// TODO页面切换后 火花会同步
			ctx.drawImage(boom_spark.image
					, 70/temp_rate * (1-temp_rate) - boom_spark.image.width/2
					, -boom_spark.image.height/2
					, boom_spark.image.width
					, boom_spark.image.height);
			ctx.restore();
		}
	}
}

// 函数——结束菜单
function end_menu(temp_impact_fruit){
	if (typeof(temp_impact_fruit) != "undefined"
	&& temp_impact_fruit.type == "menu_watermelon") 
	{
		return 0;
	}
	// temp_impact_fruit.type == "menu_peach"
	return 1;
}

// 函数——菜单刷新
function menu_draw () {
	ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
	var now = Date.now();
	var delta = now - then;
	then = now;

	if (background.ready) 
		ctx.drawImage(background.image, 0, 0);
	// TODO 此处的处理方式与后方直接写render的方式不一致
	menu_update(delta / 1000);
	menu_render(menu_ele_array);
	spark_render(delta / 1000);
	knife_render(delta / 1000);
	menu_draw.menu_fruits_inf = getFruitsInf_menu();
	var knife_now = knife_points[knife_points.length - 1];
	var impact_fruit = impact_check(knife_now, menu_draw.menu_fruits_inf);
	get_impact_inf(knife_points[knife_points.length - 1]
		, knife_points[knife_points.length - 2]
		, impact_fruit);
	pieces_render(delta / 1000);
	flash_render(delta / 1000
		, knife_points[knife_points.length - 1]
		, knife_points[knife_points.length - 2]
	 	, impact_fruit);
	juice_render(delta / 1000);

	if (menu_step <= 4 && !end_menu(impact_fruit))
		menu_step = 5;
	// 刷新
	if (menu_step < 5 || order_trans_step_i[3][7][1] <= 600)
		requestAnimationFrame(menu_draw);
	else{
		then = Date.now();
		// 启动游玩画面绘画
		gaming_init();
		gaming_draw();
	}
}