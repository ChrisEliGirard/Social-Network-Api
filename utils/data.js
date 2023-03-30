const getNames = () => {return (
  namesArray = [
    'Alfredo',
    'Annette',
    'Christopher',
    'Connor',
    'Darlene',
    'Joel',
    'Logan',
    'Nancy',
    'Rebecca',
    'Ronald',
    'Savannah',
  ]
)};

const getThoughts = () => {return (
  thoughtsArray = [
    'The purpose of lorem ipsum is to create a natural looking block of text.',
    'Lorem ipsum experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets.',
    'The prevailing view, until recently, assumed lorem ipsum was born as a nonsense text.',
    'Lorem ipsums text loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.',
    'Creation timelines for the standard lorem ipsum passage vary, with some citing the 15th century and others the 20th.',
    'Lorem ipsum was purposefully designed to have no meaning, but appear like real text, making it the perfect placeholder.',
    'Don\'t bother typing lorem ipsum into Google translate.',
    'Some claim lorem ipsum threatens to promote design over content, while others defend its value in the process of planning.',
    'Generally, lorem ipsum is best suited to keeping templates from looking bare or minimizing the distractions of draft copy.',
    'No one rejects, dislikes, or avoids pleasure itself',
    'Which of us ever undertakes laborious physical exercise',
    'One who avoids a pain that produces no resultant pleasure?',
    'The wise man therefore always holds in these matters to this principle of selection',
    'In a free hour, when our power of choice is untrammeled',
    'Nec feugiat in fermentum posuere urna nec.',
    'Semper risus in hendrerit gravida.',
    'Quisque id diam vel quam elementum.'
  ]
)};

const getReaction = () => {
  reactions = [
    "👍",
    "👎",
    "❤️",
    "😂",
    "😢",
    "😡",
    "🤔",
    "🎉",
    "🙌",
    "🤷",
    "💩",
  ]
  return reactions[Math.floor(Math.random() * reactions.length)];
};

// Export the functions for use in seed.js
module.exports = { getNames, getThoughts, getReaction };