require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

connection();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

const port  = process.env.port || 8080;
app.listen(port,()=>console.log(`Listening on port ${port}`));