// 创建画布
var my_canvas = document.createElement("canvas");
my_canvas.id = "view_canvas";
var ctx = my_canvas.getContext("2d");
document.body.appendChild(my_canvas);

my_canvas.width = 640;
my_canvas.height = 480;

// 图片类
var Pics = {
　　　　createNew: function(){
　　　　　　var pics = {};
　　　　　　pics.ready = false;
			pics.image = new Image();
			pics.image.src = "images/background.jpg";
			pics.speed = 0;
　　　　　　return pics;
　　　　}
};

// 创建图片对象
var background = Pics.createNew();
var home_mask = Pics.createNew();
var fruit_title1 = Pics.createNew();
var fruit_title2 = Pics.createNew();
var new_title = Pics.createNew();
var ninj_title = Pics.createNew();
var ring1 =  Pics.createNew();
var ring2 = Pics.createNew();
var ring3 = Pics.createNew();
var fruit1 =  Pics.createNew();
var fruit2 = Pics.createNew();
var fruit3 = Pics.createNew();
var menu_ele_array = [home_mask, fruit_title1, fruit_title2, ninj_title
	, ring1, ring2, ring3, fruit1, fruit2, fruit3, new_title];
var boom_spark = Pics.createNew();
var comm_fruits_pieces = new Array();
for (var i = 0; i < 10; i++) {
	comm_fruits_pieces[i] = Pics.createNew();
};
var comm_flash = Pics.createNew();

var menu_step = 0; 
var ninj_t, ninj_start, ninj_change, ninj_T;
var rings_t, rings_start, rings_change, rings_T;
var rings_width = [], rings_height = [];
var order_trans_step_i = new Array(); // 偏移
for (var i = 0; i < 6; i++)
{
	order_trans_step_i[i] = new Array();
	for (var j = 0; j < 11; j++) {
		order_trans_step_i[i][j] = new Array();
		for (var k = 0; k < 2; k++) {
			order_trans_step_i[i][j][k] = 0;
		};
	};
}
var order_rotate_step_i = new Array();	// 旋转
for (var i = 0; i < 6; i++)
{
	order_rotate_step_i[i] = new Array();
	for (var j = 0; j < 11; j++) {
		order_rotate_step_i[i][j] = 0;
	};
}
var order_scale_step_i = new Array(); // 缩放
for (var i = 0; i < 6; i++)
{
	order_scale_step_i[i] = new Array();
	for (var j = 0; j < 11; j++) {
		order_scale_step_i[i][j] = 1;
	};
}
var spark_base = [1,0.3,0.8,0.66,0.42,0.19,0.55,0.73,0.51,0.73];
// 创建音效
var music_splatter  = AudioFX('sound/splatter',  { formats: ['ogg','mp3','m4a'], volume: 0.3, loop: false, pool: 20 });
var music_boom  	= AudioFX('sound/boom', 	 { formats: ['ogg','mp3','m4a'], volume: 0.5, loop: false, pool: 1 });
var music_new  		= AudioFX('sound/throw',  	 { formats: ['ogg','mp3','m4a'], volume: 0.5, loop: false, pool: 3 });


