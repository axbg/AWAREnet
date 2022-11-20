const service = require('../services').event;
const userService = require('../services').user;

const {throwError} = require('../types/error');
const {USER_TYPE} = require("../types/userType");

const createEvent = async (ctx) => {
    const userType = await userService.getUserType(ctx.session.passport.user._id);

    if(userType === USER_TYPE.NGO) {
        ctx.request.body.title || throwError('Missing parameter: title', 400);
        ctx.request.body.shortDescription || throwError('Missing parameter: shortDescription', 400);
        ctx.request.body.description || throwError('Missing parameter: description', 400);
        ctx.request.body.timestampStart || throwError('Missing parameter: timestampStart', 400);
        ctx.request.body.location || throwError('Missing parameter: location', 400);
        ctx.request.body.action || throwError('Missing parameter: action', 400);
        ctx.request.body.type || throwError('Missing parameter: type', 400);
        ctx.request.body.pictures || throwError('Missing parameter: pictures', 400);

        const eventId = await service.createEvent(ctx.request.body, ctx.session.passport.user._id);

        ctx.status = 201;
        ctx.body = {message: eventId}
    } else {
        ctx.status = 401;
    }
};

const deleteEvent = async (ctx) => {
    await service.deleteEvent(ctx.request.query.id, ctx.session.passport.user._id);

    ctx.status = 200;
};

const searchEvents = async (ctx) => {
    const events = await service.searchEvents(ctx.request.query, ctx.session.passport.user._id);

    ctx.status = 200;
    ctx.body = {events: events};
};

const addFollowUp = async (ctx) => {
    await service.addFollowUp(ctx.request.body, ctx.session.passport.user._id)

    ctx.status = 200;
};

const join = async (ctx) => {
    await service.join(ctx.request.body.id, ctx.session.passport.user._id);

    ctx.status = 200;
};

const rate = async (ctx) => {
    await service.rate(ctx.request.body, ctx.session.passport.user._id);

    ctx.status = 200;
};


module.exports = {
    createEvent,
    deleteEvent,
    searchEvents,
    addFollowUp,
    join,
    rate
};
