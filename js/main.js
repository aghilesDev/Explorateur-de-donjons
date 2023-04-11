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


function update_player_points(){
    let player_position_x = player.get_position_x();
    let player_position_y = player.get_position_y();
    let tile_type = map_module.get_tile_type(player_position_x,player_position_y);
    player.update_score(tile_type.points);
}

function move_player_to_left(){
    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    if (!map_module.can_go_left(position_x,position_y)){
        return false;
    }
    player.move_to_left();
    update_player_points()
    // Transform the tile that the player went one to a normal tile
    position_x = player.get_position_x();
    position_y = player.get_position_y();
    map_module.set_tile_type(position_x, position_y, map_module.TILE_TYPE.NORMAL);

}

function move_player_to_right(){
    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    if (!map_module.can_go_right(position_x,position_y)){
        return false;
    }
    player.move_to_right();
    update_player_points()
    // Transform the tile that the player went one to a normal tile
    position_x = player.get_position_x();
    position_y = player.get_position_y();
    map_module.set_tile_type(position_x, position_y, map_module.TILE_TYPE.NORMAL);
    return true;
}

function move_player_to_up(){

    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    if (!map_module.can_go_up(position_x,position_y)){
        return false;
    }
    player.move_to_up();
    update_player_points()
    // Transform the tile that the player went one to a normal tile
    position_x = player.get_position_x();
    position_y = player.get_position_y();
    map_module.set_tile_type(position_x, position_y, map_module.TILE_TYPE.NORMAL);
    return true;
}

function move_player_to_down(){

    let position_x = player.get_position_x();
    let position_y = player.get_position_y();
    if (!map_module.can_go_down(position_x,position_y)){
        return false;
    }
    player.move_to_down();
    update_player_points()
    // Transform the tile that the player went one to a normal tile
    position_x = player.get_position_x();
    position_y = player.get_position_y();
    map_module.set_tile_type(position_x, position_y, map_module.TILE_TYPE.NORMAL);
    return true;
}

export {
    move_player_to_left,
    move_player_to_right,
    move_player_to_up,
    move_player_to_down,
}
export {initialize}
export {get_map} from "./map.js"