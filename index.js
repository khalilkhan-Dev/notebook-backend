const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/AuthRoutes");
const TaskRoutes = require("./routes/TaskRoutes");

const app = express();
app.use(express.json());
app.use(cors());
ConnectDB();

app.use("/", authRoutes);
app.use("/", TaskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
