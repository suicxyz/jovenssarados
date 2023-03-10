import { Request, Response } from "express";
import bcjs from "bcryptjs";

import { User } from "@models";

export default new (class AuthController {
	async login(req: Request, res: Response) {
		const { body } = req;

		try {
			const user = await User.findOne({
				$or: [{ email: body.email }, { cpf: body.cpf }],
			}).select("+password");

			if (!user)
				return res.status(400).json({ status: "ERROR", message: "DNF" });

			if (!(await bcjs.compare(body.password, user.password)))
				return res
					.status(400)
					.json({ status: "ERROR", message: "CNV[Password]" });

			// @ts-ignore
			req.session.login = user;
			user.password = undefined;

			return res.status(200).json({ status: "OK", session: req.session.login });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}
})();