// 函数——菜单初始化
function menu_init (){
	// set pos&size
	// set speed
	home_mask.x = 0;
	home_mask.y = -200;
	home_mask.speed = 250;

	fruit_title1.x = 5;
	fruit_title1.y = -200;
	fruit_title1.speed = 250;

	fruit_title2.x = -170;
	fruit_title2.y = 150;
	fruit_title2.speed = 250;
	fruit_title2_t = 0;
	fruit_title2_start = -170;
	fruit_title2_change = 200;
	fruit_title2_T = 50;

	new_title.x = 380;
	new_title.y = 220;

	ninj_title.x = 360;
	ninj_title.y = -200;
	ninj_t = 0;
	ninj_start = -200;
	ninj_change = 240;
	ninj_T = 100;
	
	rings_t = 0;
	rings_start = 0;
	rings_change = 100;
	rings_T = 80;

	ring1.x = -175/2;
	ring1.y = -172/2;

	ring2.x = -195/2;
	ring2.y = -195/2;

	ring3.x = -141/2;
	ring3.y = -141/2;

	fruit1.x = -62/2;
	fruit1.y = -59/2;

	fruit2.x = -98/2;
	fruit2.y = -85/2;

	fruit3.x = -66/2;
	fruit3.y = -68/2;

	boom_spark.x = 0;
	boom_spark.y = 0;
	boom_spark.image.width = 40;
	boom_spark.image.height = 10;

	//rings_fruits
	for (var i = 4; i < 4+7; i++) {
		order_scale_step_i[3][i] = 0;
	}
	order_trans_step_i[3][4][0] = 40 + 175/2;
	order_trans_step_i[3][4][1] = 240 + 175/2;
	order_trans_step_i[3][5][0] = 230 + 195/2;
	order_trans_step_i[3][5][1] = 220 + 195/2;
	order_trans_step_i[3][6][0] = 460 + 141/2;
	order_trans_step_i[3][6][1] = 300 + 141/2;
	order_trans_step_i[3][7][0] = 40 + 175/2;
	order_trans_step_i[3][7][1] = 240 + 175/2;
	order_trans_step_i[3][8][0] = 230 + 195/2;
	order_trans_step_i[3][8][1] = 220 + 195/2;
	order_trans_step_i[3][9][0] = 460 + 141/2;
	order_trans_step_i[3][9][1] = 300 + 141/2;

	// set scr
	home_mask.image.src = "images/home-mask.png";
	fruit_title1.image.src = "images/logo.png";
	fruit_title2.image.src = "images/home-desc.png";
	new_title.image.src = "images/new.png";
	ninj_title.image.src = "images/ninja.png";
	ring1.image.src = "images/dojo.png";
	ring2.image.src = "images/new-game.png";
	ring3.image.src = "images/quit.png";
	fruit1.image.src = "images/fruit/peach.png";
	fruit2.image.src = "images/fruit/sandia.png";
	fruit3.image.src = "images/fruit/boom.png";
	boom_spark.image.src = "images/flash.png";
	comm_fruits_pieces[0].image.src = "images/fruit/apple-1.png";
	comm_fruits_pieces[1].image.src = "images/fruit/apple-2.png";
	comm_fruits_pieces[2].image.src = "images/fruit/banana-1.png";
	comm_fruits_pieces[3].image.src = "images/fruit/banana-2.png";
	comm_fruits_pieces[4].image.src = "images/fruit/basaha-1.png";
	comm_fruits_pieces[5].image.src = "images/fruit/basaha-2.png";
	comm_fruits_pieces[6].image.src = "images/fruit/peach-1.png";
	comm_fruits_pieces[7].image.src = "images/fruit/peach-2.png";
	comm_fruits_pieces[8].image.src = "images/fruit/sandia-1.png";
	comm_fruits_pieces[9].image.src = "images/fruit/sandia-2.png";
	comm_flash.image.src = "images/flash.png";

	// onload
	background.image.onload = function () {
    	background.ready = true;
		if (background.ready) {
		       ctx.drawImage(background.image, 0, 0);
		}
	};
	home_mask.image.onload = function () {
	    home_mask.ready = true;
	};
	fruit_title1.image.onload = function () {
	    fruit_title1.ready = true;
	};
	fruit_title2.image.onload = function () {
	    fruit_title2.ready = true;
	};
	new_title.image.onload = function () {
	    new_title.ready = true;
	};
	ninj_title.image.onload = function () {
	    ninj_title.ready = true;
	};
	ring1.image.onload = function () {
	    ring1.ready = true;
	    rings_width[0] = ring1.image.width;
	    rings_height[0] = ring1.image.height;
	};
	ring2.image.onload = function () {
	    ring2.ready = true;
	    rings_width[1] = ring2.image.width;
	    rings_height[1] = ring2.image.height;
	};
	ring3.image.onload = function () {
	    ring3.ready = true;
	    rings_width[2] = ring3.image.width;
	    rings_height[2] = ring3.image.height;
	};
	fruit1.image.onload = function () {
	    fruit1.ready = true;
	    rings_width[3] = fruit1.image.width;
	    rings_height[3] = fruit1.image.height;
	};
	fruit2.image.onload = function () {
	    fruit2.ready = true;
	    rings_width[4] = fruit2.image.width;
	    rings_height[4] = fruit2.image.height;
	};
	fruit3.image.onload = function () {
	    fruit3.ready = true;
	    rings_width[5] = fruit3.image.width;
	    rings_height[5] = fruit3.image.height;
	};
	boom_spark.image.onload = function () {
	    boom_spark.ready = true;
	};
	for (var i = 0; i < comm_fruits_pieces.length; i++) {
		comm_fruits_pieces[i].image.onload = function(){
			// ...
		}
	}
	comm_flash.image.onload = function () {
		// ...
	}
}