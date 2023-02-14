import { Request, Response } from "express";

import { User } from "@models";
import { cpf } from "cpf-cnpj-validator";

export default new (class UserController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			const users = await User.find();

			return res.status(200).json({ status: "OK", users });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res
				.status(400)
				.json({ status: "ERROR", message: "User ID is not specified in URL." });

		try {
			const user = await User.findById(id);

			if (!user)
				return res
					.status(400)
					.json({ status: "ERROR", message: "User not found." });

			return res.status(200).json({ status: "OK", user });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;

		try {
			if (
				await User.findOne({
					$or: [
						{ email: body.email },
						{ cpf: body.cpf }
					]
				})
			) {
				return res
					.status(400)
					.json({ status: "ERROR", message: "User already exist." });
			}

			if (!cpf.isValid(body.cpf))
				return res.status(400).json({
					status: "ERROR",
					message: "The specified CPF is not valid.",
				});

			const user = await User.create(body);

			user.password = undefined;

			return res.status(201).json({ status: "OK", user });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { body } = req;

		if (!id)
			return res.status(401).json({
				status: "ERROR",
				message: "Could not find user with the specified ID in URL.",
			});

		try {
			if (!(await User.findById(id)))
				return res.status(401).json({
					status: "ERROR",
					message: "User does not exist.",
				});

			const user = await User.findByIdAndUpdate(id, body, { new: true });

			return res.status(200).json({ status: "OK", user });
		} catch (e) {
			return res.status(401).json({ status: "ERROR", message: e.message });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		console.log(req);
		const { id } = req.params;

		if (!id)
			return res
				.status(400)
				.json({ status: "ERROR", message: "User ID is not specified in URL." });

		try {
			if (!(await User.findById(id)))
				return res.status(400).json({
					status: "ERROR",
					message: "Could not find user with the provided ID.",
				});

			await User.findByIdAndDelete(id);

			return res.status(200).json({ status: "OK" });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}
})();
