const service = require('../services').action;

const createAction = async (ctx) => {
    const action = await service.createAction(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 201;
    ctx.body = {action: action};
};

const searchAction = async (ctx) => {
    const actions = await service.searchAction(ctx.request.query, ctx.session.passport.user._id);

    ctx.status = 200;
    ctx.body = {actions: actions};
};

const deactivateAction = async (ctx) => {
    await service.deactivateAction(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 200;
};


module.exports = {
    createAction,
    searchAction,
    deactivateAction
};
