const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fcmtoken: {
        type: String,
        default: ''
    },
    isverified: {
        type: Boolean,
        default: false
    },
    pic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    latestNotif: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notifications",
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('users', UserSchema);

