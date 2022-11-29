const service = require('../services').request;

const createRequest = async (ctx) => {
    const request = await service.createRequest(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 201;
    ctx.body = {request: request};
};

const searchRequest = async (ctx) => {
    const requests = await service.searchRequest(ctx.request.query, ctx.session.passport.user._id);

    ctx.status = 200;
    ctx.body = {requests: requests};
};

const respondToRequest = async(ctx) => {
    await service.respondToRequest(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 200;
}

const deactivateRequest = async (ctx) => {
    await service.deactivateRequest(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 200;
};


module.exports = {
    createRequest,
    searchRequest,
    respondToRequest,
    deactivateRequest
};
