import express, { Request, Response } from 'express';

// Initialize express app
const app = express();
app.use(express.json());

// In-memory database to store tasks
let tasks: { id: number; title: string; completed: boolean }[] = [];

// Route to get all tasks
app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// Route to create a new task
app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Route to mark a task as completed
app.put('/tasks/:id', (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = true;
  res.json(task);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
