import { Request, Response } from "express";
import bcjs from "bcryptjs";

import { User } from "@models";

export default new (class AuthController {
	async login(req: Request, res: Response) {
		const { body } = req;

		try {
			const user = await User.findOne({
				$or: [{ email: body.email }, { cpf: body.cpf }],
			});

			if (!user)
				return res
					.status(400)
					.json({ status: "ERROR", message: "User not found." });

			if (!(await bcjs.compare(body.password, user.password)))
				return res
					.status(400)
					.json({ status: "ERROR", message: "Wrong password." });

			// @ts-ignore
			req.session.login = user;

			return res.status(200).json({ status: "OK", session: req.session.login });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}
})();
