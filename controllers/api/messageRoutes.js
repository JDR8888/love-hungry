/* eslint-disable */

const router = require('express').Router();
const { Message, User } = require('../../models');

// Get a user's messages
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user's messages using the userId
    const messages = await Message.findAll({
      where: {
        receiver_id: id,
      },
      include: {
        model: User,
        as: 'sender',
      },
    });

    // Return the messages as JSON data
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

// Send a message from the current user to another user
router.post('/', async (req, res) => {
  try {
    const { content, receiver_id } = req.body;

    // Create a new message and save it to the database
    const newMessage = await Message.create({
      sender_id: req.session.user.id,
      receiver_id,
      content,
    });

    // Return the new message as JSON data
    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

module.exports = router;
