const {ActionModel, EventModel, UserModel} = require('../models');

const {uploadToS3} = require('./event');
const {getUserType} = require("./user");
const {USER_TYPE} = require("../types/userType");
const {throwError} = require("../types/error");
const moment = require("moment");

const createAction = async (body, userId) => {
    const userType = await getUserType(userId);

    if(userType === USER_TYPE.COMPANY) {
        const pictures = await uploadToS3(body.pictures);
        return (await ActionModel.create(
            {
                title: body.title,
                description: body.description,
                pictures: [...pictures],
                active: true,
                timestampCreated: moment().utc().valueOf(),
                owner: userId
            }
        )).id;
    } else {
        throwError("You cannot create an action unless you are a company", 401);
    }
}

const searchAction = async (body, userId) => {
    const userType = await getUserType(userId);

    if(userType !== USER_TYPE.COMPANY && userType !== USER_TYPE.NGO) {
        throwError("Only NGOs and Companies can see the registered actions", 401);
    }

    let query = {
        "$and": []
    };

    if(body.active !== undefined) {
        if(body.active === "true") {
            query['$and'].push({active: true});
        } else {
            query['$and'].push({active: false});
        }
    }

    if(body.ownedBy) {
        query['$and'].push({owner: body.ownedBy});
    }

    if(body.description) {
        query['$and'].push({description: {$regex: body.description}});
    }

    if(body.owned) {
        switch (userType) {
            case USER_TYPE.COMPANY:
                query['$and'].push({owner: userId});
                break;
        }
    }

    let sort = {};
    let sortField = "timestampCreated";

    if(body.order === 'ASC') {
        sort[sortField] = 1;
    } else {
        sort[sortField] = -1;
    }

    const actions = query["$and"].length !== 0 ? await ActionModel.find(query).sort(sort) : await ActionModel.find().sort(sort);

    const completeActions = [];
    for(let i = 0; i < actions.length; i++) {
        completeActions.push({
            _id: actions[i]._id,
            title: actions[i].title,
            description: actions[i].description,
            active: actions[i].active,
            timestampCreated: actions[i].timestampCreated,
            pictures: actions[i].pictures,
            owner: await UserModel.find({_id: actions[i].owner}).select(["-password"])
        });
    }

    return completeActions;
}

const deactivateAction = async (body, userId) => {
    const action = await ActionModel.findOne({_id: body.id, owner: userId});

    if(action) {
        action.active = !action.active;
        await action.save();
    }
}

module.exports = {
    createAction,
    searchAction,
    deactivateAction
};
