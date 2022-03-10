let jwt = require("jwt-simple");
let moment = require("moment");
let secret = "almacenonly21";

exports.createToken = (user) => {
    let payload = {
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        age: user.age,
        email: user.email,
        role: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber,
        iat: moment().unix(),
    };
    return jwt.encode(payload,secret);
};