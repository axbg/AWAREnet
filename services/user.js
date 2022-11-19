const {UserModel} = require('../models');
const {USER_TYPE} = require("../types/userType");

const getExistingUser = async (email, password) => {
    const user = await UserModel.findOne({email: email});

    if (user) {
        return await user.comparePassword(password) ? user.id : "wrong";
    } else {
        return false;
    }
};

const getUsers = async (types, ids) => {
    let query = {
        "$and": []
    };

    if(ids) {
        query['$and'].push({_id: ids.split(",")});
    }

    query['$and'].push(({type: [...types]}));

    return await UserModel.find(query).select(['-password']);
}

const createUser = async (email, password, name, type, preferredLocation) => {
    return (await UserModel.create(
            {
                email: email,
                password: password,
                name: name,
                type: type,
                preferredLocation: preferredLocation
            })
    ).id;
};

const getOrCreateUser = async (profile) => {
    const existingUser = await UserModel.findOne({email: profile.email});

    if (existingUser) {
        return {_id: existingUser._id};
    }

    const newUser = await UserModel.create(profile);
    return {_id: newUser._id};
};

const requestBackgroundCheck = async (userId) => {
    const user = await UserModel.findOne({_id: userId});

    if(user.type === USER_TYPE.COMPANY) {
        user.backgroundCheck = true;
        await user.save();
    }

    return true;
};

module.exports = {
    getExistingUser,
    getUsers,
    createUser,
    getOrCreateUser,
    requestBackgroundCheck
};
