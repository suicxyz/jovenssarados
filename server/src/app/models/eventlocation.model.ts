import mongoose from "src/app/database";
import { BrazilTimezone } from "src/app/utils";

const EventLocationSchema = new mongoose.Schema({
	event_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event",
		require: true,
	},
	location_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Location",
		require: true,
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

export default mongoose.model("EventLocation", EventLocationSchema);
