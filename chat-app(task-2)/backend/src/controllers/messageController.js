import Message from '../models/Message.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { recipient, content, groupId } = req.body;
    const message = new Message({
      sender: req.user.userId,
      recipient,
      content,
      groupId,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user.userId, recipient: userId },
        { sender: userId, recipient: req.user.userId },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};