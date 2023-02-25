import { Request, Response, NextFunction } from "express";

import * as config from "@config";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { permissions } = config.permissions;
	const session = req.session.login;

	if (req.url == "/api/auth/login" && session)
		return res
			.status(400)
			.json({ status: "ERROR", message: "ANA[SessionAlreadySet]" });

	for (const item of permissions) {
		const method: string = item.split("[")[1].split("]")[0];
		const route: string = item.split("]")[1].split("=")[0];
		const level: string = item.split("=")[1];

		if (req.method == method.toUpperCase() && req.url == route) {
			if (level == "-1") {
				if (session) {
					return res
						.status(401)
						.json({ status: "ERROR", message: "ANA[SessionAlreadySet]" });
				}
				return next();
			}

			if (level == "0") {
				next();
			} else if (level == "1") {
				if (!session)
					return res
						.status(401)
						.json({ status: "ERROR", message: "ANA[NoSession]" });
				else next();
			} else if (level == "2") {
				if (!session) {
					return res
						.status(401)
						.json({ status: "ERROR", message: "ANA[NoSession]" });
				} else {
					if (!session.is_moderator)
						return res
							.status(401)
							.json({ status: "ERROR", message: "ANA[NotModerator]" });
					else next();
				}
			}
		}
	}
}
