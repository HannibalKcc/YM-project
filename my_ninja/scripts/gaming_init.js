// 创建图片对象
var gaming_score = Pics.createNew();
var gaming_sign_b = Pics.createNew();
var gaming_sign_m = Pics.createNew();
var gaming_sign_s = Pics.createNew();
var gaming_lose_b = Pics.createNew();
var gaming_lose_m = Pics.createNew();
var gaming_lose_s = Pics.createNew();
var gaming_over = Pics.createNew();
var gaming_apple = Pics.createNew();
var gaming_banana = Pics.createNew();
var gaming_basaha = Pics.createNew();
var gaming_peach = Pics.createNew();
var gaming_sandia = Pics.createNew();
var gaming_boom = Pics.createNew();

function gaming_init () {
	// set pos&size
	// set speed
	gaming_score.x = 5;
	gaming_score.y = 0;
	gaming_score.speed = 100;

	gaming_sign_b.x = 607.5;
	gaming_sign_b.y = 0;
	gaming_sign_b.speed = 100;

	gaming_sign_m.x = 580;
	gaming_sign_m.y = 0;
	gaming_sign_m.speed = 100;

	gaming_sign_s.x = 560;
	gaming_sign_s.y = 0;
	gaming_sign_s.speed = 100;

	gaming_lose_b.x = 0;
	gaming_lose_b.y = 0;
	// gaming_lose_b.speed = 100;

	gaming_lose_m.x = 0;
	gaming_lose_m.y = 0;
	// gaming_lose_m.speed = 100;

	gaming_lose_s.x = 0;
	gaming_lose_s.y = 0;
	// gaming_lose_s.speed = 100;


	// set src
	gaming_score.image.src = "images/score.png";
	gaming_sign_b.image.src = "images/xxx.png";
	gaming_sign_m.image.src = "images/xx.png";
	gaming_sign_s.image.src = "images/x.png";
	gaming_lose_b.image.src = "images/xxxf.png";
	gaming_lose_m.image.src = "images/xxf.png";
	gaming_lose_s.image.src = "images/xf.png";
	gaming_over.image.src = "images/score.png";
	gaming_apple.image.src = "images/fruit/apple.png"
	gaming_banana.image.src = "images/fruit/banana.png"
	gaming_basaha.image.src = "images/fruit/basaha.png"
	gaming_peach.image.src = "images/fruit/peach.png"
	gaming_sandia.image.src = "images/fruit/sandia.png"
	gaming_boom.image.src = "images/fruit/boom.png"

	// onload
	gaming_score.image.onload = function () {
		// ...
	}
	gaming_sign_b.image.onload = function () {
		// ...
	}
	gaming_sign_m.image.onload = function () {
		// ...
	}
	gaming_sign_s.image.onload = function () {
		// ...
	}
	gaming_lose_b.image.onload = function () {
		// ...
	}
	gaming_lose_m.image.onload = function () {
		// ...
	}
	gaming_lose_s.image.onload = function () {
		// ...
	}
	gaming_over.image.onload = function () {
		// ...
	}
	gaming_apple.image.onload = function () {
		// ...
	}
	gaming_banana.image.onload = function () {
		// ...
	}
	gaming_basaha.image.onload = function () {
		// ...
	}
	gaming_peach.image.onload = function () {
		// ...
	}
	gaming_sandia.image.onload = function () {
		// ...
	}
	gaming_boom.image.onload = function () {
		// ...
	}
}