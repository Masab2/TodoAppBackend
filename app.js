const express = require("express");
const { connectToDb } = require("./connection/connection");
const authroutes = require('./routes/approutes')
const todoroutes = require('./routes/todoRoutes')
const todoModel = require("./Models/todoModel");
const body_parser = require("body-parser");
const app = express();
const PORT = 8000;

// MidleWares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user',authroutes)
app.use('/user',todoroutes)
app.use(body_parser.json());

// Connect To Mongo DB
connectToDb("mongodb://127.0.0.1:27017/newTodoDb")
  .then(() => {
    console.log(`Connected To Mongo Db ${PORT}`);
  })
  .catch(() => {
    console.log(`Failed to connect to MongoDB ${PORT}`);
  });

app.listen(PORT, () => console.log(`Server Conected${PORT}`));
