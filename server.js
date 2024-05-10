import  express  from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import bodyParser from 'body-parser';
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import usersRoute from "./routes/usersRoute.js"
import OrderRoutes from "./routes/orderRoute.js";
import { sendwelcomemail, sendEmail ,sendOTP} from "./middlewares/nodemailerMiddleware.js";
import AnalyticsRoutes from"./routes/AnalyticsRoutes.js"


dotenv.config();



const app = express()//express
connectdb();//Database

const corsOptions = {
  origin: ['http://localhost:4000','http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category", categoryRoute);
app.use(express.static('public'));
app.use("/api/v1/product", productRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/orders", OrderRoutes); 
app.use("/w-vm-api/v1/analytics", AnalyticsRoutes);

app.post('/send-email', sendEmail);
app.post('/send-welcome-mail', sendwelcomemail);
app.post('/send-verification', sendOTP);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to VISION!</h1>");
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('****Server Started on '+process.env. DEV_MODE +" Mode PORT:"+ PORT+"****")
})

 