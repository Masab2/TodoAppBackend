const todoModel = require("../Models/todoModel");

// Add Todos To the Server
async function handleAddTodo(req, res) {
  const { userId, title, description, date } = req.body;
  console.log(req.body);
  try {
    if (!userId || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      const newTodo = new todoModel({
        userId,
        title,
        description,
        date,
      });
      const result = await newTodo.save();
      return res.status(200).json({ Status: true, Success: result });
    }
  } catch (error) {
    return res.status(400).json({ error: `${error}` });
  }
}

// Get Request For Fetching All Todos of Specific User
async function handleGetAllTodos(req, res) {
  const { userId } = req.query;
  console.log(req.query);
  if (!userId) {
    return res.status(400).json({ error: "Please Enter the User ID" });
  } else {
    const result = await todoModel.find({ userId });
    return res.status(200).json({ Status: true, Success: result });
  }
}

module.exports = { handleAddTodo, handleGetAllTodos };
