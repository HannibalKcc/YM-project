// 函数——背景绘画
function gaming_bg_render (modifier){
	ctx.drawImage(background.image, 0, 0);
}

// 函数——游玩画面元素绘画
function gaming_ele_render (modifier) {
	// init
	gaming_ele_render.counter = gaming_ele_render.counter || 0;
	gaming_ele_render.get_flag = gaming_ele_render.get_flag || -1;
	gaming_ele_render.lose_counter = gaming_ele_render.lose_counter || 0;
	gaming_ele_render.lose_flag = gaming_ele_render.lose_flag || -1;
	gaming_ele_render.step = gaming_ele_render.step || 0;
	gaming_ele_render.img_arr = gaming_ele_render.img_arr 
	|| [gaming_score
		, gaming_sign_b
		, gaming_sign_m
		, gaming_sign_s
		, gaming_lose_b
		, gaming_lose_m
		, gaming_lose_s];
	gaming_ele_render.x_arr = gaming_ele_render.x_arr 
	|| [-20, 90, 90, 90, 622.5, 595, 575];
	gaming_ele_render.scale_arr = gaming_ele_render.scale_arr 
	|| [1, 1, 1, 1, 0, 0, 0];

	// update
	// 开场动画
	if (gaming_ele_render.step == 0)
	{
		gaming_ele_render.x_arr[0] += gaming_ele_render.x_arr[0] < 15 ? modifier * 80:0;
		for (var i = 1; i < 4; i++) {
			gaming_ele_render.x_arr[i] -= gaming_ele_render.x_arr[i] > 15 ? modifier * 100:0;
		};
	}
	// 得分的动画
	if (gaming_ele_render.get_flag == 1)
	{
		gaming_ele_render.get_flag = -1;
		gaming_ele_render.scale_arr[0] = 1.4;
	}
	gaming_ele_render.scale_arr[0] -= gaming_ele_render.scale_arr[0] > 1 ? modifier * 0.5:0;
	// 失分的动画
	if (gaming_ele_render.lose_flag == 1)
	{
		gaming_ele_render.lose_flag = -1;
		gaming_ele_render.scale_arr[gaming_ele_render.lose_counter] = 0;
	}
	for (var i = 0; i < gaming_ele_render.lose_counter; i++) {
		gaming_ele_render.scale_arr[i + 4] += gaming_ele_render.scale_arr[i + 4] < 1 ? modifier / 0.2:0;
	}
	// TODO 游戏结束画面

	// 绘画
	for (var i = 0; i < gaming_ele_render.img_arr.length; i++) {
		ctx.save();
		ctx.translate(gaming_ele_render.x_arr[i], 20);
		ctx.scale(gaming_ele_render.scale_arr[i], gaming_ele_render.scale_arr[i]);
		ctx.drawImage(gaming_ele_render.img_arr[i].image
			, gaming_ele_render.img_arr[i].x - gaming_ele_render.img_arr[i].image.width/2
			, gaming_ele_render.img_arr[i].y - gaming_ele_render.img_arr[i].image.height/2
			, gaming_ele_render.img_arr[i].image.width
			, gaming_ele_render.img_arr[i].image.height);
		ctx.restore();
	}
	ctx.font = "normal 36px Arial";
	ctx.fillStyle = "#DAA520";
	ctx.fillText(gaming_ele_render.counter, 40, 35);
}

