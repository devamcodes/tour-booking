import express from "express";
const router = express.Router();
import apiRoutes from "./api/index.js";

/* GET home page. */
router.get("/", function (req, res) {
	res.render("index", { title: "Node Mongodb - Boilerplate" });
});

router.get("/ping", function (req, res) {
	res.send("pong");
});

router.use("/api", apiRoutes);

export default router;
