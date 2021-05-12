let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    scene:  [Intro1, Intro2, Intro3, Intro4, Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
            fps: 60,
        },
    }
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUp, keyDown, keyRight, keyLeft;

