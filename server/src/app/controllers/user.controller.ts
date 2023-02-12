import { Request, Response } from "express";

import { User } from "@models";
import { cpf } from "cpf-cnpj-validator";

export default new (class UserController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			const users = await User.find();

			return res.status(200).json(users);
		} catch (err) {
			if (err) throw err;
			return res.status(400).send(new Error("Could not list users."));
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res
				.status(200)
				.send(new Error("User ID is not specified in URL."));

		try {
			const user = await User.findById(id);

			if (!user) return res.status(404).send(new Error("User not found."));

			return res.status(200).json(user);
		} catch (err) {
			if (err) throw err;
			return res.status(400).send(new Error("Could not get user by ID."));
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;

		try {
			if (await User.findOne({ email: body.email }))
				return res.status(400).send(new Error("User already exists."));

			if (!cpf.isValid(body.cpf))
				return res
					.status(400)
					.send(new Error("The specified CPF is not valid."));

			const user = await User.create(body);

			delete user.password;

			return res.status(201).json({ message: "User created.", user });
		} catch (err) {
			if (err) throw err;
			return res.status(400).send(new Error("Could not create user."));
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			return res.status(200).json({ message: "User updated." });
		} catch (err) {
			if (err) throw err;
			return res.status(400).send(new Error("Could not update user."));
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res
				.status(400)
				.send(new Error("User ID is not specified in URL."));

		try {
			if (await User.findById(id))
				return res
					.status(400)
					.send(new Error("Could not find user with the provided ID."));

			await User.findByIdAndDelete(id);

			return res.status(200).json({ message: "User deleted." });
		} catch (err) {
			if (err) throw err;
			return res.status(400).send(new Error("Could not delete user."));
		}
	}
})();
