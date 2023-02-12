import { NextFunction } from "express";
import dat from "date-and-time";

import mongoose from "src/app/database";
import { BrazilTimezone } from "src/app/utils";

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	entry_fee: {
		type: Number,
		require: true,
		trim: true,
	},
	public: {
		type: Boolean,
		require: true,
		default: true,
	},
	date_time: {
		date: {
			type: String,
			require: true,
			trim: true,
		},
		time: {
			type: String,
			require: true,
			trim: true,
		},
	},
	location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Location",
		require: true,
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

EventSchema.pre("save", async function (next: NextFunction) {
	const { date } = this.date_time;
	const { time } = this.date_time;

	this.date_time.date = dat.format(
		new Date(Date.parse(`${date}`)),
		"DD/MM/YYYY"
	);
	this.date_time.time = dat.format(
		new Date(Date.parse(`${date}T${time}:00`)),
		"HH:mm"
	);

	next();
});

export default mongoose.model("Event", EventSchema);
