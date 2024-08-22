import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { dbConnect } from './database/dbConnect';
import { customerOrderRoutes } from './routes/customer.order.Routes';
import { adminOrderRoutes } from './routes/admin.order.routes';


const app: Application = express();

app.use(express.json());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

app.use("/admin", adminOrderRoutes);
app.use("/customer", customerOrderRoutes);

dbConnect().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening at PORT ${process.env.PORT}`);
    });
});
