const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Voor het verwerken van JSON in requests

let tasks = [];

// Create - Voeg een nieuwe taak toe
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

// Read - Haal alle taken op
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update - Update een bestaande taak
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = req.body;

    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Delete - Verwijder een taak
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
