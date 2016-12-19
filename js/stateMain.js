var StateMain={
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 200, 155,1);
    	game.load.spritesheet("mouse", "images/mouse.png", 75, 40, 1);
    	game.load.spritesheet("chihuahua.png", "images/chihuahua.png", 100, 36, 1);
    	
	},
	create: function() {
        this.mondo = game.add.sprite(0,0,"mondo");
        //background
        this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');
        // ipad fix:
        if (screen.height >=764) {
            this.background.y=game.world.centerY-this.background.height/2;
            this.top=this.background.y;
            this.bottom = this.background.y+360;
        }
        this.setListeners();
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

	},
}






