var StateInstructions = {

    preload: function () {
        game.load.spritesheet("vengeBtn", "images/vengeBtn.png", 446, 142);
        game.load.spritesheet("mondo", "images/mondoIntro.png", 851, 658, 1);
    },

    create: function () {
        this.vengeStart = game.add.button(game.world.centerX, game.world.centerY + 150, "vengeBtn", this.startGame, this, 0, 1, 0);
        this.vengeStart.scale.setTo(0.5, 0.5);
        this.vengeStart.anchor.set(0.5, 0.6);

        // mondo
        this.mondoStart = game.add.sprite(game.world.centerX, game.world.centerY, "mondo");
        this.mondoStart.scale.setTo(0.6,0.6);
        this.mondoStart.anchor.set(0.5, 0.5);
        game.stage.backgroundColor = "#fdf0d4";

        this.titleText = game.add.text(game.world.centerX, 150, "mondo is phat", {
            font: "50px Arial"
            , fill: "#1368B3"
            , stroke: "#222222"
            , strokeThickness: 4
            , align: "center"
        });
        this.titleText.anchor.set(0.5, 0.5);

        this.backstory1 = game.add.text(game.world.centerX, 210, "a relaxing game in which Mondo");
        this.backstory1.anchor.set(0.5, 0.5);
        this.instruc1 = game.add.text(game.world.centerX, 250, "eats his way towards vengeance");
        this.instruc1.anchor.set(0.5, 0.5);
    }
    , startGame: function () {
        game.state.start("StateInstructions2");
    }
    , update: function () {

    }

}
