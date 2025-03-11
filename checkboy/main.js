class Sprite{
    constructor(image, sheetX, sheetY, imgWidth, imgHeight, spriteWidth, spriteHeight){
        this.image = image;                 // image: sprite sheet image object
        this.sheetX = sheetX;               // sheetX: x index of sprite in sprite sheet ( NOT in pixels )
        this.sheetY = sheetY;               // sheetY: y index of sprite in sprite sheet ( NOT in pixels )
        this.imgWidth = imgWidth;           // imgWidth: width of sprite in sprite sheet in pixels
        this.imgHeight = imgHeight;         // imgHeight: height of sprite in sprite sheet in pixels
        this.spriteWidth = spriteWidth;     // spriteWidth: width of sprite in pixels
        this.spriteHeight = spriteHeight;   // spriteHeight: height of sprite in pixels
    }
    // Draws the sprite to the canvas
    renderSprite(ctx, x, y){
        let sX = this.sheetX * this.spriteWidth;
        let sY = this.sheetY * this.spriteHeight;
        ctx.drawImage(this.image, sX, sY, this.spriteWidth, this.spriteHeight, x, y, this.spriteWidth, this.spriteHeight);
    }
}

class GameObject{
    constructor(x, y, sprite){
        this.x = x;             // x: x coordinate of gameObject
        this.y = y;             // y: y coordinate of gameObject
        this.sprite = sprite;   // sprite: sprite object of gameObject
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    // Renders the gameObject's sprite to the canvas
    renderSprite(ctx){
        this.sprite.renderSprite(ctx, this.x, this.y);
    }
}

class player extends GameObject{
    constructor(x, y, sprite, tile_map){
        super(x, y, sprite);
        this.tile_map = tile_map    // tile_map: tile map object the player is on
        this.lastMoveTime = 0;      // Last timestamp the player moved
        this.moveCooldown = 10;    // Movement cooldown in ms
    }
    // Moves the player in a direction for a certain amount, direction is an array of ["up", "down", "left", "right"]
    move(direction, amount, currentTime){
        // Cooldown for movement
        if(currentTime - this.lastMoveTime < this.moveCooldown){
            return;
        }
        this.lastMoveTime = currentTime
        // Up
        if(direction[0])
            this.y -= amount;
        // Down
        if(direction[1])
            this.y += amount;
        // Left
        if(direction[2])
            this.x -= amount;
        // Right
        if(direction[3])
            this.x += amount;
               
        // Check for map borders
        if(this.x < 0)
            this.x = 0;
        if(this.y < 0)
            this.y = 0;
        if(this.x > (this.tile_map.width - 1) * this.tile_map.tile_size)
            this.x = (this.tile_map.width - 1) * this.tile_map.tile_size;
        if(this.y > (this.tile_map.height - 1) * this.tile_map.tile_size)
            this.y = (this.tile_map.height - 1) * this.tile_map.tile_size;
    }
}

class InputHandler{
    constructor(){
        this.keys = {}; // Object to store key states
        this.keyMapping = {  // Key mapping from input name to key code, can change for different key binds ( We can make a key bind changer setting or something)
            "up": "KeyW",
            "down": "KeyS",
            "left": "KeyA",
            "right": "KeyD"
        }
        // Event listener for keyup and keydown
        window.addEventListener('keydown', (event) => this.updateKey(event.code, true));
        window.addEventListener('keyup', (event) => this.updateKey(event.code, false));
    }
    // Changes the key to state, state should be true or false
    updateKey(keyCode, state) {
        console.log("key: " + keyCode + ", state: " + state);
        this.keys[keyCode] = state;
    }
    // Returns the key status of a key code
    getKey(key){
        return this.keys[key];
    }
    // Returns the key status of an input name
    getInput(input){
        return this.keys[this.keyMapping[input]];
    }
}

// Main tile map object, each tile in the 2d array is a gameObject, rendered using the gameObjects sprite
class TileMap{
    constructor(width, height, tile_size){
        this.width = width;         // width: number of tiles in the x direction
        this.height = height;       // height: number of tiles in the y direction
        this.tile_size = tile_size; // tile_size: size of each tile in pixels   
        this.tiles = new Array(height); // tiles[y][x] to access the tile at (x, y)
        for(let i = 0; i < height; i++){
            this.tiles[i] = new Array(width);
            for(let j = 0; j < width; j++){
                this.tiles[i][j] = null;
            }
        }
    }
    // Load a gameObject into the tile map, this will automatically set the x and y coords of the gameObject
    setTile(x, y, tile){
        tile.x = x * this.tile_size;
        tile.y = y * this.tile_size
        if (x >= 0 && x < this.width && y >= 0 && y < this.height)
            this.tiles[y][x] = tile;
        else
            console.log("Tile outside of tile map!");
    }
    // Get a gameObject from a tile
    getTile(x, y){
        if (x >= 0 && x < this.width && y >= 0 && y < this.height)
            return this.tiles[y][x];
        else
            console.log("Tile outside of tile map!");
    }
    // Renders the tile map to the canvas
    renderTileMap(ctx){
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++)
                if(this.tiles[i][j] != null)
                    this.tiles[i][j].renderSprite(ctx);
        }
    }
}

