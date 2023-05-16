const {body, validationResult} = require('express-validator');
const User  = require('../models/UserDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { response } = require('express');
// const axios = require('axios');
// const { response } = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');



const createToken = (user)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: '7d'
    });
};

module.exports.registerValidation = [
    body('name').not().trim().isEmpty().withMessage("Name is Required"),
    body('email').not().trim().isEmpty().withMessage("Email is Required"),
    body('password').isLength({min: 6}).withMessage("Password should be 6 char long")
];

module.exports.register = async (req, res)=>{
    const {name, email, password} = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const checkUser = await User.findOne({email})
        if (checkUser) {
            return res.status(400).json({errors: [{msg: 'Email already taken'}]});
        }
        // Hash and Salt for securing password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        try {
            const user = await User.create({
                name,
                email,
                password: hash
            });
            const token = createToken(user);
            return res.status(200).json({msg: 'Your account has been created', token: token});
        } catch (error) {
            return res.status(500).json({errors: error});
        }
    } catch (error) {
        return res.status(500).json({errors: error});
    }
}

module.exports.loginValidation = [
    body('email').not().trim().isEmpty().withMessage("Email is Required"),
    body('password').not().trim().isEmpty().withMessage("Password is Required"),
];

module.exports.login = async (req, res)=> {
    const {email, password} = req.body;
    const errors = validationResult(req);

    let number = parseInt(email);

    let first_two = Math.floor(number / 10000000);
    let year = 2000 + first_two;

    let third_digit = Math.floor(number / 1000000) % 10;
    let session = "";
    if (third_digit === 2) {
        session = "Spring";
    } else if (third_digit === 1) {
        session = "Fall";
    } else {
        session = "Invalid";
    }

    const d = new Date();
    let completed_year = d.getFullYear() -1;
    let semester = (completed_year-year)*2;
    if (session === "Spring"){
        semester += 1;
    }
    let current_semester = semester+1;
    if (current_semester > 8){
        current_semester = 8;
    }

    let fourth_to_sixth = Math.floor(number / 1000) % 1000;
    let department = "";
    if (fourth_to_sixth === 370) {
        department = "Computer Science";
    } else if (fourth_to_sixth === 400) {
        department = "Software Engineering";
    } else if (fourth_to_sixth === 360) {
        department = "BBA";
    }
    else if (fourth_to_sixth === 670) {
        department = "English";
    }else {
        department = "Others";
    }

    let id = number;
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const user = await User.findOne({email})
        if (user) {
            const matched = await bcrypt.compare(password, user.password);
            if (matched) {
                await User.updateOne({email: email}, {$set: {currentSemester: current_semester}})
                const token = createToken(user);
                return res.status(200).json({msg: 'Login Successfully', token: token});
            }else{
                return res.status(401).json({errors: [{msg: 'Incorrect Password'}]});
            }
        }else{
            return res.status(404).json({errors: [{msg: 'Email not Found'}]});
        }
    }catch(error){
        return res.status(500).json({errors: error});
    }
};

module.exports.google = async (req, res) => {
    const {name, email, googleId, imageUrl} = req.body;

    let number = parseInt(email);

    let first_two = Math.floor(number / 10000000);
    let year = 2000 + first_two;

    let third_digit = Math.floor(number / 1000000) % 10;
    let session = "";
    if (third_digit === 2) {
        session = "Spring";
    } else if (third_digit === 1) {
        session = "Fall";
    } else {
        session = "Invalid";
    }

    const d = new Date();
    let completed_year = d.getFullYear() -1;
    let semester = (completed_year-year)*2;
    if (session === "Spring"){
        semester += 1;
    }
    let current_semester = semester+1;
    if (current_semester > 8){
        current_semester = 8;
    }

    let fourth_to_sixth = Math.floor(number / 1000) % 1000;
    let department = "";
    if (fourth_to_sixth === 370) {
        department = "Computer Science";
    } else if (fourth_to_sixth === 400) {
        department = "Software Engineering";
    }else if (fourth_to_sixth === 360) {
        department = "BBA";
    }
    else if (fourth_to_sixth === 670) {
        department = "English";
    } 
    else {
        department = "Others";
    }

    let id = number;

    try {
        const user = await User.findOne({email})
        if (user) {
            await User.updateOne({email: email}, {$set: {currentSemester: current_semester, imageUrl: imageUrl}})
            const token = createToken(user);
            return res.status(200).json({msg: 'Login Successfully', token: token});
        }else{
            try {
                const user = await User.create({
                    name,
                    email,
                    googleId,
                    imageUrl,
                    profileImg: 'user.png',
                    userID: id,
                    session: session + ' ' + year,
                    currentSemester: current_semester,
                    department: department
                });
                const token = createToken(user);
                return res.status(200).json({msg: 'Your account has been created', token: token});
            } catch (error) {
                return res.status(500).json({errors: error});
            }
        }
    }catch(error){
        return res.status(500).json({errors: error});
    }
}

