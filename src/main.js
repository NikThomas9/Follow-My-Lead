let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    roundPixels: true,
    pixelArt: true,
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    scene:  [Title, Talking, Instructions, Play, Inventory, UI, Puzzle2],
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
let music;
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyUp, keyDown, keyRight, keyLeft, keySpace, keyI;

let pickups, buttons, obstacles;
let code1 = ["red", "blue", "yellow", "green"];
let code2 = [4, 6, 2, 3, 1, 5];
let combination = [];
let inventory = []; 
let newPickup = false;
let selectNumber = 0;
let selectedItem = "";
let activeTool = "";
let currentScene = "";



