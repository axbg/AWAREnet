const {UserModel} = require('../models');
const {USER_TYPE} = require("../types/userType");

const getUser = async(userId) => {
    return await UserModel.findOne({_id: userId});
}

const getExistingUser = async (email, password) => {
    const user = await UserModel.findOne({email: email});

    if (user) {
        return await user.comparePassword(password) ? {id: user._id, type: user.type} : "wrong";
    } else {
        return false;
    }
};

const getUserType = async(userId) => {
    return (await UserModel.findOne({_id: userId})).type;
}

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
    const user = await UserModel.create(
            {
                email: email,
                password: password,
                name: name,
                type: type,
                preferredLocation: preferredLocation
            });

    return {id: user._id, type: user.type}
};

const requestBackgroundCheck = async (userId) => {
    const user = await UserModel.findOne({_id: userId});

    if(user.type === USER_TYPE.COMPANY) {
        user.requestBackgroundCheck = true;
        user.backgroundCheck = true;
        await user.save();
    }

    return true;
};

module.exports = {
    getUser,
    getExistingUser,
    getUsers,
    getUserType,
    createUser,
    requestBackgroundCheck
};
