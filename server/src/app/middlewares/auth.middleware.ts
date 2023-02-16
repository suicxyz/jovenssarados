import { Request, Response, NextFunction } from "express";

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!(req.session.login || req.session.login._id))
		return res.status(401).json({ status: "ERROR", message: "ANA" });

	next();
}
