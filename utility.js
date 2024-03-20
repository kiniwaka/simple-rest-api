function findUser(id, users){
    for(let i = 0; i < users.users.length; i++){
        if (users.users[i].id == id) return users.users[i];
    }
    return;
}
function findUserIndex(id, users){
    for(let i = 0; i < users.users.length; i++){
        if (users.users[i].id == id) return i;
    }
    return;
}
module.exports = {findUser, findUserIndex};