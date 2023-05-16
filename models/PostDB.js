const {model, Schema} = require('mongoose');

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: [
      {
        user: { 
          type: Schema.Types.ObjectId, 
          ref: 'user',
          required: true
        },
        date: { 
          type: Date, 
          default: Date.now 
        }
      }
    ],
    comments: [
      {
        userId: { 
          type: Schema.Types.ObjectId, 
          ref: 'user',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        date: { 
          type: Date, 
          default: Date.now 
        },
      }
    ]

},
{timestamps: true}
);
module.exports = model('post', postSchema);