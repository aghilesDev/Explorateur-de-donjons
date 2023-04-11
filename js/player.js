/**
 * The Player module defines the player object and its properties and functions.
 * @module Player
 */

export let player = {
    getPositionX,
    getPositionY,
    isEnergyPointsZero,
    updateScore,
    moveTo,
    moveToLeft,
    moveToRight,
    moveToUp,
    moveToDown,
    addListener,
    positionX: 0,
    positionY: 0,
    MAX_ENERGY_POINTS: 40,
    energyPoints: 40,
    score: 0
};

let playerListeners = [];

/**
 * Adds a new player listener.
 * @param {function} listener - The listener function.
 */
function addListener(listener) {
    if (listener !== null) {
        playerListeners.push(listener);
    }
}

/**
 * Notifies all player listeners.
 */
function notifyPlayerListeners() {
    for (let i = 0; i < playerListeners.length; i++) {
        let listener = playerListeners[i];
        listener(player);
    }
}

/**
 * Gets the player's X position.
 * @return {number} - The player's X position.
 */
function getPositionX() {
    return player.positionX;
}

/**
 * Gets the player's Y position.
 * @return {number} - The player's Y position.
 */
function getPositionY() {
    return player.positionY;
}

/**
 * Gets the player's energy points.
 * @return {number} - The player's energy points.
 */
function getEnergyPoints() {
    return player.energyPoints;
}

/**
 * Determines if the player's energy points are zero.
 * @return {boolean} - True if the player's energy points are zero, false otherwise.
 */
function isEnergyPointsZero() {
    return player.energyPoints === 0;
}

/**
 * Updates the player's score by adding a given value.
 * @param {number} score - The value to add to the player's score.
 */
function updateScore(score) {
    player.score += score;
    notifyPlayerListeners();
}

/**
 * Moves the player to a given position and updates their energy points.
 * @param {number} positionX - The X position to move the player to.
 * @param {number} positionY - The Y position to move the player to.
 * @param {number} energyPointsCost - The energy points cost of the move.
 * @return {boolean} - True if the player was moved, false otherwise.
 */
function moveTo(positionX, positionY, energyPointsCost) {
    if (energyPointsCost > player.energyPoints) {
        return false;
    }
    player.energyPoints -= energyPointsCost;
    player.positionX = positionX;
    player.positionY = positionY;
    notifyPlayerListeners();
    return true;
}

/**
 * Moves the player to the left.
 * @param {number} energyPointsCost - The energy points cost of the move.
 * @return {boolean} - True if the player was moved, false otherwise.
 */
function moveToLeft(energyPointsCost) {
    let isMoved = moveTo(player.positionX - 1, player.positionY, energyPointsCost);
    return isMoved;
}

/**
 * Moves the player one tile to the right on the game board.
 * @param {number} energyPointsCost - The amount of energy points required to make the move.
 * @returns {boolean} - Returns true if the move is successful, false otherwise.
 */
function moveToRight(energyPointsCost){
    let isMoved = movePlayerTo(player.positionX + 1, player.positionY, energyPointsCost);
    return isMoved;
}

/**
 * Moves the player one tile down on the game board.
 * @param {number} energyPointsCost - The amount of energy points required to make the move.
 * @returns {boolean} - Returns true if the move is successful, false otherwise.
 */
function moveToDown(energyPointsCost){
    let isMoved = movePlayerTo(player.positionX, player.positionY + 1, energyPointsCost);
    return isMoved;
}

/**
 * Moves the player one tile up on the game board.
 * @param {number} energyPointsCost - The amount of energy points required to make the move.
 * @returns {boolean} - Returns true if the move is successful, false otherwise.
 */
function moveToUp(energyPointsCost){
    let isMoved = movePlayerTo(player.positionX, player.positionY - 1, energyPointsCost);
    return isMoved;
}

/**
 * Moves the player to a specific tile on the game board.
 * @param {number} positionX - The x coordinate of the tile to move to.
 * @param {number} positionY - The y coordinate of the tile to move to.
 * @param {number} energyPointsCost - The amount of energy points required to make the move.
 * @returns {boolean} - Returns true if the move is successful, false otherwise.
 */
/*
function movePlayerTo(positionX, positionY, energyPointsCost) {
    if (energyPointsCost > player.energyPoints) {
        return false;
    }
    player.energyPoints -= energyPointsCost;
    player.positionX = positionX;
    player.positionY = positionY;
    notifyPlayerListener();
    return true;
}
*/

export default {
    player,
    getPositionX,
    getPositionY,
    getEnergyPoints,
    isEnergyPointsZero,
    updateScore,
    moveTo,
    moveToRight,
    moveToUp,
    moveToDown,
    addListener,
};
