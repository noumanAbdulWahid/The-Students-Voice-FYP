const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    profileImg: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    googleId:{
        type: String,
        required: false
    },
    otpHash:{
        type: String
    },
    resetPasswordExpires:{
        type: String
    },
    userID: {
        type: String,
        required: false
    },
    session: {
        type: String,
        required: false
    },
    currentSemester: {
        type: String,
        required: false
    },
    department:{
        type: String,
        required: false
    },
    about:{
      type: String,
      required: false,
      default: ''
    },
    education: [
        {
          qualification: { 
            type: String, 
            required: false
          },
          program: {
            type: String,
            required: false
          },
          university: {
            type: String,
            required: false
          },
          from: { 
            type: Date, 
            default: Date.now 
          },
          to: { 
            type: Date, 
            default: Date.now 
          },
          create: { 
            type: Date, 
            default: Date.now 
          },
        }
      ],
      job: [
        {
          jobTitle: { 
            type: String, 
            required: false
          },
          company: {
            type: String,
            required: false
          },
          experience: {
            type: String,
            required: false
          },
          avalability: { 
            type: String,
            required: false
          },
          create: { 
            type: Date, 
            default: Date.now 
          },
        }
      ],
    
},
{timestamps: true}
);
module.exports = model('user', userSchema);