var dino;
var ground, ground1_Position, ground1_SpawnPoint, ground2_Position, ground2_SpawnPoint, ground_ScrollSpeed;
var cloud_Sprite, cloud_SpawnPoint, cloud_TimeUntilNextSpawn, cloud_SpawnRate, cloud_ScrollSpeed, cloudsArray;

function preload() {
  ground = loadImage("spritesheet.png");
  cloud_Sprite = loadImage("1x-cloud.png");
  dino = new Dino();
}

function setup() {
  createCanvas(600, 150);
  //imageMode(CENTER);
  imageMode(CORNER);
  ground1_Position = ground1_SpawnPoint = -2;
  ground2_Position = ground2_SpawnPoint = 1198;
	ground_ScrollSpeed = 5;
	cloud_SpawnPoint = 600;
	cloud_SpawnRate = 5;
	cloud_TimeUntilNextSpawn = 0; 
	cloudsArray = [];
	cloud_ScrollSpeed = 1;
}

function draw() {
	background(247);
  UpdateScene();
  
  fill(0);
  // left side of canvas
  ellipse(0,100,2,2);
  // right side of canvas
	ellipse(600,100,2,2);
	
	if(!dino.isJumping) {
		if(keyIsDown(DOWN_ARROW))
			dino.duck();
		else
			dino.run();
	}
	else
		dino.jump();
}

function UpdateScene() {
	manageGround();
	manageClouds();
}

function manageClouds() {
	if(cloudsArray.length < 3 && cloud_TimeUntilNextSpawn === 0) {
		// highest spawn point @ 30
		// lowest spawn point @ 75
		cloudsArray.push({x:cloud_SpawnPoint, y:randomNumber(30,75)});
		cloud_TimeUntilNextSpawn = cloud_SpawnRate;
		setInterval(function() {cloud_TimeUntilNextSpawn = cloud_TimeUntilNextSpawn>0?cloud_TimeUntilNextSpawn-1:0;}, 1000);
	}

	if(cloudsArray[0] == undefined)
		cloudsArray.shift();
	
	cloudsArray.forEach((cloud, i) => {
		if(cloud.x <= -46)
			delete cloudsArray[i];
		else
		{
			image(cloud_Sprite, cloud.x, cloud.y, 46, 14, 0, 0, 46, 14);
			cloud.x -= cloud_ScrollSpeed;
		}
	});
}

function manageGround() {
	image(ground, ground1_Position, 135, 1233, 68, 0, 54, 1233, 68);
  image(ground, ground2_Position, 135, 1233, 68, 0, 54, 1233, 68);

  ground1_Position -= ground_ScrollSpeed;
  ground2_Position -= ground_ScrollSpeed;
  
  if (ground1_Position <= -1200 - ground1_SpawnPoint)
    ground1_Position = ground2_SpawnPoint;
  if (ground2_Position <= -1200 - ground1_SpawnPoint)
		ground2_Position = ground2_SpawnPoint;
}

function keyPressed() {
	if(keyCode === UP_ARROW && !dino.isJumping)
		dino.startJump();
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}