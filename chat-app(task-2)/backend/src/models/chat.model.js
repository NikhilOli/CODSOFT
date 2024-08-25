import {Schema, model} from "mongoose"

const chatSchema = new Schema(
    {
        members: {
            type: Array,
        },
    }, 
    {
        timestamps: true,
    }
);

export const Chat = model("Chat", chatSchema);