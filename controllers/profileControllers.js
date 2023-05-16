const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const User  = require('../models/UserDB');
// const {body, validationResult} = require('express-validator');
// const { error } = require('console');
const jwt = require('jsonwebtoken');

const createToken = (user)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: '7d'
    });
};

module.exports.updateProfileImage = async (req, res)=>{
    const form = formidable({ multiples: true });
    const errors = [];

    form.parse(req, (err, fields, files) => {
        const {id} = fields;

        if (Object.keys(files).length === 0) {
            errors.push({msg: 'Image required'});
        }else{
            const { mimetype } = files.image;
            const splitImage = mimetype.split('/');
            const extension = splitImage[1].toLowerCase();

            if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
                errors.push({msg: `${extension} is not a valid extention`});
            }else{
                files.image.name = uuidv4() + '.' + extension;
            }
        }

        if (errors.length !== 0) {
            return res.status(400).json({errors})
        }else{
            const newPath = __dirname + `/../student_voice_react/build/profile/${files.image.name}`;

            fs.copyFile(files.image.filepath, newPath, async (err) => {
                if(!err){
                    try {
                        const response = await User.findByIdAndUpdate(id, {
                            profileImg: files.image.name,
                        });
                        const user = await User.findOne({_id: id})
                        const token = createToken(user);
                        return res.status(200).json({msg: "Profile image updated Successfully", response, token});
                    } catch (error) {
                        return res.status(500).json({errors: error, msg: error.message});
                    }
                }
            });
        }
    });
}