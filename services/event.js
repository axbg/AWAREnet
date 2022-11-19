const {EventModel} = require('../models');
const {s3} = require('../configurations/aws');
const {AWS_S3_BUCKET_NAME} = require("../properties");
const {v4: uuidv4} = require('uuid');

const createEvent = async (body, userId) => {
    const pictures = [];

    for(let i = 0; i < body.pictures.length; i++) {
        const uniqueName = uuidv4();
        const buffer = Buffer.from(body.pictures[i].replace(/^data:image\/\w+;base64,/, ""),'base64');

        const uploaded = await s3.upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: uniqueName,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }).promise();

        if(uploaded['Location']) {
            pictures.push(uploaded['Location']);
        }
    }

    return (await EventModel.create({
        title: body.title,
        shortDescription: body.shortDescription,
        description: body.description,
        timestampStart: body.timestampStart,
        location: body.location,
        action: body.action,
        type: body.type,
        pictures: [...pictures],
        owner: userId
    })).id;
}

const deleteEvent = async (body) => {

}

const searchEvents = async (body) => {

}

const addFollowUp = async (body) => {

}

const join = async (body) => {
    // as a user
}

const rate = async (body) => {

}

module.exports = {
    createEvent,
    deleteEvent,
    searchEvents,
    addFollowUp,
    join,
    rate
};
