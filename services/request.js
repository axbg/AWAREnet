const {RequestModel, ActionModel, EventModel, UserModel} = require('../models');
const {throwError} = require("../types/error");
const {getUserType} = require("./user");
const {USER_TYPE} = require("../types/userType");
const moment = require("moment");

const createRequest = async(body, userId) => {
    const userType = await getUserType(userId);
    const action = await ActionModel.findOne({_id: body.action});
    const event = await EventModel.findOne({_id: body.event});

    if(!event) {
        throwError("The event that you've chosen does not exist");
    }

    if(userType === USER_TYPE.NGO) {
        if(event.owner !== userId) {
            throwError("You are not the owner of the event!");
        }

        if(!action) {
            throwError("Action does not exist", 400);
        }
    }

    if(userType !== USER_TYPE.NGO && userType !== USER_TYPE.COMPANY) {
        throwError("Only NGOs and Companies can create requests for actions", 400);
    }

    return (await RequestModel.create(
        {
            event: body.event,
            action: body.action,
            owner: userId,
            partner: action ? action.owner : event ? event.owner : null,
            description: body.description,
            response: null,
            active: true,
            timestampCreated: moment().utc().valueOf()
        }
    )).id;
}

const searchRequest = async(body, userId) => {
    const userType = await getUserType(userId);

    if(userType !== USER_TYPE.COMPANY && userType !== USER_TYPE.NGO) {
        throwError("Only NGOs and Companies can see the registered requests", 401);
    }

    let query = {
        "$and": []
    };

    if(body.event) {
        query['$and'].push({event: body.event});
    }

    if(body.action) {
        query['$and'].push({action: body.action});
    }

    if(body.owner) {
        query['$and'].push({owner: body.owner});
    }

    if(body.partner) {
        query['$and'].push({partner: body.partner});
    }

    if(body.active !== undefined) {
        if(body.active === "true") {
            query['$and'].push({active: true});
        } else {
            query['$and'].push({active: false});
        }
    }

    // order by
    let sort = {};
    let sortField = "timestampCreated";

    if(body.order === 'ASC') {
        sort[sortField] = 1;
    } else {
        sort[sortField] = -1;
    }

    const requests = query["$and"].length !== 0 ? await RequestModel.find(query).sort(sort)
        : await RequestModel.find().sort(sort);

    const completeRequests = [];
    for(let i = 0; i < requests.length; i++) {
        completeRequests.push({
            event: await EventModel.findOne({_id: requests[i]["event"]}),
            actionData: await ActionModel.findOne({_id: requests[i]["action"]}),
            ownerData: await UserModel.findOne({_id: requests[i]["owner"]}),
            partnerData: await UserModel.findOne({_id: requests[i]["partner"]}),
            description: requests[i]["description"],
            response: requests[i]["response"],
            active: requests[i]["active"]
        })
    }

    return completeRequests;
}

const deactivateRequest = async(body, userId) => {
    const request = await RequestModel.findOne({_id: body.id, owner: userId});

    if(request) {
        request.active = !request.active;
        await request.save();
    }
}

const respondToRequest = async(body, userId) => {
    const request = await RequestModel.findOne({_id: body.id, owner: userId});

    if(request) {
        request.response = body.response === "true";
        await request.save();
    }
}

module.exports = {
    createRequest,
    searchRequest,
    deactivateRequest,
    respondToRequest
};
