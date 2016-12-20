var cursors;
var StateMain={
	preload: function() {
     	if (screen.width < 1500) {
     		game.scale.forceOrientation(true, false);
    	}
    	game.load.image("background", "images/background.png");
    	game.load.spritesheet("mondo", "images/mondo.png", 315, 294, 3);
    	game.load.spritesheet("mouse", "images/mouse.png", 166, 170, 4);
    	game.load.spritesheet("chihuahua", "images/chihuahua.png", 132, 137, 4);
    	
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
        
        this.mondo = game.add.sprite(0,this.background.y + 147,"mondo");
        this.mouse = game.add.sprite(30,30,"mouse");

        this.setListeners();
        this.animateMondo();
        this.animateMouse();
	},
    setListeners:function() {
        if (screen.width < 1500) {
            game.scale.enterIncorrectOrientation.add(this.wrongWay,this);
            game.scale.leaveIncorrectOrientation.add(this.rightWay,this);
        }
        cursors = game.input.keyboard.createCursorKeys();
    },
    animateMondo: function(){
        this.mondo.animations.add('walk', [0,1,2], 12, true);
        this.mondo.animations.play('walk');
    },
    animateMouse: function(){
        this.mouse.animations.add('walk', [0,1,2,3], 12, true);
        this.mouse.animations.play('walk');
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
             this.mondo.x -= 5;
        }
        if(cursors.right.isDown){
            this.mondo.x += 5;
        }
	},
}






