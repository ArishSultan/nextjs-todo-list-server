const prisma = require("@prisma/client").PrismaClient;
const prismaClient = new prisma();

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await prismaClient.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
};

// Get a single task
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prismaClient.task.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch task" });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, color } = req.body;
  try {
    const newTask = await prismaClient.task.create({
      data: {
        title,
        color,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Unable to create task" });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const updatedTask = await prismaClient.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        color,
        completed,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Unable to update task" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete task" });
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
