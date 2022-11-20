const {EventModel, UserModel} = require('../models');
const {s3} = require('../configurations/aws');
const {AWS_S3_BUCKET_NAME} = require("../properties");
const {v4: uuidv4} = require('uuid');

const {getUserType, getUser} = require('./user');
const {USER_TYPE} = require("../types/userType");
const {throwError} = require("../types/error");

const moment = require('moment');

const isActiveEvent = (start) => {
    const startTime = parseInt(start);
    const nowTime = moment().utc().valueOf();

    return (startTime - nowTime) > 0;
}

const computeDistance = (coord1, coord2) => {
    return Math.sqrt(Math.pow((coord2.lat - coord1.lat), 2) + Math.pow((coord2.long - coord1.long), 2))
}

const spreadEvent = (event) => {
    return {
        title: event.title,
        shortDescription: event.shortDescription,
        description: event.description,
        location: event.location,
        timestampCreated: event.timestampCreated,
        timestampStart: event.timestampStart,
        action: event.action,
        type: event.type,
        pictures: event.pictures,
        owner: event.owner,
        partners: event.partners,
        participants: event.participants,
        followUp: event.followUp,
        ratings: event.rating
    }
}

const uploadToS3 = async (pictures) => {
    const uploadedPictures = [];

    for (let i = 0; i < pictures.length; i++) {
        const uniqueName = uuidv4();
        const buffer = Buffer.from(pictures[i].replace(/^data:image\/\w+;base64,/, ""), 'base64');

        const uploaded = await s3.upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: uniqueName,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }).promise();

        if (uploaded['Location']) {
            uploadedPictures.push(uploaded['Location']);
        }
    }

    return uploadedPictures;
}

const createEvent = async (body, userId) => {
    const pictures = await uploadToS3(body.pictures);

    return (await EventModel.create({
        title: body.title,
        shortDescription: body.shortDescription,
        description: body.description,
        timestampCreated: moment().utc().valueOf(),
        timestampStart: body.timestampStart,
        location: body.location,
        action: body.action,
        type: body.type,
        pictures: [...pictures],
        owner: userId
    })).id;
}

const deleteEvent = async (id, userId) => {
    return EventModel.findOneAndRemove({_id: id, owner: userId});
}

const searchEvents = async (body, userId) => {
    let query = {
        "$and": []
    };

    if(body.title) {
        query['$and'].push({title: {$regex: body.title}});
    }

    if(body.action) {
        query['$and'].push({action: body.action});
    }

    if(body.type) {
        query['$and'].push({type: body.type});
    }

    if(body.active !== undefined) {
        if(body.active === "true") {
            query['$and'].push({timestampStart: {$gte: moment().utc().valueOf()}});
        } else {
            query['$and'].push({timestampStart: {$lte: moment().utc().valueOf()}});
        }
    }

    const userType = await getUserType(userId);
    if(body.owned) {
        switch (userType) {
            case USER_TYPE.USER:
                query['$and'].push({participants: [userId]});
                break;
            case USER_TYPE.COMPANY:
                query['$and'].push({partners: [userId]});
                break;
            case USER_TYPE.NGO:
                query['$and'].push({owner: userId});
                break;
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

    const events = query["$and"].length !== 0 ? await EventModel.find(query).sort(sort) : await EventModel.find().sort(sort);

    let orderedEvents;
    if(userType === USER_TYPE.USER) {
        if(body.location) {
            orderedEvents = events.map(element => ({...spreadEvent(element), distance: computeDistance(element.location[0], body.location)}));
        } else {
            const user = await getUser(userId);
            orderedEvents = events.map(element => ({...spreadEvent(element), distance: computeDistance(element.location[0], user.preferredLocation)}));
        }

        orderedEvents.sort((a, b) => a.distance - b.distance);
    } else {
        orderedEvents = events.map(element => ({...spreadEvent(element)}));
    }

    for(let i = 0; i < orderedEvents.length; i++) {
        orderedEvents[i]['partners'] = await UserModel.find({_id: orderedEvents[i]['partners']}).select(["-password"]);
        orderedEvents[i]['owner'] = await UserModel.findOne({_id: orderedEvents[i]['owner']}).select(["-password"]);
    }

    return orderedEvents;
}

const addFollowUp = async (body, userId) => {
    const event = await EventModel.findOne({_id: body.id, owner: userId});

    if (event) {
        event.followUp = {description: body.followUp.description, pictures: await uploadToS3(body.followUp.pictures)};
        await event.save();
    }
}

const join = async (id, userId) => {
    const userType = await getUserType(userId);

    if (userType !== USER_TYPE.USER) {
        throwError("Can't join events as a " + userType, 401);
    }

    const event = await EventModel.findOne({_id: id});

    if(!isActiveEvent(event.timestampStart)) {
        throwError("Can't join an even that has already passed", 400);
    }

    if(event.followUp.description) {
        throwError("Can't join an even that already has a follow up", 400);
    }

    const index = event.participants.indexOf(userId);

    if (index !== -1) {
        event.participants.splice(index, 1);
    } else {
        event.participants.push(userId);
    }

    await event.save();
}

const rate = async (body, userId) => {
    const userType = await getUserType(userId);
    const event = await EventModel.findOne({_id: body.id});

    if (userType !== USER_TYPE.USER) {
        throwError("Can't rate events as a " + userType, 401);
    }

    if (!event.participants.includes(userId)) {
        throwError("Can't rate an event that you didn't join", 400)
    }

    if (isActiveEvent(event.timestampStart)) {
        throwError("Can't rate an event that didn't happen yet", 400)
    }

    if (!event.followUp || !event.followUp.description) {
        throwError("Can't rate an event that does not have a follow-up", 401);
    }

    if(event.ratings.find(rating => rating.userId === userId)) {
        throwError("You've already rated this event", 401);
    }

    event.ratings.push({userId: userId, rating: body.rating, comment: body.comment});

    await event.save();
}

module.exports = {
    uploadToS3,
    createEvent,
    deleteEvent,
    searchEvents,
    addFollowUp,
    join,
    rate
};
