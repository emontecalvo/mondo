var StateOver = {

    preload: function () {
        game.load.spritesheet("startBtn", "images/replayBtn.png", 448, 142);
        game.load.spritesheet("mondo", "images/mondoIntro.png", 851, 658, 1);
    },

    create: function () {
        this.buttonStart = game.add.button(game.world.centerX, game.world.centerY + 100, "startBtn", this.startGame, this, 0, 1, 0);
        this.buttonStart.anchor.set(0.5, 0.5);

        // mondo
        this.mondoStart = game.add.sprite(game.world.centerX, game.world.centerY, "mondo");
        this.mondoStart.scale.setTo(0.3,0.3);
        this.mondoStart.anchor.set(0.5, 0.8);
        game.stage.backgroundColor = "#fdf0d4";

        this.titleText = game.add.text(game.world.centerX, 100, "mondo is phat", {
            font: "50px Arial"
            , fill: "#1368B3"
            , stroke: "#222222"
            , strokeThickness: 4
            , align: "center"
        });
        this.titleText.anchor.set(0.5, 0.5);

        this.thanks = game.add.text(game.world.centerX, 150, "mondo thanks you for playing");
        this.thanks.anchor.set(0.5, 0.5);
    }
    , startGame: function () {
        game.state.start("StateInstructions2");
    }
    , update: function () {

    }

}