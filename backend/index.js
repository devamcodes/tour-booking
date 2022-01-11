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

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
	console.log(`server is listining on ${PORT}`);
});
