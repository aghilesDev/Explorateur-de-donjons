CASE_TYPE = {
    NORMAL: {
        id:0,
        points: -10
    },
    TREASURE:{
        id:1,
        points: -10
    },
    TRAP:{
        id:2,
        points: -10
    }
}
// variables
val_max_x = 0;
val_max_y = 0;

function generate_map(max_x, max_y,case_type_number) {
    val_max_x = max_x;
    val_max_y = max_y;
    return [[0]];
}

function is_position_valide(position_x, position_y){
    if(posittion_x < 0 || posittion_y < 0){
        return false;
    }

    if(posittion_x >= val_max_x || posittion_y >= val_max_y){
        return false;
    }

    return true;
}

function can_go_left(current_position_x, current_position_y) {
    return false;
}

function can_go_right(current_position_x, current_position_y) {
    return false;
}

function can_go_up(current_position_x, current_position_y) {
    return false;
}

function can_go_down(current_position_x, current_position_y) {
    return false;
}

function get_case_type(position_x, position_y){
    return 0
}

function set_case_type(position_x, position_y, case_type){
    return false;
}