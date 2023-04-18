import * as mainModule from "./main.js";
const mapElement = document.getElementById('map');
let progressBar = document.querySelector('.progress-bar');
let progressBarLabel = document.getElementById('progress-bar-label');
let scoreLabel = document.getElementById('score-value');
const buttonRetry = document.getElementById('button-retry');

let mapWidth = 25;
let mapHeight = 15;

let gameScore = 0;

/**
 * Updates the progress bar based on the current energy and maximum energy.
 *
 * @param {number} currentEnergy - The current energy of the player.
 * @param {number} maxEnergy - The maximum energy of the player.
 * @returns {void}
 */
function updateProgressBar(currentEnergy, maxEnergy) {
    let progressPercentage = Math.round(currentEnergy / maxEnergy * 100);
    progressBar.style.width = progressPercentage + '%';
    progressBar.setAttribute('aria-valuenow', progressPercentage);
    progressBarLabel.innerHTML = currentEnergy + '/' + maxEnergy;
}

/**
 * Updates the score label.
 *
 * @param {number} score - The score of the player.
 * @returns {void}
 */
function updateScore(score) {
    gameScore = score;
    scoreLabel.innerHTML = '' + score;
}

/**
 * The callback function to be called when the player updates.
 *
 * @param {Player} player - The player object.
 * @returns {void}
 */
function onPlayerUpdated(player) {
    updateProgressBar(player.energyPoints, player.MAX_ENERGY_POINTS);
    updateScore(player.score);
    setPlayerPositionMap(player.positionX,player.positionY)
    if (player.isEnergyPointsZero()) {
        console.log("Game Over")
    }
}

function setPlayerPositionMap(positionX, positionY){
    let playerElement = document.getElementById('player');
    if (playerElement === null) {
        return;
    }
    playerElement.style.left = positionX * 40 + 'px';
    playerElement.style.top = positionY * 40 + 'px';
}

/**
 * The callback function to be called when a tile updates.
 *
 * @param {Tile} tile - The tile object.
 * @returns {void}
 */
function onTileUpdated(tile) {
    let tileElement = document.getElementById(generateTileViewId(tile));
    if (tileElement === null) {
        console.log("tile element" + generateTileViewId(tile) + " not found");
        return;
    }
    tileElement.dataset.type = tile.tileTypeId;
    if (tile.tileTypeId === 0) {
        tileElement.className = 'normal';
    } else if (tile.tileTypeId === 1) {
        tileElement.className = 'treasure';
    } else if (tile.tileTypeId === 2) {
        tileElement.className = 'trap';
    }
    tileElement.className += ' cell';
}

/**
 * Generates the map and sets up the UI elements.
 *
 * @returns {void}
 */
function generateMap() {
    // Clear the map element
    mapElement.innerHTML = '';

    // Create the player element and append it to the map
    let playerElement = document.createElement('div');
    playerElement.id = 'player';
    mapElement.appendChild(playerElement);
    setPlayerPositionMap(mainModule.player.positionX, mainModule.player.positionY)

    // Loop through the map cells and create elements for each one
    for (let x = 0; x < mapWidth; x++) {
        for (let y = 0; y < mapHeight; y++) {
            // Get the tile type for this cell
            let tile = gameMap[x][y];

            // Create a new element for this cell
            let tileElement = document.createElement('div');

            // Add the appropriate class based on the tile type
            if (tile.tileTypeId === 0) {
                tileElement.className += 'normal';
            } else if (tile.tileTypeId === 1) {
                tileElement.className += 'treasure';
            } else if (tile.tileTypeId === 2) {
                tileElement.className = 'trap';
            }

            // Add the 'cell' class to all tiles
            tileElement.className += ' cell';

            // Set the id and data-type attributes
            tileElement.id = generateTileViewId(tile);
            tileElement.dataset.type = tile.tileTypeId;

            // Add the element to the map
            mapElement.appendChild(tileElement);
        }
    }
}

/**
 * Generates a unique tile ID based on its positionX and positionY.
 * @param {Object} tile - The tile object.
 * @returns {string} The generated tile ID.
 */
function generateTileViewId(tile) {
    return "tile-positionX-" + tile.positionX + "-positionY-" + tile.positionY;
}

/**
 * The callback function to be called when the game is over.
 *
 * @param {number} score - The score.
 * @returns {void}
 */
function onGameOver(score){
    console.log(score);
    
    let pop_up_score= document.getElementById("popp-up-score");
    pop_up_score.innerHTML= '' + score;
    let pop_up= document.getElementById("game-over-poppup");
    pop_up.style.display = "flex";
}


function onResetGame(){
    mainModule.resetGame(mapWidth, mapHeight);
    let pop_up= document.getElementById("game-over-poppup");
    gameMap = mainModule.getMap();
    generateMap();
    pop_up.style.display = "none";
}

mainModule.initialize(onPlayerUpdated, onTileUpdated,onGameOver, mapWidth, mapHeight);
let gameMap = mainModule.getMap();
generateMap();
// Add an event listener for keyboard input
document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowLeft") {
        // Move player to the left
        mainModule.movePlayer(mainModule.MOVEMENT_DIRECTION.LEFT);
    } else if (event.code === "ArrowRight") {
        // Move player to the right
        mainModule.movePlayer(mainModule.MOVEMENT_DIRECTION.RIGHT);
    } else if (event.code === "ArrowUp") {
        // Move player up
        mainModule.movePlayer(mainModule.MOVEMENT_DIRECTION.UP);
    } else if (event.code === "ArrowDown") {
        // Move player down
        mainModule.movePlayer(mainModule.MOVEMENT_DIRECTION.DOWN);
    }else if (event.code === "Space") {
        // Move player down
        onGameOver(gameScore);
    }
});

buttonRetry.addEventListener('click', ()=>{onResetGame()})
