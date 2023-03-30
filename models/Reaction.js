const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get() {
        return {
          formattedDate: new Date(this).toLocaleString('en-US')
      }},
    },
  },
  {
    toJson: { getters: true}
  }
);
module.exports = reactionSchema;