class Dino {
	constructor() {
		this.dinoIdleSprite = loadImage("Idle.png");
		this.dinoRun1Sprite = loadImage("run1.png");
		this.dinoRun2Sprite = loadImage("run2.png");
		this.dinoLow1Sprite = loadImage("low1.png");
		this.dinoLow2Sprite = loadImage("low2.png");
		this.dinoJumpSprite = loadImage("jump.png");
		this.dinoDeathSprite = loadImage("death.png"); // image(dinoDeath, 232, 500, 44, 47, 0, 0, 44, 47);
		this.toggleSprite = true;
		this.isJumping = false;
		this.reachedTop = false;
		this.jumpSpeed = 10;
		this.y = 100;
	}

	run() {
		if (this.toggleSprite)
			image(this.dinoRun1Sprite, 30, 100, 44, 47, 0, 0, 44, 47);
		else
			image(this.dinoRun2Sprite, 30, 100, 44, 47, 0, 0, 44, 47);

		if (frameCount % 6 == 0)
			this.toggleSprite = !this.toggleSprite;
	}

	startJump() {
		this.isJumping = true;
		this.reachedTop = false;
		image(this.dinoJumpSprite, 30, this.y, 44, 47, 0, 0, 44, 47);
		this.y -= this.jumpSpeed;
		this.jumpSpeed -= 0.5;
	}

	jump() {
		if (this.y >= 10 && !this.reachedTop) {
			image(this.dinoJumpSprite, 30, this.y, 44, 47, 0, 0, 44, 47);
			this.y -= this.jumpSpeed;
			this.jumpSpeed -= 0.5;
			
			if(this.y <= 10) {
				this.reachedTop = true;
				this.y = 10;
				this.jumpSpeed = 1;
			}
		}
		else {
				image(this.dinoJumpSprite, 30, this.y, 44, 47, 0, 0, 44, 47);
				this.y += this.jumpSpeed;
				this.jumpSpeed += 0.5;
			
				if(this.y >= 100) {
					this.isJumping = false;
					this.jumpSpeed = 10;
				}
		}
	}

	duck() {
		if (this.toggleSprite)
			image(this.dinoLow1Sprite, 30, 121, 60, 30, 0, 0, 118, 67);
		else
			image(this.dinoLow2Sprite, 30, 119, 60, 30, 0, 0, 119, 69);

		if (frameCount % 6 == 0)
			this.toggleSprite = !this.toggleSprite;
	}
}