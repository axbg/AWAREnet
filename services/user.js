const {UserModel} = require('../models');

const getExistingUser = async (email, password) => {
    const user = await UserModel.findOne({email: email});

    if (user) {
        return await user.comparePassword(password) ? user.id : "wrong";
    } else {
        return false;
    }
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

module.exports = {
    getExistingUser,
    createUser,
    getOrCreateUser,
};
