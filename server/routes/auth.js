const router = require("express").Router();
const {User} = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const authvalidation = require("../utils/auth.validator");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto"); 


router.post("/",async(req,res)=>{
    try{
        console.log(req.body)
        const payload = {
            email : req.body.email,
            password : req.body.password
        }
        const {error} = authvalidation.validate(payload);
        if(error){
            console.log(error)
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if(!user)
            res.status.send(401).send({message:"Invalid email or password"});
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        ); 
        if(!validPassword)
            return res.status(401).send({message: "Invalid email or password"})

        if(!user.verified){
            let token = await Token.findOne({userId: user._id});
            if(!token){
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();
                const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email,"Verify email",url); 
            }
            return res.status(400).send({message: "An email sent to your account"});
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged in successfully"})
    }
    catch(error){
        res.status(500).send({message: "Internal server error"})
    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required.label("Password")
    });
    return schema.validate(data);
}

module.exports = router;