class UI{
    constructor(canvas, ctx, font){
        this.canvas = canvas; // Use different canvas for UI, to allow different resolutions
        this.ctx = this.canvas.getContext("2d");
        this.font = font;
        this.ctx.font = font;
    }
    // Draws text to the canvas
    drawText(text, x, y, color){
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }
    // resizes the UI canvas to fill the window
    resizeUICanvas(){
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.scale(dpr, dpr);
        this.ctx.font = this.font;
    }
}

// Set canvas and context
const game_canvas = document.getElementById("gameCanvas");
const game_ctx = game_canvas.getContext("2d");
const UI_canvas = document.getElementById("UICanvas");
const UI_ctx = UI_canvas.getContext("2d");

// Create UI object
let game_UI = new UI(UI_canvas, UI_ctx, "15px Arial");
// Update UI size upon window resize, (bind to game_UI's context)
window.addEventListener("resize", game_UI.resizeUICanvas.bind(game_UI));
// Call once on load
game_UI.resizeUICanvas(); 


// Tile set size
const tile_size = 16;
const tile_map_width = 20;
const tile_map_height = 10;

// Load sprite sheet 1
const spriteSheet1 = new Image();
spriteSheet1.src = "img/spriteSheet1.png";
spriteSheet1.onload = () => {
    console.log("spriteSheet1 loaded");
}

// Create tile map object
let tile_map = new TileMap(tile_map_width, tile_map_height, tile_size);

// Fill tile map with gameObjects
for(let i = 0; i < tile_map.height; i++){
    for(let j = 0; j < tile_map.width; j++){
        let sprite = new Sprite(spriteSheet1, 1, 2, spriteSheet1.width, spriteSheet1.height, tile_size, tile_size);
        let tile = new GameObject(0, 0, sprite);
        tile_map.setTile(j, i, tile);
    }
}

// Create player object
let playerSprite = new Sprite(spriteSheet1, 0, 0, spriteSheet1.width, spriteSheet1.height, tile_size, tile_size);
let playerObj = new player(0, 0, playerSprite, tile_map);

// Create input handler
let input = new InputHandler();

// Main game loop
let lastTimeStamp = 0;
let fps = 0;
let direction = [false, false, false, false]; // up, down, left, right
requestAnimationFrame(gameLoop);
function gameLoop(timeStamp){
    // Delta Time
    let deltaTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;

    // FPS
    fps = 1000 / deltaTime;

    // Clear the canvas
    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    // Player movement
    direction[0] = input.getInput("up");
    direction[1] = input.getInput("down");
    direction[2] = input.getInput("left");
    direction[3] = input.getInput("right");
    playerObj.move(direction, tile_size, timeStamp); // Move by "tile_size" pixels to keep player on grid

    // Render the tile map
    tile_map.renderTileMap(game_ctx);

    // Render the player
    playerObj.renderSprite(game_ctx);

    // ----- UI -----
    // Clear the canvas
    UI_ctx.clearRect(0, 0, UI_canvas.width, UI_canvas.height);

    // FPS
    game_UI.drawText("FPS: " + Math.round(fps), 10, 30, "white");

    // Call the game loop again
    requestAnimationFrame(gameLoop);
}

// References:
/*
Javascript classes:
https://www.w3schools.com/js/js_class_inheritance.asp

Sprites and animations:
https://codehs.com/tutorial/andy/Programming_Sprites_in_JavaScript

User inputs:
https://gablaxian.com/articles/creating-a-game-with-javascript/handling-user-input/
https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

Javascript game loop:
https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe

*/
