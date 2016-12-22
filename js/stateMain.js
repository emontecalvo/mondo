var cursors;
var gobbleDog;
var gobbleMouse;
var mouse1dead;
var walkingLeft;
var walkingRight;
var mouse;

var StateMain={
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        mondoVengence = 0;
    },
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background1.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 320, 265, 8);
        game.load.spritesheet("playBtn", "images/playBtns.png", 624, 290, 4);
    	game.load.spritesheet("mouse", "images/mouse.png", 171, 160, 8);
    	game.load.spritesheet("chihuahua", "images/chihuahua.png", 132, 162, 8);
        game.load.spritesheet("deadDog", "images/deadDog.png", 496, 424, 1);
        game.load.spritesheet("deadMouse", "images/deadMouse.png", 602, 224, 1);
	},
	create: function() {
        //background
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');
        // ipad fix:
        if (screen.height >=764) {
            this.background.y=game.world.centerY-this.background.height/2;
            this.top=this.background.y;
            this.bottom = this.background.y+360;
        }
        
        this.mondo = game.add.sprite(0,this.background.y + 250,"mondo");
        this.mondo.scale.setTo(0.8,0.8);
        //this.mondo.scale.x = 0.5;
        this.mondo.fixedToCamera = true;
        game.physics.arcade.enable(this.mondo);

        //this.mouse = game.add.sprite(600,this.background.y+300,"mouse");
        
        group = game.add.physicsGroup();
        for (var i = 0; i < 10; i++) {
            var c = group.create(game.rnd.between(0, game.width), this.background.y+300, 'mouse');
        }
       //  this.mice = game.add.group();
       //  this.mice.createMultiple(5, 'mouse');
       //  this.mice.setAll('anochor.x', 600);
       //  this.mice.setAll('anchor.y', this.background.y+300);
       //  for (var i = 0, len = this.mice.children.length; i < len; i++) {

       //      this.mouse = this.mice.children[i];
       //      this.mouse.x = 600;
       //      this.mouse.y = this.background.y+300;
       //      console.log(this.mice.children[i]);
       //  }
       //  //game.time.events.repeat(Phaser.Timer.SECOND, 20, this.launchMice, this);
       //  // this.mice.setAll('anochor.x', 600);
       //  // this.mice.setAll('anchor.y', this.background.y+300);
       //  // this.mice.setAll("checkWorldBounds", true);
       //  // this.mice.setAll("outOfBoundsKill", true);
       // // this.launchMice();

        // buttons
        this.phoneLeft = game.add.button(100, this.background.y + 440, "playBtn", this.walkMondoLeft, this, 0);
        this.phoneRight = game.add.button(400, this.background.y + 440, "playBtn", this.walkMondoRight, this, 1);
        this.phoneBop = game.add.button(200, this.background.y + 440, "playBtn", this.bellyBopPhone, this, 2);
        this.phoneJump = game.add.button(300, this.background.y + 440, "playBtn", this.jump, this, 3);

        this.phoneLeft.scale.setTo(0.15, 0.15);
        this.phoneRight.scale.setTo(0.15, 0.15);
        this.phoneBop.scale.setTo(0.15, 0.15);
        this.phoneJump.scale.setTo(0.15, 0.15);

        //text for vegence score
        this.textScore = game.add.text(game.world.centerX, this.top+60, "0");
        this.textScore.fill="000000";
        this.textScore.font= "VT323";
        this.textScore.fontSize=40;
        this.textScore.anchor.set(0.5,0.5);

        // label for vengence score
        this.labelScore = game.add.text(game.world.centerX, this.top+20, "vengence points:");
        this.labelScore.fill="000000";
        this.labelScore.font= "VT323";
        this.labelScore.fontSize=40;
        this.labelScore.anchor.set(0.5,0.5);

        this.setListeners();
        this.walkMondo();
        this.walkMouse();
        this.flipMouse();
        this.bellyBop();
        this.mondoEatDog();
        this.mondoEatMouse();
        this.mondoVengePoints();

	},
    setListeners:function() {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
        //game.time.events.loop(Phaser.Timer.SECOND*this.delay, this.launchMice, this);
        cursors = game.input.keyboard.createCursorKeys();
        gobbleMouse = game.input.keyboard.addKey(Phaser.Keyboard.M);
        gobbleDog = game.input.keyboard.addKey(Phaser.Keyboard.D);
    },
    // launchMice: function() {
    //     var MIN_ENEMY_SPACING = 300;
    //     var MAX_ENEMY_SPACING = 3000;
    //     //var ENEMY_SPEED = 300;

    //     this.mouse = this.mice.getFirstDead(false);

    //     if (this.mouse) {
    //     //  And bring it back to life
    //         mice.reset(game.world.randomX, game.world.randomY);
    //     //  This just changes its frame
    //         mice.frame = game.rnd.integerInRange(0, 36);
    //     }
    //     this.mouse.x = 600;
    //     this.mouse.y = this.background.y+300;
    //    //  this.walkMouse();
    //    //  console.log(this.mouse);
    //    //  console.log(this.mouse.x);
    //    //  console.log(this.mouse.y);
    //    //  console.log(this.mouse.sprite);
    //    //  // if (mouse) {
    //    //  //     enemy.reset(game.rnd.integerInRange(0, game.width), -20);
    //    //  //     enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
    //    //  //     enemy.body.velocity.y = ENEMY_SPEED;
    //    //  //     enemy.body.drag.x = 100;
    //    //  // }

    //    //  //  Send another enemy soon
    //    // //game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), this.launchMice);
    




    // },
    mondoEatDog: function() {
        this.mondo.animations.add('eatDog', [3, 4, 4, 4, 1], 2, false);
    },
    mondoEatMouse: function() {
        this.mondo.animations.add('eatMouse', [2, 5, 5, 5, 2], 2, false);
    },
    walkMondoLeft: function() {
        this.walkingLeft = true;
        this.walkingRight = false;
    },
    walkMondoRight: function() {
        this.walkingRight = true;
        this.walkingLeft = false;
    },
    walkMondo: function() {
        this.mondo.animations.add('walk', [0, 1], 2, true);
        this.mondo.animations.play('walk');
    },
    bellyBop: function(torf) {
        this.mondo.animations.add('belly', [6], 6, true);
    },
    bellyBopPhone: function() {
        if (this.mondo.x <= this.mouse.x) {
            if (this.mouse.x < (this.mondo.x) + 250) {
                this.mondo.animations.stop('walk');
                this.mouse.animations.stop('walk');
                this.mondo.animations.play('belly');
                this.mouse.animations.play('flip');
                this.mouse.x += 5;
                this.mouse1dead = true;
            }
        }
    },
    jump: function() {
        console.log("mondo jump!");
    },
    walkMouse: function(){
        if (!this.mouse1dead) {
            this.mouse.animations.add('walk', [0], 12, false);
            this.mouse.x -= 1;
            this.mouse.animations.play('walk');
        }
    },
    flipMouse: function() {
        this.mouse.animations.add('flip', [0,1,2,3, 0, 1, 2, 3, 4, 5, 6, 7, 8], 12, false);
    },
    wrongWay:function() {
        document.getElementById("wrongWay").style.display="block";
    },
    rightWay:function() {
        document.getElementById("wrongWay").style.display="none";
    },
    mondoVengePoints: function(points) {
        points = points || 0;
        mondoVengence += points;
    },
	update: function() {
        if (cursors.left.isDown || this.walkingLeft) {
            this.walkingRight = false;
            this.mondo.animations.play('walk');
            this.background.tilePosition.x += 1;
            this.mondo.x -= 1;
            game.camera.x -= 1;
        }
        if(cursors.right.isDown || this.walkingRight) {
            this.background.tilePosition.x -= 1;
            this.walkingLeft = false;
            this.mondo.animations.play('walk');
            this.mondo.x += 1;
            game.camera.x += 1;
        }
        if (cursors.up.isDown) {
            if (this.mondo.x <= this.mouse.x) {
                if (this.mouse.x < (this.mondo.x) + 250) {
                    this.mondo.animations.stop('walk');
                    this.mouse.animations.stop('walk');
                    this.mondo.animations.play('belly');
                    this.mouse.animations.play('flip');
                    this.mouse.x += 5;
                    this.mouse1dead = true;
                }
            }
        }
        if (this.mouse1dead == true) {
            this.mouse.animations.stop('walk');
        }
        if(cursors.up.isUp) {
            this.walkMouse();
        }
        if (gobbleDog.isDown) {
            this.mondo.animations.play('eatDog');
            this.mondoVengePoints(25);
            this.textScore.text=mondoVengence;
            console.log("mondo vengence is now:", mondoVengence);

        }
        if (gobbleMouse.isDown && this.mouse1dead) {
            this.mondo.animations.play('eatMouse');
            this.mouse.kill();
            this.mondoVengePoints(1);
            this.textScore.text=mondoVengence;
            console.log("mondo vengence is now:", mondoVengence);
        }
	}
}






