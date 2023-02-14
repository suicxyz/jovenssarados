import "express-session";
import mongoose from "src/app/database";

declare module "express-session" {
	interface SessionData {
		login?: {
			_id?: String;
			user?: String;
			email?: String;
			password?: String;
			profile_pic?: String;
			birth_date?: Date;
			phone_number?: String;
			cpf?: String;
			geo_location?: mongoose.Schema.Types.ObjectId;
			registered_events?: mongoose.Schema.Types.ObjectId;
			is_moderator?: Boolean;
			created_at?: Date;
		};
	}
}
