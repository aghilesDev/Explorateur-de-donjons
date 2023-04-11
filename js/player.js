//variables

export let player = {
    get_position_x,
    get_position_y,
    is_energy_points_zero,
    update_score,
    move_to,
    move_to_left,
    move_to_right,
    move_to_up,
    move_to_down,
    add_listner,
    position_x : 0,
    position_y : 0,
    MAX_ENERGY_POINTS:40,
    energy_points : 40,
    score : 0
}

let player_listners = []

function add_listner(listner){
    if(listner !== null){
        player_listners.push(listner);
    }
}

function notify_player_listner(){
    for( let i=0; i <player_listners.length; i++){
        let listner = player_listners[i];
        listner(player);
    }
}

// getters
function get_position_x() {
    return player.position_x;
}

function get_position_y() {
    return player.position_y;
}

function get_energy_points() {
    return player.energy_points;
}

function is_energy_points_zero() {
    return player.energy_points === 0;
}

// score setter
function update_score(score){
    player.score += score;
    notify_player_listner();
}

// moving function
function move_to_left(){
    
    let is_moved = move_to(player.position_x - 1 ,player.position_y,1);

    return is_moved;
}

function move_to_right(){
    let is_moved = move_to(player.position_x + 1 ,player.position_y,1);

    return is_moved
}

function move_to_down(){
    let is_moved = move_to(player.position_x ,player.position_y + 1,1);
    return is_moved
}

function move_to_up(){
    let is_moved = move_to(player.position_x,player.position_y - 1 ,1);

    return is_moved
}



function move_to(position_x,position_y, energy_points_cost){
    if(energy_points_cost > player.energy_points) {
        return false;
    }
    player.energy_points -= energy_points_cost;
    player.position_x = position_x;
    player.position_y = position_y;
    notify_player_listner();
    return true;
}

export default {
    player,
    get_position_x,
    get_position_y,
    is_energy_points_zero,
    update_score,
    move_to,
    move_to_left,
    move_to_right,
    move_to_up,
    move_to_down,
    add_listner,
};