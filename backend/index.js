import cors from "cors";
import express from "express";
import color from "colors";
import dotenv from "dotenv";
import connecteDB from "./config/db.js";
import user from "./routes/user.js";

const app = express();

app.use(express.json());

dotenv.config();

connecteDB();
app.use(cors({ origin: "*", credentials: true }));
app.use("/user", user);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server is listining on ${PORT}`);
});
