// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Route Functions
module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => {
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // Get a Single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .then(async (thought) => {
      !thought
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // Create a New Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "Failed to create new thought" });
        }

        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: [thought._id] } },
          { new: true }
        ).then((user) => {
          if (!user) {
            return res.status(404).json({ message: "No User with that ID "});
          }

          res.status(201).json({
            message: "New thought created and associated with user.",
            thought,
            user,
          });
        });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { ...req.body },
      {new: true}
    )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'No THOUGHT exists with this ID'})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findByIdAndRemove(
      { _id: req.params.thoughtId }

    ).then((thought) => {
      if (!thought) { res.status(404).json({  message: 'No THOUGHT exists with this ID' })}
      console.log(thought);
      User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );

    }).then(() => {res.json({ message: "THOUGHT was deleted and unreferenced from the USER"});

    }).catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Add a Reaction to a Thought
  createReaction(req, res) {
    User.findOne(
      { _id: req.body.userId }
      
    ).then((user) => {
      if (!user) { res.status(404).json({ message: 'No THOUGHT exists with this ID' })};

      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        { $push: { 
          reactions: {
            reactionBody: req.body.reactionBody,
            username: user.username,
          },
        }},
        { new: true }
      ).then((thought) => {
        !thought
          ? res.status(404).json({ message: "No THOUGHT exists with this ID"})
          : res.status(200).json({ message: "New REACTION Created", thought })
      });
    }).catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }

    ).then((thought) => {
      !thought
       ? res.status(404).json({ message: "No THOUGHT exists with this ID"})
       : res.status(201).json({ message: "REACTION was deleted", thought });
    }).catch((err) => res.status(500).json(err));
  },
};