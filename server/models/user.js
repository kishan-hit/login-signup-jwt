const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    verified: 
    {
        type: Boolean, 
        default: false
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
};

const User = mongoose.model("user",userSchema);

// const validate = (data) => {
//     const schema = Joi.object.keys({
//         firstName: Joi.string().required(),
//         lastName: Joi.String().required(),
//         email: Joi.string().email().required(),
//         password: passwordComplexity().required()
//     });
//     console.log(schema)
//     return schema.validate(data)
// };

module.exports = {User};
