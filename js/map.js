let TILE_TYPE = {
    NORMAL: {
        id:0,
        points: -10
    },
    TREASURE:{
        id:1,
        points: 1000
    },
    TRAP:{
        id:2,
        points: -50
    }
}
// variables
let val_max_x = 0;
let val_max_y = 0;
let game_map = [[0]];
let tile_listner = []

function addTileListner(listner){
    if(listner !== null){
        tile_listner.push(listner);
    }
}

function notifyTileListner(tile){
    for( let i=0; i <tile_listner.length; i++){
        let listner = tile_listner[i];
        listner(tile);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function generate_tile(position_x,position_y,tileTypeId){
    return {
        position_x,
        position_y,
        tileTypeId
    };
}

function generate_map(max_x, max_y) {
    
    let max_length = max_x * max_y;
    let tile_types_to_affect = [];
    for(let i =0; i<max_length; i++){
        if (i < max_length/10.00){
            tile_types_to_affect.push(TILE_TYPE.TREASURE.id);
        } else {
            tile_types_to_affect.push(TILE_TYPE.TRAP.id);
        }
    }
    let map_generated = [];
    for(let position_x = 0; position_x < max_x; position_x++){
        map_generated.push([]);
        for(let position_y = 0; position_y < max_y; position_y++){
            let index = getRandomInt(tile_types_to_affect.length);
            let tile_type_id = tile_types_to_affect[index];
            map_generated[position_x].push(generate_tile(position_x,position_y,tile_type_id));
            tile_types_to_affect.splice(index,1);
        }
    }
    val_max_x = max_x;
    val_max_y = max_y;
    game_map = map_generated;
    return map_generated;
}

function get_map(){
    return game_map;
}



function is_position_valide(position_x, position_y){
    if(position_x < 0 || position_y < 0){
        return false;
    }

    if(position_x >= val_max_x || position_y >= val_max_y){
        return false;
    }

    return true;
}

function can_go_left(current_position_x, current_position_y) {
    return current_position_x > 0;
}

function can_go_right(current_position_x, current_position_y) {
    return current_position_x < val_max_x-1;
}

function can_go_up(current_position_x, current_position_y) {
    return current_position_y > 0;
}

function can_go_down(current_position_x, current_position_y) {
    return current_position_y < val_max_y-1;
}

function get_tile_type(position_x, position_y){
    if(!is_position_valide(position_x, position_y)){
        console.log("tile position(x=" + position_x +", y=" +position_y + ") not valid")
        return null;
    }
    let tile_type_id = game_map[position_x][position_y].tileTypeId;
    for (var tile_type_key in TILE_TYPE){
        if(TILE_TYPE[tile_type_key].id === tile_type_id){
            return TILE_TYPE[tile_type_key];
        }
    }
    console.log("tile type id("+ tile_type_id +") not found")
    return null;
}

function set_tile_type(position_x, position_y, tile_type){
    if(!is_position_valide(position_x, position_y)){
        console.log("tile position(x=" + position_x +", y=" +position_y + ") not valid")
        return false;
    }
    
    game_map[position_x][position_y].tileTypeId = tile_type.id
    let tile = game_map[position_x][position_y]
    notifyTileListner(tile)
    return true;
}

export {
    generate_map,
    get_map,
    is_position_valide,
    can_go_left,
    can_go_right,
    can_go_up,
    can_go_down,
    get_tile_type,
    set_tile_type,
    addTileListner,
    TILE_TYPE
};