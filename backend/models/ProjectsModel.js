import mongoose from 'mongoose';

const ProjectsSchema = new mongoose.Schema({
	project_id: {
		type: String,
		required: true,
		unique: true,
		description: 'Unique project ID'
	},
	project_name: {
		type: String,
		required: true,
		description: 'Project title'
	},
	description: {
		type: String
	},
	created_by: {
		type: String,
		required: true,
		description: 'emp_id of creator'
	},
	created_at: {
		type: Date,
		required: true
	},
	deadline: {
		type: Date
	},
	project_description_pdf: {
		type: String,
		description: 'File path or URL'
	},
	priority: {
		type: String,
		required: true,
		enum: ['Low', 'Medium', 'High']
	},
	project_manager_name: {
		type: String
	},
	tags: [{
		type: String
	}]
});

const Project = mongoose.model('Project', ProjectsSchema);

export default Project;
