const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 280;
        },
        message: "Thought Text must be a minimum of 1 character and a maximum of 280 characters",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    lastAccessed: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (){
  return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;