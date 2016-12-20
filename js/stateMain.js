var cursors;
var gobbleDog;
var gobbleMouse;
var StateMain={
    init: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background1.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 320, 265, 8);
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

        this.setListeners();
        this.walkMondo();
        this.walkMouse();
        this.flipMouse();
        this.bellyBop();
        this.mondoEatDog();
        this.mondoEatMouse();
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
        this.mondo.animations.add('eatDog', [3, 4], 2, true);
    },
    mondoEatMouse: function() {
        this.mondo.animations.add('eatMouse', [2, 5, 2, 5, 2], 2, false);
    },
    walkMondo: function(){
        this.mondo.animations.add('walk', [0, 1], 2, true);
        this.mondo.animations.play('walk');
    },
    bellyBop: function() {
        this.mondo.animations.add('belly', [6], 6, true);
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
            this.mouse.kill();
        }
        if(cursors.up.isUp) {
            this.walkMouse();
        }
        if (gobbleDog.isDown) {
            this.mondo.animations.play('eatDog');
        }
        if (gobbleMouse.isDown) {
            this.mondo.animations.play('eatMouse');
            this.deadMouse.kill();
        }
	},
}






