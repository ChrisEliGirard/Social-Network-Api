// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Route Functions
module.exports = {
  // Get all Users
  getUsers(req, res) {
    User.find()
    .then((users) => {
      const userObj = {
        users,
      };
      return res.json(userObj)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // Get a Single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts")
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No USER exists with that ID'})
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a New User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { ...req.body },
      {new: true}

    ).then((user) => {
      !user
        ? res.status(404).json({ message: 'No USER exists with this ID'})
        : res.json(user);

    }).catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove their thoughts
  deleteUser(req, res) {
    User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      !user
        ? res.status(404).json({ message: "No USER exists with this ID"})
        : Thought.deleteMany({ username: user.username });

    }).then(() => {res.json({ message: "USER and their associated THOUGHTS deleted"})
  
    }).catch((err) => {res.status(500).json(err)});
  },

  // Add a Reaction to a Thought
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: {friends: req.params.friendId } },
      { new: true }
        
    ).then((user) => {
      !user
        ? res.status(404).json({ message: "No USER exists with this ID"})
        : res.status(200).json({ message: "FRIEND was Added", user });

    }).catch((err) => res.status(500).json(err));
  },
  
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
  
    ).then((user) => {
      !user
        ? res.status(404).json({ message: "No USER exists with this ID"})
        : res.status(200).json({ message: "Friend was deleted", user });
    }).catch((err) => res.status(500).json(err));
  },
}