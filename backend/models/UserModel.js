import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Full name of the user
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true,
        get: function() {
            return `${this.firstName} ${this.lastName}`;
        }
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
        default: null
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpExpiry: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['user', 'manager'],
        default: 'user'
    }
}, {
    // Automatically add `createdAt` and `updatedAt` fields
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;