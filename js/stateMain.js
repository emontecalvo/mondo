var cursors;
var walkingLeft;
var bellyBopPhone;
var walkingRight;
var mouse;

var StateMain={
    init: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mondoVengeance = 0;
        this.enemyIndex = 0;
        this.FoodIndex = 0;
    },
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background1.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 320, 265, 8);
        game.load.spritesheet("playBtn", "images/playBtns.png", 624, 290, 4);
    	game.load.spritesheet("mouse", "images/mouse.png", 168, 170, 8);
    	game.load.spritesheet("chihuahua", "images/chihuahua.png", 132, 130, 8);
        game.load.spritesheet("food", "images/food.png", 67, 78, 8);
        game.load.audio("lipSmack", "sounds/SmackLips.mp3");
	},
	create: function() {
        // Background
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');
        // ipad fix:
        if (screen.height >=764) {
            this.background.y=game.world.centerY-this.background.height/2;
            this.top=this.background.y;
            this.bottom = this.background.y+360;
        }

        // Enemies
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 10; i++) {
            if (i % 3 == 0) {
                var dog = this.enemies.create(game.width, this.background.y+300, "chihuahua");
                this.setDogAnimations(dog);
            } else {
                var mouse = this.enemies.create(game.width, this.background.y+300, 'mouse');
                this.setMouseAnimations(mouse);
            }
        }

        // Food
        this.foodie = game.add.group();
        this.foodie.enableBody = true;
        this.foodie.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 3; i++) {
            var food = this.foodie.create(game.width, this.background.y+100, 'food');
            this.setFoodAnimations(food);
        }

        mondoVengeance = 0;

        //sound
        this.lipSmack = game.add.audio("lipSmack");

        this.enemies.setAll("outOfBoundsKill", true);
        this.enemies.setAll('checkWorldBounds', true);
        this.foodie.setAll("outOfBoundsKill", true);
        this.foodie.setAll('checkWorldBounds', true);
       
        // Mondo
        this.mondo = game.add.sprite(0,this.background.y + 250,"mondo");
        this.mondo.scale.setTo(0.8, 0.8);
        game.physics.enable(this.mondo, Phaser.Physics.ARCADE);
        this.mondo.enableBody = true;
        this.mondo.body.collideWorldBounds = true;
        this.mondo.body.bounce.y = 0.8;
        this.mondo.body.gravity.y = 0;

        // Buttons
        this.phoneLeft = game.add.button(100, this.background.y + 440, "playBtn", this.buttonWalkLeft, this, 0);
        this.phoneLeft.scale.setTo(0.15, 0.15);

        this.phoneRight = game.add.button(400, this.background.y + 440, "playBtn", this.buttonWalkRight, this, 1);
        this.phoneRight.scale.setTo(0.15, 0.15);

        this.phoneBop = game.add.button(200, this.background.y + 440, "playBtn", this.bellyBopForPhone, this, 2);
        this.phoneBop.scale.setTo(0.15, 0.15);

        this.phoneJump = game.add.button(300, this.background.y + 440, "playBtn", this.mondoPhoneJump, this, 3);
        this.phoneJump.scale.setTo(0.15, 0.15);

        // Text for vegence score
        this.textScore = game.add.text(game.world.centerX, this.top+60, "0");
        this.textScore.fill="000000";
        this.textScore.font= "VT323";
        this.textScore.fontSize=40;
        this.textScore.anchor.set(0.5,0.5);

        // Label for vengence score
        this.labelScore = game.add.text(game.world.centerX, this.top+20, "vengeance points:");
        this.labelScore.fill="000000";
        this.labelScore.font= "VT323";
        this.labelScore.fontSize=40;
        this.labelScore.anchor.set(0.5,0.5);

        // Initializers
        this.setListeners();
        this.setMondoAnimations();
        this.mondoVengePoints(this.mondoVengence);
        this.launchEnemies();
        this.launchFood();

	},

    update: function() {
        this.mondo.body.velocity.setTo(0,0);
        if(!this.eating) this.mondo.animations.play('walk');
        if (!this.eating && cursors.left.isDown || walkingLeft) {
            walkingRight = false;
            this.background.tilePosition.x += 1;
            this.mondo.body.velocity.x = -10;
            game.camera.x -= 1;
        }
        if(!this.eating && cursors.right.isDown || walkingRight) {
            this.background.tilePosition.x -= 1;
            this.walkingLeft = false;
            this.mondo.body.velocity.x = 10;
            game.camera.x += 1;
        }
        if(!this.eating && cursors.down.isDown || !this.eating && bellyBopPhone) {
            this.mondo.animations.play('belly');
            game.physics.arcade.overlap(this.mondo, this.enemies, this.collisionHandler, null, this);
            bellyBopPhone = false;
        }

        if(game.time.now > this.launchTimer){
            this.launchEnemies();
        }

        if(game.time.now > this.launchFoodTimer){
            this.launchFood();
        }

        if (!this.eating && cursors.up.isDown) {
            this.mondoJump();
        }

        if (cursors.up.isUp) {
            this.mondo.body.velocity.y = 500;
        }

    },
    setListeners:function() {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    setMondoAnimations: function() {
        this.mondo.animations.add('eatDog', [3, 4, 4, 4, 1], 2, false);
        var eatM = this.mondo.animations.add('eatMouse', [2, 5, 5, 5, 2], 2, false);
        var eatD = this.mondo.animations.add('eatDog', [2, 4, 4, 4, 2], 2, false);
        this.mondo.animations.add('walk', [0, 1], 2, true);
        this.mondo.animations.add('belly', [6], 6, false);
        
        eatM.onComplete.add(this.eatComplete, this);
        eatD.onComplete.add(this.eatComplete, this);
    },
    setFoodAnimations: function(food) {
        food.animations.add('float', [0, 1, 2, 3], 2, true);
    },
    buttonWalkRight: function() {
        walkingRight = true;
        walkingLeft = false;
    },
    buttonWalkLeft: function() {
        walkingLeft = true;
        walkingRight = false;
    },
    setMouseAnimations: function(mouse) {
        mouse.animations.add('walk', [0, 0, 0, 4], 2, true);
        var flip = mouse.animations.add('flip', [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8], 12, false);
        flip.onComplete.add(this.flipComplete, this);
    },
    setDogAnimations: function(dog) {
        dog.animations.add('walk', [0, 0, 0, 0, 0, 0, 0, 4], 2, true);
        var flip = dog.animations.add('flip', [0, 1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8], 12, false);
        flip.onComplete.add(this.flipComplete, this);
    },
    mondoVengePoints: function(points) {
        points = points || 0;
        mondoVengeance += points;
        this.textScore.text=mondoVengeance;
    },
    mondoJump: function() {
        this.mondo.body.velocity.y = -4000;
         game.physics.arcade.overlap(this.mondo, this.foodie, this.collisionFood, null, this);
    },
    mondoPhoneJump: function() {
        this.mondo.body.velocity.y = -8000;
        game.physics.arcade.overlap(this.mondo, this.foodie, this.collisionFood, null, this);
    },
    launchEnemies: function(){
        var enemy = this.enemies.getAt(this.enemyIndex);
        if(enemy !== -1){
            enemy.play('walk');
            enemy.body.velocity.x = -50;
        }
        this.enemyIndex++;
        this.launchTimer = game.time.now + Phaser.Timer.SECOND * 5;
        if(enemy == -1) {
            game.state.start("FallState");
        }
    },
    launchFood: function() {
        var food = this.foodie.getAt(this.FoodIndex);
        if (food !== -1) {
            food.play('float');
            food.body.velocity.x = -20;
        }
        this.FoodIndex++;
        this.launchFoodTimer = game.time.now + Phaser.Timer.SECOND * 20;
    },
    collisionHandler: function(mondo, enemy){
        this.eating = true;
        if (enemy.key == "mouse") {
            mondo.play('eatMouse');
            this.mondoVengePoints(1);
            this.lipSmack.play();
        } else if (enemy.key == "chihuahua") {
            mondo.play('eatDog');
            this.mondoVengePoints(10);
            this.lipSmack.play();
        }
        enemy.play('flip');
        enemy.body.velocity.x = 50;
    },
    collisionFood: function(mondo, food) {
        this.mondoVengePoints(2);
        food.kill();
        this.lipSmack.play();
    },
    eatComplete: function(sprite, animation){
        this.eating = false;
    },
    flipComplete: function(sprite, animation){
        sprite.kill();
    },
    bellyBopForPhone: function() {
       bellyBopPhone = true;
    },
}



