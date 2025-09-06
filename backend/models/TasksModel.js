import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
	task_name: {
		type: String,
		required: true
	},
	assignee_name: {
		type: String,
		required: true
	},
	project_name: {
		type: String,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	},
	task_description_pdf: {
		type: String,
		description: 'File path or URL'
	},
	description: {
		type: String
	}
});

const Task = mongoose.model('Task', TasksSchema);

export default Task;