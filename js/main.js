var game;
var mondoVengeance;

window.onload = function()
{
    // game definition, 100% of browser window dimension
    // game = new Phaser.Game("100%","100%",Phaser.CANVAS,"",{
    //     preload:onPreload,
    //     create:onCreate,
    //     resize:onResize // <- this will be called each time the game is resized
    // }); 
    if (screen.width>1500)
	{
		// desktop or laptop
      game=new Phaser.Game(640,480,Phaser.AUTO,"ph_game");
	}
	else
	{		
		// mobile device
		game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"ph_game");		
	}    
//    game.state.add("StateMain",StateMain);
    game.state.add("StateHome",StateHome);
    game.state.add("StateInstructions",StateInstructions);
    game.state.add("StateInstructions2",StateInstructions2);
    game.state.add("StateMain",StateMain);
    game.state.add("FallState", FallState);
    game.state.add("BeachState", BeachState);
    game.state.add("StateOver", StateOver);
    game.state.start("StateHome");

}
