var StateInstructions2 = {

    preload: function () {
        game.load.spritesheet("vengeBtn", "images/vengeBtn.png", 446, 142);
        game.load.spritesheet("mondo", "images/mondoIntro.png", 851, 658, 1);
    },

    create: function () {
        this.vengeStart = game.add.button(game.world.centerX, game.world.centerY + 150, "vengeBtn", this.startGame, this, 0, 1, 0);
        this.vengeStart.scale.setTo(0.6, 0.6);
        this.vengeStart.anchor.set(0.5, 0.6);

        // mondo
        this.mondoStart = game.add.sprite(game.world.centerX, game.world.centerY, "mondo");
        this.mondoStart.scale.setTo(0.7,0.7);
        this.mondoStart.anchor.set(0.5, 0.5);
        game.stage.backgroundColor = "#fdf0d4";


        this.backstory1 = game.add.text(game.world.centerX, 150, "they used to make fun of mondo");
        this.backstory1.anchor.set(0.5, 0.5);
        this.backstory2 = game.add.text(game.world.centerX, 180, "but today he got out of the house");
        this.backstory2.anchor.set(0.5, 0.5);
        this.instruc1 = game.add.text(game.world.centerX, 210, "EAT DA FOOD:  jump button / up arrow");
        this.instruc1.anchor.set(0.5, 0.5);
        this.instruc2 = game.add.text(game.world.centerX, 240, "EAT DA HATERS: belly bop / down arrow");
        this.instruc2.anchor.set(0.5, 0.5);
        this.instruc3 = game.add.text(game.world.centerX, 270, "claim as many vengence points as you can...");
        this.instruc3.anchor.set(0.5, 0.5);

    }
    , startGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}