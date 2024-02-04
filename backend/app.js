const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const connDB = require("./db");
const formRouter = require("./routes/Form");
const PORT = 3014;
connDB();

app.use(cors());
app.use(express.json());
app.use("/", formRouter);
app.get("/", (req, res) => {
	res.send("get success");
});
app.listen(PORT, () => console.log("server is listening", PORT));
