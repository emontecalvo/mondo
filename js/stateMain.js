var cursors;
var StateMain={
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 120, 85,3);
    	game.load.spritesheet("mouse", "images/mouse.png", 52, 50, 4);
    	game.load.spritesheet("chihuahua.png", "images/chihuahua.png", 52, 50, 4);
    	
	},
	create: function() {
        this.mondo = game.add.sprite(0,0,"mondo");
        this.mouse = game.add.sprite(30,30,"mouse");
        //background
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');
        // ipad fix:
        if (screen.height >=764) {
            this.background.y=game.world.centerY-this.background.height/2;
            this.top=this.background.y;
            this.bottom = this.background.y+360;
        }
        this.setListeners();
        cursors = game.input.keyboard.createCursorKeys();
        this.mondo.animations.add('fly', [0,1,2,3], 12, true);
        this.mondo.animations.play('fly');
	},
    setListeners:function() {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
    },
    wrongWay:function() {
        document.getElementById("wrongWay").style.display="block";
    },
    rightWay:function() {
        document.getElementById("wrongWay").style.display="none";
    },
	update: function() {
        // if (cursors.left.isDown){
        //     //move cat to the left
        //     this.mondo.x -= 1;
        // }
        // if(cursors.right.isDown){
        //     this.mondo.x += 1;
        // }
	},
}






