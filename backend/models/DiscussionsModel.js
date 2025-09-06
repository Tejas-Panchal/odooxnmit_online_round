import mongoose from 'mongoose';

const DiscussionsSchema = new mongoose.Schema({
	message_id: {
		type: String,
		required: true
	},
	project_id: {
		type: String,
		required: true
	},
	user_id: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		required: true
	}
});

const Discussion = mongoose.model('Discussion', DiscussionsSchema);

export default Discussion;
