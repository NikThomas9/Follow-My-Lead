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
    scene:  [Title, Talking, Instructions, Puzzle1, Puzzle2, Inventory, UI],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
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

let tutorialActive = false;
let tutorialText = "";
let tutorialTimerReset = false;

let tutorial1Message = "Press 'SPACE' to interact with items."
let tutorial2Message = "Press 'K' to open your inventory."
let tutorial3Message = "Select an active item to use from your inventory by pressing 'SPACE' from the inventory menu."
let tutorial4Message = "Interact with obstacles using your active item with 'SPACE'."
let tutorial5Message = "Select notes and press 'SPACE' from your inventory to read them."

let tutorial1Played = false
let tutorial2Played = false
let tutorial3Played = false
let tutorial4Played = false
let tutorial5Played = false

