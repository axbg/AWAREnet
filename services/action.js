const {UserModel} = require('../models');

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

const createEvent = async() => {

}

module.exports = {
    createEvent
};
