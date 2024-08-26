import Message from '../models/message.model.js'


export const addMessage = async (req, res) => {
    const {chatId, senderId, text} = req.body;

    try {
        
        const message = new Message({
            chatId,
            senderId,
            text
        })
        await message.save();
        res.status(200).json(message)

    } catch (error) {
        console.log("error occured adding message", error.message);
        res.status(500).json(error)
    }
}
export const getMessages = async (req, res) => {
    const {chatId} = req.params;

    try {   
        const message = await Message.find({
            chatId,
        })
        if (!message) {
            res.status(404).json({message: "Messages not found"})
        }
        res.status(200).json(message)

    } catch (error) {
        console.log("error occured fetching message", error);
        res.status(500).json(error)
    }
}