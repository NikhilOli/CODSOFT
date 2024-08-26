import Chat from '../models/chat.model.js'


export const createChat = async (req, res) => {
    const {senderId, receiverId} = req.body
    try {
        const newChat = new Chat({
            members: [senderId, receiverId]
        })

        const result = await newChat.save();
        res.status(200).json(result)

    } catch (error) {
        console.log("Error creating chat", error);
        res.status(500).json(error)
        
    }
}

export const userChats = async (req, res) => {
    const {userId} = req.params
    try {
        const userChats = await Chat.find({
            members: {$in: [userId]}
        })

        if (!userChats) {
            res.status(404).json({message: "No chats found"})
        }

        res.status(200).json(userChats)

    } catch (error) {
        console.log("Error creating chat", error);
        res.status(500).json(error)
        
    }
}

export const findChat = async (req, res) => {
    const {firstId, secondId} = req.params
    try {
        const chat = await Chat.findOne({
            members: {$all: [firstId, secondId]}
        })

        if (!chat) {
            res.status(404).json({message: "No chat found"})
        }

        res.status(200).json(chat)

    } catch (error) {
        console.log("Error creating chat", error);
        res.status(500).json(error)
        
    }
}