// var game is our global EVERYTHING
var game;
var score;
var mondoVengence;
//window on load kicks off running our code
window.onload = function()
{
    if (screen.width>1500)
	{
		// desktop or laptop
      game=new Phaser.Game(640,480,Phaser.AUTO,"ph_game");
      	// 3 modes with Auto:
      	// Phaser.WebGL; // for webs graphics library  - a litte better performance than
      	// // canvas and a little more graphics - it's what is the 1st try
      	// Phaser.Canvas // for if the WebGL fails/fallback

	}
	else
	{		
		// mobile device
		game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"ph_game");		
	}
    game.state.add("StateMain",StateMain);
    game.state.start("StateMain");
}
