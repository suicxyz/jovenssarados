import { Request, Response } from "express";

import { UserEvent } from "@models";

export default new (class UserEventController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			var userEvents = await UserEvent.find();

			return res.status(200).json({ status: "OK", userEvents });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}
})();
