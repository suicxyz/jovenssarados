import mongoose from "src/app/database";
import { BrazilTimezone } from "src/app/utils";

const LocationSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	uf: {
		type: String,
		require: true,
		trim: true,
		maxLength: 2,
	},
	city: {
		type: String,
		require: true,
		trim: true,
	},
	district: {
		type: String,
		require: true,
		trim: true,
	},
	street: {
		type: String,
		require: true,
		trim: true,
	},
	number: {
		type: Number,
		require: true,
		trim: true,
	},
	complement: {
		type: String,
		require: true,
		trim: true,
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

export default mongoose.model("Location", LocationSchema);
