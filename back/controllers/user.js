const service = require('../services').user;

const {throwError} = require('../types/error');
const {USER_TYPE} = require("../types/userType");

const login = async (ctx) => {
    ctx.request.body.email || throwError('Missing parameter: email', 400);
    ctx.request.body.password || throwError('Missing parameter: password', 400);

    let user = await service.getExistingUser(ctx.request.body.email, ctx.request.body.password);

    if (user === "wrong") {
        throwError("Invalid credentials", 400);
    } else if (user === false) {
        ctx.request.body.name || throwError('Missing parameter: name', 400);
        ctx.request.body.type || throwError('Missing parameter: type', 400);

        if (ctx.request.body.type === USER_TYPE.USER) {
            ctx.request.body.preferredLocation || throwError('Missing parameter: preferredLocation', 400);
        }

        user = await service.createUser(ctx.request.body.email, ctx.request.body.password,
            ctx.request.body.name, ctx.request.body.type, ctx.request.body.preferredLocation);
    }

    ctx.session = {passport: {user: {_id: user.id}}};
    ctx.status = 200;
    ctx.body = {message: 'Logged in', id: user.id, type: user.type};
};

const logout = async (ctx) => {
    ctx.session = null;
    ctx.body = {message: 'Logged out'};
};

const getUsers = async (ctx) => {
    ctx.request.query.types = ctx.request.query.types ? ctx.request.query.types.split(",") : [USER_TYPE.NGO, USER_TYPE.COMPANY];

    ctx.status = 200;
    ctx.body = {users: await service.getUsers(ctx.request.query.types, ctx.request.query.ids)};
}

const requestBackgroundCheck = async (ctx) => {
    await service.requestBackgroundCheck(ctx.session.passport.user._id);

    ctx.status = 200;
}

const leaderboard = async (ctx) => {
    const companies = await service.leaderboard();

    ctx.status = 200
    ctx.body = {companies: companies}
}

module.exports = {
    login,
    logout,
    getUsers,
    leaderboard,
    requestBackgroundCheck
};
