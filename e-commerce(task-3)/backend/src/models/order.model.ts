import { InferSchemaType, model, Schema } from "mongoose";



const orderSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        orderItems: {
            type: [
                {
                    productId: { type: String, required: true },
                    name: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    price: { type: Number, required: true }
                }
            ],
            required: true
        },
        paymentMethod: {
            type: String,
            default: "Cash on delivery"
        },
    }, {timestamps: true}
);

type Order = InferSchemaType<typeof orderSchema>

export const Order = model<Order>("Order", orderSchema);

