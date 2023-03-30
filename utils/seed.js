const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getNames, getThoughts, getReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop Existing Documents
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Initialized Array to hold the data of the Users to be created
  const users = [];

  // Adds 10 Generated User Objects to the Users array
  let namesArray = getNames();
  for (let i = 0; i < 10; i++) {
    const username = namesArray.pop(Math.floor(Math.random() * 100));
    const email = `${username}@gmail.com`;
    const thoughts = [];
    const friends = [];

    users.push({ username, email, thoughts, friends});
  }

  // Add the new Users to the collection
  await User.collection.insertMany(users).catch((err) => {console.log(err)});

  // Add Thought Posts to a new array of Thoughts
  const thoughtPosts = getThoughts();

  // Loop through Thought Posts and create thought Objects to add to the array
  for (let i = 0; i < 10; i++) {
    // Grab a Random User
    let result = await User.aggregate([{ $sample: { size: 1 }}]);
    const user = result[0];
    
    // Create Thought data references
    const thoughtText = thoughtPosts[i];
    const username = user.username;

    // Create the Reaction data references that go in the Thought Object
    const reactionBody = getReaction();
    result = await User.aggregate([
      { $match: { _id: { $ne: user._id } } },
      { $sample: { size: 1 } },
    ]);

    const reactionUser = result[0];

    const reactions = [{
      reactionBody: reactionBody,
      username: reactionUser.username
    }];

    // Create the Thought Object reference
    const thought = { thoughtText, username, reactions };

    // Add the Thought to the Collection
    const publishedThought = await Thought.collection
    .insertOne(thought)
    .catch((err) => {console.log(err)});
    
    const pushUserThought = await User.findOneAndUpdate(
      { _id: user._id },
      { $push: {
        thoughts: [publishedThought.insertedId],
        friends: [reactionUser._id],
      }},
      { new: true },
    );
    console.log(pushUserThought)
  };

  process.exit(0);
})