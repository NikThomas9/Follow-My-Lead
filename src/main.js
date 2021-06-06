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
    scene:  [Title, Talking, Instructions, Puzzle1, Puzzle2, Inventory, UI,Title2, Talking2],
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

let pickups, buttons, obstacles, tutorials;
let code1 = ["red", "blue", "yellow", "green"];
let code2 = [4, 6, 2, 3, 1, 5];
let combination = [];
let combination2 = [];
let inventory = []; 
let newPickup = false;
let selectNumber = 0;
let selectedItem = "";
let activeTool = "";
let currentScene = "";

let inventoryOpened = false;

let tutorialActive = false;
let tutorialText = "";

let tutorial1Message = "Use WASD to move."
let tutorial2Message = "Press 'F' to open your inventory."
let tutorial3Message = "Use 'SPACE' to select items in your inventory. \nUse the handbook to learn more about the forest."

