import * as map_module from "./map.js";
import player from "./player.js";

let game_map = [];
function initialize(player_listner,tile_listner,map_width, map_height){
    game_map = map_module.generate_map(map_width,map_height);
    map_module.addTileListner(tile_listner)
    player.add_listner(player_listner);
    //place player on the starting tile
    player.move_to(0,0,0);
    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    map_module.set_tile_type(position_x, position_y, map_module.TILE_TYPE.NORMAL);
}


function update_player_score(score){
    player.update_score(score);
}

function move_player(direction){
    if(player.is_energy_points_zero()){
        return false;
    }
    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    if (!map_module.can_move(position_x, position_y, direction)){
        return false;
    }
    let destinationTile = map_module.get_adjacent_tile(position_x,position_y,direction);
    console.log(destinationTile)
    // if the destination tile is trap it costs 1 energy
    let energy_points_cost = 0;
    if(destinationTile.tileTypeId === map_module.TILE_TYPE.TRAP.id){
        energy_points_cost = 1;
    }
    //move the player to the destination tile
    let is_player_moved = player.move_to(destinationTile.position_x,destinationTile.position_y,energy_points_cost);
    if(!is_player_moved){
        return false;
    }
    //update the player score according to the tile type he is on
    let tile_type = map_module.get_tile_type(destinationTile);
    update_player_score(tile_type.score);
    // Transform the tile that the player went one to a normal tile
    map_module.set_tile_type(destinationTile.position_x,destinationTile.position_y, map_module.TILE_TYPE.NORMAL);

}


export {
    move_player,
}
export {initialize}
export {get_map, MOVEMENT_DIRECTION} from "./map.js"