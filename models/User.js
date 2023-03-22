const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const thoughtSchema = require('./Thought');

// Schema to create the User Model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: "Please enter a valid email"
            },
            required: [true, "Email required"],
            set: v => v.toLowerCase(),
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property `friendCount` on the userSchema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;