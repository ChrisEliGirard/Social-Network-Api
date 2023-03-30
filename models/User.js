const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

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
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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