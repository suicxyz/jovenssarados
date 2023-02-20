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
	status: {
		type: String,
		enum: ["Marcado", "Ocorrido", "Cancelado/Reembolsado"],
		default: "Marcado",
		require: true,
	},
	qrcode: {
		image: {
			type: String,
			require: true,
			trim: true,
		},
		text: {
			type: String,
			require: true,
			trim: true,
		},
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

export default mongoose.model("UserEvent", UserEventSchema);
