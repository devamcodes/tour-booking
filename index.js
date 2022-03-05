import cors from "cors";
import express from "express";
import color from "colors";
import dotenv from "dotenv";
import path from "path";
import connecteDB from "./config/db.js";
import indexRouter from "./routes/index.js";
const app = express();

app.use(express.json());

dotenv.config();

connecteDB();
app.use(cors({ origin: "*", credentials: true }));
app.use("/", indexRouter);

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
// header("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With");
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
app.listen(PORT, () => {
	console.log(`server is listining on ${PORT}`);
});