module.exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ error: 'Email does not exist.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpHash = await bcrypt.hash(String(otp), 10); // hash the OTP using bcrypt
        const resetPasswordExpires = Date.now() + 62 * 1000; // 1 min

        await User.updateMany({ email }, { $set: { otpHash: otpHash, resetPasswordExpires: resetPasswordExpires } });

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              host: 'smtp.gmail.com',
              port: 465,
              secure: true, // use SSL
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                text:
                  'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                  + 'Please copy the OTP code, or paste this into your browser to complete the process:\n\n'
                  + `Your OTP Code is: SV-${otp}\n\n`
                  + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
              };
        
              transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.error('there was an error: ', err);
                  return res.status(500).json({ error: err.message });
                } else {
                  console.log('here is the res: ', response);
                  return res.status(200).json({ message: 'Recovery email sent.' });
                }
              });

    }catch(error){
        return res.status(500).json({errors: error});
    }
};

module.exports.resetPassword = async (req, res) => {
    const {email, otp, password} = req.body;

    try {
        const user = await User.findOne({email})
        if (user) {
            if(user.resetPasswordExpires > Date.now()){
                
                const matched = await bcrypt.compare(otp, user.otpHash);
                if(matched){
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt)
                    await User.updateOne({ email }, { $set: { password: hash} });

                    return res.status(200).json({ message: 'Password Change Successfully!' });
                }else{
                    return res.status(401).json({ message: 'Invalid OTP!' });
                }
            }else{
                return res.status(403).json({ message: 'OTP Timeout!' });
            }
        }
    }catch(error){
        return res.status(500).json({errors: error});
    }
};

module.exports.changePassword = async (req, res) => {
    const {email, oldPassword, password} = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({email})
        if (user) {                
            if (user.password) {
                const matched = await bcrypt.compare(oldPassword, user.password);
                if(matched){
                    console.log('yes');
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt)
                    await User.updateOne({ email }, { $set: { password: hash} });

                    return res.status(200).json({ message: 'Password Change Successfully!' });
                }else{
                    console.log('no');
                    return res.status(401).json({ message: 'Incorrect Old Password' });
                }
            } else {
                return res.status(401).json({ message: 'You don\'t have any password' });
            }
        }
    }catch(error){
        return res.status(500).json({errors: error});
    }
};

module.exports.educationDetail = async (req, res) => {
    const { id } = req.params;
    const {qualification, program, university, from, to} = req.body;

    try {
        const user = await User.findById(id);
        user.education.push({qualification, program, university, from, to});
        const response = await user.save();
        return res.status(200).json({msg: "Education detail has been successfully saved!", response});

    } catch (errors) {
        return res.status(500).json({error: errors, msg: errors});
    }
}

module.exports.currentUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await User.findById(id);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.deleteEducation = async (req, res) => {
    const { userId, educationId } = req.params;
   
    try {
        const result = await User.updateOne(
       { _id: userId },
       { $pull: { education: { _id: educationId } } }
     );
 
     return res.status(200).json({result});
   } catch (error) {
     return res.status(500).json({errors: error, msg: error.message});
   }
}

module.exports.editAbout = async (req, res) => {
    const { id } = req.params;
    const { about } = req.body;

    try {
        const response = await User.findByIdAndUpdate(id, {
            about,
        });

        return res.status(200).json({msg: "Your about has been Updated Successfully!", response});

    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.jobDetail = async (req, res) => {
    const { id } = req.params;
    const { jobTitle, company, experience, avalability } = req.body;

    try {
        const user = await User.findById(id);
        user.job.push({jobTitle, company, experience, avalability});
        const response = await user.save();
        return res.status(200).json({msg: "Job detail has been successfully saved!", response});

    } catch (errors) {
        return res.status(500).json({error: errors, msg: errors});
    }
}

module.exports.deleteJob = async (req, res) => {
    const { userId, jobId } = req.params;
   
    try {
        const result = await User.updateOne(
       { _id: userId },
       { $pull: { job: { _id: jobId } } }
     );
 
     return res.status(200).json({result});
   } catch (error) {
     return res.status(500).json({errors: error, msg: error.message});
   }
}

module.exports.searchUser = async (req, res) => {
    const { query } = req.query;

    const filteredUsers = await User.find({
      name: { $regex: query, $options: 'i' },
    }).limit(5);
    
    return res.json(filteredUsers);
}















// module.exports.google = async (req, res) => {
//     const {googleAccessToken} = req.body;

//     axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//         headers:{
//             "Authorization": `Bearer ${req.body.googleAccessToken}`
//         }
//     }).then(async response =>{
//         const email = response.data.email;

//         const alreadyExistUser = await User.findOne({email});
//         if (!alreadyExistUser) {
//             return res.status(400).json({msg: 'User doesn\'t exist!'})
//         }
//     });

//     passport.use(new GoogleStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: process.env.REDIRCT_PATH,
//         scope: [ 'profile' ],
//         state: true
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   ));
// };