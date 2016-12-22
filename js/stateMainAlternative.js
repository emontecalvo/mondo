var cursors;
var gobbleDog;
var gobbleMouse;
var mouse1dead;
var walkingLeft;
var walkingRight;
var mouse;

var StateMain={
    init: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.mondoVengence = 0;
        this.enemyIndex = 0;
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
        game.load.spritesheet("deadDog", "images/deadDog.png", 496, 424, 1);
        game.load.spritesheet("deadMouse", "images/deadMouse.png", 602, 224, 1);
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

        // Mice
        this.mice = game.add.group();
        this.mice.enableBody = true;
        this.mice.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 8; i++) {
            if (i % 3 == 0) {
                var dog = this.mice.create(game.width, this.background.y+300, "chihuahua");
                this.setDogAnimations(dog);
                console.log(dog);
            } else {
                var mouse = this.mice.create(game.width, this.background.y+300, 'mouse');
                this.setMouseAnimations(mouse);
            }

        }
        this.mice.setAll("outOfBoundsKill", true);
        this.mice.setAll('checkWorldBounds', true);
       

        // Mondo
        this.mondo = game.add.sprite(0,this.background.y + 250,"mondo");
        this.mondo.scale.setTo(0.8, 0.8);
        this.mondo.fixedToCamera = true;
        game.physics.enable(this.mondo, Phaser.Physics.ARCADE);
        this.mondo.enableBody = true;

        // Buttons
        this.phoneLeft = game.add.button(100, this.background.y + 440, "playBtn", this.walkMondoLeft, this, 0);
        this.phoneLeft.scale.setTo(0.15, 0.15);

        this.phoneRight = game.add.button(400, this.background.y + 440, "playBtn", this.walkMondoRight, this, 1);
        this.phoneRight.scale.setTo(0.15, 0.15);

        this.phoneBop = game.add.button(200, this.background.y + 440, "playBtn", this.bellyBopPhone, this, 2);
        this.phoneBop.scale.setTo(0.15, 0.15);

        this.phoneJump = game.add.button(300, this.background.y + 440, "playBtn", this.jump, this, 3);
        this.phoneJump.scale.setTo(0.15, 0.15);

        // Text for vegence score
        this.textScore = game.add.text(game.world.centerX, this.top+60, "0");
        this.textScore.fill="000000";
        this.textScore.font= "VT323";
        this.textScore.fontSize=40;
        this.textScore.anchor.set(0.5,0.5);

        // Label for vengence score
        this.labelScore = game.add.text(game.world.centerX, this.top+20, "vengence points:");
        this.labelScore.fill="000000";
        this.labelScore.font= "VT323";
        this.labelScore.fontSize=40;
        this.labelScore.anchor.set(0.5,0.5);

        // Initializers
        this.setListeners();
        this.setMondoAnimations();
        this.mondoVengePoints(this.mondoVengence);
        this.launchMouse();
	},
    update: function() {
        this.mondo.body.velocity.setTo(0,0);
        if(!this.eating) this.mondo.animations.play('walk');

        if (!this.eating && cursors.left.isDown || this.walkingLeft) {
        //    this.walkingRight = false;
        //    this.mondo.animations.play('walk');
            this.background.tilePosition.x += 1;
            this.mondo.body.velocity.x = -10;
            game.camera.x -= 1;
        }
        if(!this.eating && cursors.right.isDown || this.walkingRight) {
            this.background.tilePosition.x -= 1;
        //    this.walkingLeft = false;
        //    this.mondo.animations.play('walk');
            this.mondo.body.velocity.x = 10;
            game.camera.x += 1;
        }
        if(!this.eating && cursors.up.isDown) {
        //    if (this.mondo.x <= this.mouse.x) {
        //        if (this.mouse.x < (this.mondo.x) + 250) {
        //            this.mondo.animations.stop('walk');
        //            this.mouse.animations.stop('walk');
            this.mondo.animations.play('belly');
            game.physics.arcade.overlap(this.mondo, this.mice, this.collisionHandler, null, this);
        //            this.mouse.animations.play('flip');
        //            this.mouse.x += 5;
        //            this.mouse1dead = true;
        //        }
        }

        if(game.time.now > this.launchTimer){
            this.launchMouse();
        }

        
        
        //}
        //if (this.mouse1dead == true) {
        //    this.mouse.animations.stop('walk');
        //}
        //if(cursors.up.isUp) {
        //    this.walkMouse();
        //}
        //if (gobbleDog.isDown) {
        //    this.mondo.animations.play('eatDog');
        //    this.mondoVengePoints(25);
        //    this.textScore.text=mondoVengence;
        //    console.log("mondo vengence is now:", mondoVengence);
//
        //}
        //if (gobbleMouse.isDown && this.mouse1dead) {
        //    this.mondo.animations.play('eatMouse');
        //    this.mouse.kill();
        //    this.mondoVengePoints(1);
        //    this.textScore.text=mondoVengence;
        //    console.log("mondo vengence is now:", mondoVengence);
        //}
    },
    setListeners:function() {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
        
        cursors = game.input.keyboard.createCursorKeys();
        //game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, this.launchMouse, this);
        //gobbleMouse = game.input.keyboard.addKey(Phaser.Keyboard.M);
        //gobbleDog = game.input.keyboard.addKey(Phaser.Keyboard.D);
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
    wrongWay:function() {
        document.getElementById("wrongWay").style.display="block";
    },
    rightWay:function() {
        document.getElementById("wrongWay").style.display="none";
    },
    mondoVengePoints: function(points) {
        points = points || 0;
        this.mondoVengence += points;
    },
    launchMouse: function(){
        var mouse = this.mice.getAt(this.enemyIndex);
        if(mouse !== -1){
            mouse.play('walk');
            mouse.body.velocity.x = -50;
        }
        this.enemyIndex++;
        this.launchTimer = game.time.now + Phaser.Timer.SECOND * 5;
    },
    collisionHandler: function(mondo, enemy){
        this.eating = true;
        if (enemy.key == "mouse") {
            mondo.play('eatMouse');  
        } else {
            mondo.play('eatDog');
        }
        enemy.play('flip');
        enemy.body.velocity.x = 50;
    },
    eatComplete: function(sprite, animation){
        this.eating = false;
    },
    flipComplete: function(sprite, animation){
        sprite.kill();
    }
    //walkMondoLeft: function() {
    //    this.walkingLeft = true;
    //    this.walkingRight = false;
    //},
    //walkMondoRight: function() {
    //    this.walkingRight = true;
    //    this.walkingLeft = false;
    //},
    //bellyBopPhone: function() {
    //    if (this.mondo.x <= this.mouse.x) {
    //        if (this.mouse.x < (this.mondo.x) + 250) {
    //            this.mondo.animations.stop('walk');
    //            this.mouse.animations.stop('walk');
    //            this.mondo.animations.play('belly');
    //            this.mouse.animations.play('flip');
    //            this.mouse.x += 5;
    //            this.mouse1dead = true;
    //        }
    //    }
    //},
    //jump: function() {
    //    console.log("mondo jump!");
    //},
    //walkMouse: function(){
    //    if (!this.mouse1dead) {
    //        
    //        this.mouse.x -= 1;
    //        this.mouse.animations.play('walk');
    //    }
    //}
}






