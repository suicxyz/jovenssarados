import mongoose from "src/app/database";
import { BrazilTimezone } from "src/app/utils";

const UserEventSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	event_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event",
		required: true,
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

export default mongoose.model("UserEvent", UserEventSchema);