// 函数——游玩界面的水果绘画
function gaming_fruits_render (modifier)
{
	gaming_fruits_render.inf_arr = gaming_fruits_render.inf_arr || [];
	gaming_fruits_render.interval = gaming_fruits_render.interval || 0;
	gaming_fruits_render.type_list = ["apple", "banana", "basaha", "peach", "sandia", "boom"];
	gaming_fruits_render.num = gaming_fruits_render.num || 0;

	// 计时
	gaming_fruits_render.interval += modifier / 3.5;
	// 新创水果
	if (gaming_fruits_render.interval >= 1)
	{
		gaming_fruits_render.interval = 0;
		// 数量
		var new_num = parseInt(Math.random()*1000%3) + 1;
		// 赋值
		for (var i = 0; i < new_num; i++) {
			var temp_fruits_inf = Fruits_inf.createNew();
			var random_num = parseInt(Math.random()*1000%6);
			temp_fruits_inf.type = gaming_fruits_render.type_list[random_num];
			temp_fruits_inf.image.src = "images/fruit/" + gaming_fruits_render.type_list[random_num] +".png";
			temp_fruits_inf.x = 320 + parseInt(Math.random()*1000%460) + 1 - 230;
			temp_fruits_inf.y = 550;
			temp_fruits_inf.start_x = temp_fruits_inf.x;
			temp_fruits_inf.end_x = parseInt(Math.random()*1000%10) * 46 + 90;
			temp_fruits_inf.c = parseInt(Math.random()*1000%11) *12  + 110;
			temp_fruits_inf.b = (temp_fruits_inf.x + temp_fruits_inf.end_x) / 2;
			// TODO 有时生成错误的a——无穷大
			temp_fruits_inf.a = (temp_fruits_inf.y - temp_fruits_inf.c) / Math.pow((temp_fruits_inf.x - temp_fruits_inf.b), 2);
			temp_fruits_inf.rotate = parseInt(Math.random()*1000%10)*36 * Math.PI/180;
			temp_fruits_inf.rotate_rate = (parseInt(Math.random()*1000%10)*50 - 250) * Math.PI/180;
			gaming_fruits_render.inf_arr.push(temp_fruits_inf);

			// 加入音效
			music_new.play();
		};
	}

	// 绘画
	for (let i = 0; i < gaming_fruits_render.inf_arr.length; i++) {
		// 删除未切到的水果 && 记录失分
		if (gaming_fruits_render.inf_arr[i].y >= 560
			 && gaming_fruits_render.inf_arr[i].type != "boom")
		{
			gaming_ele_render.lose_flag = 1;
			gaming_ele_render.lose_counter < 3 ? gaming_ele_render.lose_counter++:1;
			gaming_fruits_render.inf_arr.splice(i, 1);
			continue;
		}
		ctx.save();
		ctx.translate(gaming_fruits_render.inf_arr[i].x
			, gaming_fruits_render.inf_arr[i].y);
		ctx.scale(1, 1);
		ctx.rotate(gaming_fruits_render.inf_arr[i].rotate);
		ctx.drawImage(gaming_fruits_render.inf_arr[i].image
			, -gaming_fruits_render.inf_arr[i].image.width / 2
			, -gaming_fruits_render.inf_arr[i].image.height / 2
			, gaming_fruits_render.inf_arr[i].image.width
			, gaming_fruits_render.inf_arr[i].image.height);
		ctx.restore();
		// 水果运动
		gaming_fruits_render.inf_arr[i].x += (gaming_fruits_render.inf_arr[i].end_x - gaming_fruits_render.inf_arr[i].start_x) * modifier / 3;
		gaming_fruits_render.inf_arr[i].y = gaming_fruits_render.inf_arr[i].a * Math.pow(gaming_fruits_render.inf_arr[i].x - gaming_fruits_render.inf_arr[i].b, 2) + gaming_fruits_render.inf_arr[i].c;
		gaming_fruits_render.inf_arr[i].rotate += gaming_fruits_render.inf_arr[i].rotate_rate * modifier;
		// 新创火花
		if (gaming_fruits_render.inf_arr[i].type == "boom")
		{
			gaming_spark_render.interval += modifier/0.2;
			if (gaming_spark_render.interval >= 1)
			{
				let temp_spark_inf = Spark_inf.createNew();
				([temp_spark_inf.x, temp_spark_inf.y,  temp_spark_inf.offset_angle, temp_spark_inf.angle] = [
					gaming_fruits_render.inf_arr[i].x
					, gaming_fruits_render.inf_arr[i].y
					, gaming_fruits_render.inf_arr[i].rotate
					, parseInt(Math.random()*1000%10)*36 * Math.PI/180]);
				gaming_spark_render.inf_arr.push(temp_spark_inf);
			}
		}
	}
}

// 函数——游玩界面的刀绘画
function gaming_knife_render (modifier)
{
	knife_render(modifier);
}

// 函数——游玩界面火花绘画
function gaming_spark_render(modifier) {
	gaming_spark_render.inf_arr = gaming_spark_render.inf_arr || [];
	gaming_spark_render.interval = gaming_spark_render.interval || 0;
	for (let i = 0; i < gaming_spark_render.inf_arr.length; i++) {
		// 删除过期火花
		if (gaming_spark_render.inf_arr[i].scale_rate <= 0.4)
		{
			gaming_spark_render.inf_arr.splice(i,1);
			continue;
		}
		let offsetX = Math.cos(225 * Math.PI/180 + gaming_spark_render.inf_arr[i].offset_angle) * 42.5;
		let offsetY = Math.sin(225 * Math.PI/180 + gaming_spark_render.inf_arr[i].offset_angle) * 42.5;
		ctx.save();
		ctx.translate(gaming_spark_render.inf_arr[i].x + offsetX, gaming_spark_render.inf_arr[i].y + offsetY);
		ctx.scale(gaming_spark_render.inf_arr[i].scale_rate, gaming_spark_render.inf_arr[i].scale_rate);
		ctx.rotate(gaming_spark_render.inf_arr[i].angle);
		ctx.drawImage(comm_flash.image
			, -20
			, -5
			, 20
			, 10);
		ctx.restore();
		gaming_spark_render.inf_arr[i].scale_rate -= modifier/1;
	}
}

// 函数——游玩画面刷新
function gaming_draw () {
	// 清除上一帧
	ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
	var now = Date.now();
	var delta = now - then;
	then = now;

	gaming_bg_render(delta / 1000);
	gaming_ele_render(delta / 1000);
	gaming_fruits_render(delta / 1000);
	gaming_spark_render(delta/ 1000);
	gaming_knife_render(delta / 1000);
	var knife_now = knife_points[knife_points.length - 1];
	var impact_fruit = impact_check(knife_now, gaming_fruits_render.inf_arr);
	get_impact_inf(knife_points[knife_points.length - 1]
		, knife_points[knife_points.length - 2]
		, impact_fruit);
	pieces_render(delta / 1000);
	flash_render(delta / 1000);
	juice_render(delta / 1000);

	// 刷新
	requestAnimationFrame(gaming_draw);
}

// 已经写在menu.js中的menu_draw内
// then = Date.now();
// // 启动游玩画面绘画
// gaming_init();
// gaming_draw();