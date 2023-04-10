import "./map.js" as map_module;
import "./player.js" as player_module;


function on_key_pressed(event){
    position_x = player_module.get_postion_x();
    position_y = player_module.get_postion_y();

    if (map_module.can_go_left()){
        player_module.move_to_lef();
    }
}