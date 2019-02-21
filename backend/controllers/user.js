const userService = require('../services/user');

function getUsersWithOrders(req, res){
    return userService.getUsersWithOrders()
        .then(data => res.send(data));
};

function getAllUsers(req, res){
    return userService.getAllUsers()
        .then(data => res.send(data));
};

function getUser(req, res){
    return userService.getUser(req.user.id)
        .then(data => res.send(data));
};

module.exports = {
    getUsersWithOrders,
    getAllUsers,
    getUser
}
