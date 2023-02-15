import { NextFunction } from "express";
import bcjs from "bcryptjs";

import mongoose from "src/app/database";
import { BrazilTimezone } from "src/app/utils";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	email: {
		type: String,
		require: true,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		trim: true,
		select: false,
	},
	profile_pic: {
		type: String,
		require: true,
		trim: true,
	},
	birth_date: {
		type: Date,
		require: true,
		trim: true,
	},
	phone_number: {
		type: String,
		require: true,
		trim: true,
	},
	cpf: {
		type: String,
		require: true,
		trim: true,
	},
	geo_location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "geoLocation",
		trim: true,
	},
	registered_events: {
		type: Array<mongoose.Schema.Types.ObjectId>,
		ref: "UserEvent",
		trim: true,
	},
	is_moderator: {
		type: Boolean,
		default: false,
	},
	created_at: {
		type: Date,
		default: BrazilTimezone(),
	},
});

UserSchema.pre("save", async function (next: NextFunction) {
	this.password = await bcjs.hash(this.password, 16);
	next();
});

export default mongoose.model("User", UserSchema);
