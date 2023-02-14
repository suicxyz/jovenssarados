import { Request, Response, NextFunction } from "express";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.session.login == undefined)
		return res
			.status(401)
			.json({ status: "ERROR", message: "Could not conclude operation." });

	next();
}
