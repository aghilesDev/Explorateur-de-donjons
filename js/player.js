//variables
val_position_x = 0;
val_position_y = 0;
val_energy_points = 40;

// getters
function get_position_x() {
    return val_position_x;
}

function get_position_y() {
    return val_position_y;
}

function get_energy_points() {
    return val_energy_points;
}

function is_energy_points_zero() {
    return val_energy_points === 0;
}

// moving function
function move_to_left(){
    return move_to(val_position_x - 1 ,val_position_y,1)
}

function move_to_right(){
    return move_to(val_position_x + 1 ,val_position_y,1)
}

function move_to_down(){
    return move_to(val_position_x ,val_position_y - 1,1)
}

function move_to_up(){
    return move_to(val_position_x,val_position_y+ 1 ,1)
}

function move_to(position_x,position_y, energy_points_cost){
    if(energy_points_cost > val_energy_points) {
        return false;
    }
    val_energy_points -= energy_points_cost;
    val_position_x = position_x;
    val_position_y = position_y;
    return true;
}