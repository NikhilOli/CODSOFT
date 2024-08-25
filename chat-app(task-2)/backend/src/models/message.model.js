import {Schema, model} from "mongoose"

const messageSchema = new Schema(
    {
        chatId: {
            type: String,
            required: true
        },
        senderId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    }, 
    {
        timestamps: true,
    }
);

export const Message = model("Message", messageSchema);