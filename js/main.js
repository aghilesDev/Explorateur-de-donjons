import * as mapModule from "./map.js";
import player from "./player.js";

/**
 * The map of the game
 * @type {Array}
 */
let gameMap = [];

/**
 * Initialize the game
 * @param {function} playerListener - The listener for the player
 * @param {function} tileListener - The listener for the tile
 * @param {number} mapWidth - The width of the map
 * @param {number} mapHeight - The height of the map
 */
function initialize(playerListener, tileListener, mapWidth, mapHeight) {
  gameMap = mapModule.generateMap(mapWidth, mapHeight);
  mapModule.addTileListener(tileListener);
  player.addListener(playerListener);
  // Place player on the starting tile
  player.moveTo(0, 0, 0);
  let positionX = player.getPositionX();
  let positionY = player.getPositionY();
  mapModule.setTileType(positionX, positionY, mapModule.TILE_TYPE.NORMAL);
}

/**
 * Update the player's score
 * @param {number} score - The score to update
 */
function updatePlayerScore(score) {
  player.updateScore(score);
}

/**
 * Move the player
 * @param {string} direction - The direction of movement
 * @returns {boolean} - Whether the player can move or not
 */
function movePlayer(direction) {
  if (player.isEnergyPointsZero()) {
    return false;
  }
  let positionX = player.getPositionX();
  let positionY = player.getPositionY();
  if (!mapModule.canMove(positionX, positionY, direction)) {
    return false;
  }
  let destinationTile = mapModule.getAdjacentTile(positionX, positionY, direction);
  console.log(destinationTile);
  // If the destination tile is trap it costs 1 energy
  let energyPointsCost = 0;
  if (destinationTile.tileTypeId === mapModule.TILE_TYPE.TRAP.id) {
    energyPointsCost = 1;
  }
  // Move the player to the destination tile
  let isPlayerMoved = player.moveTo(destinationTile.positionX, destinationTile.positionY, energyPointsCost);
  if (!isPlayerMoved) {
    return false;
  }
  // Update the player score according to the tile type he is on
  let tileType = mapModule.getTileType(destinationTile);
  updatePlayerScore(tileType.score);
  // Transform the tile that the player went one to a normal tile
  mapModule.setTileType(destinationTile.positionX, destinationTile.positionY, mapModule.TILE_TYPE.NORMAL);
}

export {
  movePlayer,
};
export { initialize };
/**
 * Get the game map
 * @returns {Array} - The game map
 */
export { getMap, MOVEMENT_DIRECTION } from "./map.js";
