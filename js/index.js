import * as MAIN_MODULE from "./main.js";
const mapElement = document.getElementById('map');
let progressBar = document.querySelector('.progress-bar');
let progressBarLabel = document.getElementById('progress-bar-label');
let scoreLabel = document.getElementById('score-value');

let MAP_WIDTH = 25;
let MAP_HEIGHT = 15;

MAIN_MODULE.initialize(on_player_updated,on_tile_updated,MAP_WIDTH,MAP_HEIGHT);
let game_map = MAIN_MODULE.get_map()
generateMap();

function update_progress_bar(currentEnergy,maxEnergy){
    let progressPercentage = Math.round(currentEnergy / maxEnergy * 100); // calculate the progress percentage
    progressBar.style.width = progressPercentage + '%'; // update the progress bar width
    progressBar.setAttribute('aria-valuenow', progressPercentage); // update the progress bar value
    progressBarLabel.innerHTML = currentEnergy + '/' + maxEnergy; // update the progress bar label

}

function update_score(score){
    scoreLabel.innerHTML = '' + score; // update the progress bar label
}

function on_player_updated(player){

    update_progress_bar(player.energy_points, player.MAX_ENERGY_POINTS);
    update_score(player.score);
    let playerElement = document.getElementById('player');
    if(playerElement === null){
        return;
    }
    playerElement.style.left = player.position_x * 40 + 'px';
    playerElement.style.top = player.position_y * 40 + 'px';
    console.log("Score: "+ player.score + " Energy: "+ player.energy_points)
    if(player.is_energy_points_zero()){
        console.log("Game Over")
    }

}

function on_tile_updated(tile){
        let tileElement = document.getElementById(generate_tile_view_id(tile));
        if(tileElement === null){
            console.log("tile element"+ generate_tile_view_id(tile) +" not found");
            return;
        }
        tileElement.dataset.type = tile.tileTypeId;
        if(tile.tileTypeId ===0){
            tileElement.className = 'normal';
        } else 
        if(tile.tileTypeId ===1){
            tileElement.className = 'treasure';
        }else if(tile.tileTypeId ===2){
            tileElement.className = 'trap'
        }
        tileElement.className += ' cell';   
}

function generateMap(){
        // Clear the map element
        mapElement.innerHTML = '';
        let playerElement = document.createElement('div');
        playerElement.id = 'player';
        mapElement.appendChild(playerElement);
        
        // Loop through the map cells and create elements for each one
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y++) {
                // Get the tile type for this cell
                let tile = game_map[x][y];
                // Create a new element for this cell
                let tileElement = document.createElement('div');
                if(tile.tileTypeId ===0){
                    tileElement.className += 'normal';
                } else 
                if(tile.tileTypeId ===1){
                    tileElement.className += 'treasure';
                }else if(tile.tileTypeId ===2){
                    tileElement.className = 'trap'
                }
                tileElement.className += ' cell';
                tileElement.id = generate_tile_view_id(tile);
                tileElement.dataset.type = tile.tileTypeId;
    
                // Add the element to the map
                mapElement.appendChild(tileElement);
            }
        }

}

function generate_tile_view_id(tile){
    return "tile-positionX-"+tile.position_x+"-positionY-"+tile.position_y;
}


document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowLeft") {
      // Move player to the left
      MAIN_MODULE.move_player(MAIN_MODULE.MOVEMENT_DIRECTION.LEFT);
    } else if (event.code === "ArrowRight") {
      // Move player to the right
      MAIN_MODULE.move_player(MAIN_MODULE.MOVEMENT_DIRECTION.RIGHT);
    } else if (event.code === "ArrowUp") {
      // Move player up
      MAIN_MODULE.move_player(MAIN_MODULE.MOVEMENT_DIRECTION.UP);
    } else if (event.code === "ArrowDown") {
      // Move player down
      MAIN_MODULE.move_player(MAIN_MODULE.MOVEMENT_DIRECTION.DOWN);
    }
  });

