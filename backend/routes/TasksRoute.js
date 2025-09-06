import express from 'express';
import auth from '../middleware/auth.js';
import Task from '../models/TasksModel.js';
import Project from '../models/ProjectsModel.js';

const router = express.Router();

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { name, description, assignee, deadline, project } = req.body;
        if (!name || !project) {
            return res.status(400).json({ msg: 'Title and project are required' });
        }

        // Optionally, check if the user is a member of the project
        const projectDoc = await Project.findById(project);
        if (!projectDoc) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        // You can add membership check here if needed

        const newTask = new Task({
            task_name: name,
            description,
            assignee_name: assignee,
            deadline,
            project_name: project,
            created_by: req.user.id
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/tasks
// @desc    Get all tasks for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // Find all tasks created by the user or assigned to the user
        const tasks = await Task.find({
            $or: [
                { created_by: req.user.id },
                { assignee_name: req.user.id }
            ]
        });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Middleware to check if user is a member of the project associated with the task
const checkProjectMembership = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        
        const project = await Project.findById(task.project);
        if (!project.teamMembers.includes(req.user.id)) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        
        req.task = task; // Pass task to the next handler
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/tasks/:id
// @desc    Get a single task by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        // req.task is passed from checkProjectMembership middleware
        await req.task.populate('assignee', 'name email');
        res.json(req.task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/tasks/:id
// @desc    Update a task (e.g., status, assignee)
// @access  Private
router.put('/:id', auth, checkProjectMembership, async (req, res) => {
    const { title, description, assignee, status, priority, deadline } = req.body;

    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (assignee) taskFields.assignee = assignee;
    if (status) taskFields.status = status;
    if (priority) taskFields.priority = priority;
    if (deadline) taskFields.deadline = deadline;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, checkProjectMembership, async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;