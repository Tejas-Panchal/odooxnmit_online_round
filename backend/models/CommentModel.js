import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null, // null indicates a top-level comment
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
