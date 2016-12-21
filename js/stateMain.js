var cursors;
var gobbleDog;
var gobbleMouse;
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
    	game.load.spritesheet("mouse", "images/mouse.png", 166, 170, 4);
    	game.load.spritesheet("chihuahua", "images/chihuahua.png", 132, 137, 4);
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
        this.deadMouse = game.add.sprite(this.background.x-450, this.background.y-415, "deadMouse");
        this.deadMouse.scale.setTo(0.2, 0.2);
        this.mouse = game.add.sprite(600,this.background.y+300,"mouse");
        
        // buttons
        // this.phoneLeft = game.add.button(100, this.background.y + 440, "playBtn", this, 0);
        // this.phoneRight = game.add.button(400, this.background.y + 440, "playBtn", this, 1);
        this.phoneBop = game.add.button(200, this.background.y + 440, "playBtn", this.bellyBop, this, 2);
        this.phoneJump = game.add.button(300, this.background.y + 440, "playBtn", this.jump, this, 3);

        //this.phoneLeft.scale.setTo(0.15, 0.15);
        //this.phoneRight.scale.setTo(0.15, 0.15);
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
        cursors = game.input.keyboard.createCursorKeys();
        gobbleMouse = game.input.keyboard.addKey(Phaser.Keyboard.M);
        gobbleDog = game.input.keyboard.addKey(Phaser.Keyboard.D);
    },
    mondoEatDog: function() {
        this.mondo.animations.add('eatDog', [3, 4, 4, 4, 1], 2, false);
    },
    mondoEatMouse: function() {
        this.mondo.animations.add('eatMouse', [2, 5, 5, 5, 2], 2, false);
    },
    walkMondo: function(){
        this.mondo.animations.add('walk', [0, 1], 2, true);
        this.mondo.animations.play('walk');
    },
    bellyBop: function() {
        this.mondo.animations.add('belly', [6], 6, true);
    },
    jump: function() {
        console.log("mondo jump!");
    },
    walkMouse: function(){
        this.mouse.animations.add('walk', [0], 12, false);
        this.mouse.x -= 1;
        this.mouse.animations.play('walk');
    },
    flipMouse: function() {
        this.mouse.animations.add('flip', [0,1,2,3], 12, true);
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
        if (cursors.left.isDown){
             //move cat to the left
             this.mondo.animations.play('walk');
             this.mondo.x -= 1;
        }
        if(cursors.right.isDown){
            this.mondo.animations.play('walk');
            this.mondo.x += 1;
        }
        if (cursors.up.isDown) {
            this.mondo.animations.stop('walk');
            this.mouse.animations.stop('walk');
            this.mondo.animations.play('belly');
            this.mouse.animations.play('flip');
            this.mouse.x += 10;
            this.deadMouse.x = this.background.x+450
            this.deadMouse.y = this.background.y+415;
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
        if (gobbleMouse.isDown) {
            this.mondo.animations.play('eatMouse');
            this.deadMouse.kill();
            this.mondoVengePoints(5);
            this.textScore.text=mondoVengence;
            console.log("mondo vengence is now:", mondoVengence);
        }
	},
}






