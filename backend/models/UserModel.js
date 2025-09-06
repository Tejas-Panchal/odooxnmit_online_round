import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Full name of the user
    name: {
        type: String,
        required: true,
        trim: true
    },
    // User's email, must be unique for login
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    // Hashed password for security
    password: {
        type: String,
        required: true
    },
    // Optional: Avatar URL for profile picture
    avatar: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    }
}, {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;