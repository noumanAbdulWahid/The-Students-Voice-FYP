const {model, Schema} = require('mongoose');

const commentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postId: { 
        type: Schema.Types.ObjectId, 
        ref: 'post',
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},
{timestamps: true}
);
module.exports = model('comment', commentSchema);