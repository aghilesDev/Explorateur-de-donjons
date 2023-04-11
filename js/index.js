import * as MAIN_MODULE from "./main.js";
const mapElement = document.getElementById('map');

let MAP_WIDTH = 25;
let MAP_HEIGHT = 15;

MAIN_MODULE.initialize(on_player_updated,on_tile_updated,MAP_WIDTH,MAP_HEIGHT);
let game_map = MAIN_MODULE.get_map()
generateMap();
MAIN_MODULE.move_player_to_right();
MAIN_MODULE.move_player_to_right();
MAIN_MODULE.move_player_to_right();
MAIN_MODULE.move_player_to_down();

MAIN_MODULE.move_player_to_left();
MAIN_MODULE.move_player_to_down();
MAIN_MODULE.move_player_to_up();



function on_player_updated(player){
    let playerElement = document.getElementById('player');
    if(playerElement === null){
        return;
    }
    playerElement.style.left = player.position_x * 20 + 'px';
    playerElement.style.top = player.position_y * 20 + 'px';
    console.log("Score: "+ player.score + " Energy: "+ player.energy_points)

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

function on_key_pressed(){

}
