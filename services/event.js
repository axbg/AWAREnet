const {EventModel} = require('../models');
const {s3} = require('../configurations/aws');
const {AWS_S3_BUCKET_NAME} = require("../properties");
const {v4: uuidv4} = require('uuid');

const uploadToS3 = async (pictures) => {
    const uploadedPictures = [];

    for(let i = 0; i < pictures.length; i++) {
        const uniqueName = uuidv4();
        const buffer = Buffer.from(pictures[i].replace(/^data:image\/\w+;base64,/, ""),'base64');

        const uploaded = await s3.upload({
            Bucket: AWS_S3_BUCKET_NAME,
            Key: uniqueName,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }).promise();

        if(uploaded['Location']) {
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

const searchEvents = async (body) => {

}

const addFollowUp = async (body, userId) => {
    const event = await EventModel.findOne({_id: body.id, owner: userId});

    if(event) {
        event.followUp = {description: body.followUp.description, pictures: await uploadToS3(body.followUp.pictures)};
        await event.save();
    }
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
