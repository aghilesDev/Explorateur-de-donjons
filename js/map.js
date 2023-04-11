// This object defines the different types of tiles in the game map
let TILE_TYPE = {
    NORMAL: {
      id: 0,
      score: -10,
    },
    TREASURE: {
      id: 1,
      score: 1000,
    },
    TRAP: {
      id: 2,
      score: -50,
    },
  };
  
  // This object defines the different directions that a player can move in
  let MOVEMENT_DIRECTION = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
  };
  
  // These variables store the maximum values for the x and y coordinates of the game map
  let valMaxX = 0;
  let valMaxY = 0;
  
  // This variable stores the game map, which is a 2D array of tiles
  let gameMap = [[0]];
  
  // This array stores listeners that are interested in changes to the game tiles
  let tileListener = [];
  
  /**
   * This function adds a listener that will be notified when a tile changes
   * @param {function} listener - The listener function to be added
   */
  function addTileListener(listener) {
    if (listener !== null) {
      tileListener.push(listener);
    }
  }
  
  /**
   * This function notifies all tile listeners that a specific tile has changed
   * @param {Object} tile - The tile that has changed
   */
  function notifyTileListener(tile) {
    for (let i = 0; i < tileListener.length; i++) {
      let listener = tileListener[i];
      listener(tile);
    }
  }
  
  /**
   * This function generates a random integer between 0 and max (exclusive)
   * @param {number} max - The UPper bound for the random integer
   * @returns {number} - A random integer between 0 and max (exclusive)
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  /**
   * This function generates a tile object with the specified position and type ID
   * @param {number} positionX - The x-coordinate of the tile's position
   * @param {number} positionY - The y-coordinate of the tile's position
   * @param {number} tileTypeId - The ID of the tile's type
   * @returns {Object} - A tile object with the specified properties
   */
  function generateTile(positionX, positionY, tileTypeId) {
    return {
      positionX,
      positionY,
      tileTypeId,
    };
  }
  
 /**
 * Generates a game map with random tiles of treasure and traps
 *
 * @param {number} maxX - The maximum number of tiles on the X axis
 * @param {number} maxY - The maximum number of tiles on the Y axis
 * @returns {Array} The generated game map
 */
function generateMap(maxX, maxY) {
    // Calculate the maximum length of the map
    let maxLength = maxX * maxY;
    // Initialize an array to store the tile types to affect
    let tileTypesToAffect = [];
    // Determine which tile type to use for each tile
    for (let i = 0; i < maxLength; i++) {
      if (i < maxLength / 10.0) {
        tileTypesToAffect.push(TILE_TYPE.TREASURE.id);
      } else {
        tileTypesToAffect.push(TILE_TYPE.TRAP.id);
      }
    }
    // Initialize an array to store the generated game map
    let mapGenerated = [];
    // Generate tiles for each position on the game map
    for (let positionX = 0; positionX < maxX; positionX++) {
      mapGenerated.push([]);
      for (let positionY = 0; positionY < maxY; positionY++) {
        let index = getRandomInt(tileTypesToAffect.length);
        let tileTypeId = tileTypesToAffect[index];
        // Generate a tile for the current position
        mapGenerated[positionX].push(
          generateTile(positionX, positionY, tileTypeId)
        );
        // Remove the tile type that was used from the array of tile types
        tileTypesToAffect.splice(index, 1);
      }
    }
    // Store the dimensions of the game map
    valMaxX = maxX;
    valMaxY = maxY;
    gameMap = mapGenerated;
    // Return the generated game map
    return mapGenerated;
  }
  
  /**
   * Returns the current game map
   *
   * @returns {Array} The current game map
   */
  function getMap() {
    return gameMap;
  }
  
  /**
   * Determines whether a given position is valid on the game map
   *
   * @param {number} positionX - The X position to check
   * @param {number} positionY - The Y position to check
   * @returns {boolean} Whether the position is valid
   */
  function isPositionValid(positionX, positionY) {
    if (positionX < 0 || positionY < 0) {
      return false;
    }
  
    if (positionX >= valMaxX || positionY >= valMaxY) {
      return false;
    }
  
    return true;
  }
  
  /**
   * Determines whether the player can move in a given direction from their current position
   *
   * @param {number} currentPositionX - The current X position of the player
   * @param {number} currentPositionY - The current Y position of the player
   * @param {string} direction - The direction in which the player wants to move
   * @returns {boolean} Whether the player can move in the given direction
   */
  function canMove(currentPositionX, currentPositionY, direction) {
    switch (direction) {
      case MOVEMENT_DIRECTION.LEFT:
        return currentPositionX > 0;
      case MOVEMENT_DIRECTION.RIGHT:
        return currentPositionX < valMaxX - 1;
      case MOVEMENT_DIRECTION.UP:
        return currentPositionY > 0;
      case MOVEMENT_DIRECTION.DOWN:
        return currentPositionY < valMaxY - 1;
      default:
        break;
    }
    return false;
  }
  
/**
 * Returns the tile adjacent to the current position in the specified direction.
 *
 * @param {number} currentPositionX - The current position x-coordinate.
 * @param {number} currentPositionY - The current position y-coordinate.
 * @param {string} direction - The direction to check for the adjacent tile.
 * @returns {object|boolean} - The adjacent tile object or false if no tile is found.
 */
function getAdjacentTile(currentPositionX, currentPositionY, direction) {
    switch (direction) {
      case MOVEMENT_DIRECTION.LEFT:
        return gameMap[currentPositionX - 1][currentPositionY];
      case MOVEMENT_DIRECTION.RIGHT:
        return gameMap[currentPositionX + 1][currentPositionY];
      case MOVEMENT_DIRECTION.UP:
        return gameMap[currentPositionX][currentPositionY - 1];
      case MOVEMENT_DIRECTION.DOWN:
        return gameMap[currentPositionX][currentPositionY + 1];
      default:
        break;
    }
    return false;
  }
  
  /**
   * Returns the tile type object for the given tile.
   *
   * @param {object} tile - The tile to get the type for.
   * @returns {object|null} - The tile type object or null if not found.
   */
  function getTileType(tile) {
    let tileTypeId = tile.tileTypeId;
    for (var tileTypeKey in TILE_TYPE) {
      if (TILE_TYPE[tileTypeKey].id === tileTypeId) {
        return TILE_TYPE[tileTypeKey];
      }
    }
    console.log("Tile type id (" + tileTypeId + ") not found");
    return null;
  }
  
  /**
   * Sets the tile type at the given position to the specified type.
   *
   * @param {number} positionX - The x-coordinate of the tile to set.
   * @param {number} positionY - The y-coordinate of the tile to set.
   * @param {object} tileType - The tile type to set.
   * @returns {boolean} - True if the tile was successfully set, false otherwise.
   */
  function setTileType(positionX, positionY, tileType) {
    if (!isPositionValid(positionX, positionY)) {
      console.log("Tile position (x=" + positionX + ", y=" + positionY + ") not valid");
      return false;
    }
  
    gameMap[positionX][positionY].tileTypeId = tileType.id;
    let tile = gameMap[positionX][positionY];
    notifyTileListener(tile);
    return true;
  }
  
  export {
    generateMap,
    getMap,
    isPositionValid,
    canMove,
    getAdjacentTile,
    getTileType,
    setTileType,
    addTileListener,
    TILE_TYPE,
    MOVEMENT_DIRECTION
  };
  