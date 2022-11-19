const service = require('../services').event;

const {throwError} = require('../types/error');
const {USER_TYPE} = require("../types/userType");

const add = async (ctx) => {


    ctx.session = {passport: {user: {_id: userId}}};
    ctx.status = 200;
    ctx.body = {message: 'Logged in'};
};


module.exports = {
    add
};
