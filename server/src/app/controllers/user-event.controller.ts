import { Request, Response } from "express";

import { User, UserEvent } from "@models";
import ticket from "src/app/services/ticket";

export default new (class UserEventController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			var userEvents = await UserEvent.find();

			return res.status(200).json({ status: "OK", userEvents });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id) return res.status(400).json({ status: "ERROR", message: "INS" });

		try {
			const userEvent = await UserEvent.findById(id);

			if (!userEvent)
				return res.status(400).json({ status: "ERROR", message: "DNF" });

			return res.status(200).json({ status: "OK", userEvent });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;

		try {
			if (await UserEvent.findOne(body))
				return res
					.status(400)
					.json({ status: "ERROR", message: "DAE[UserEvent]" });

			if (!(await User.findById(body.user_id)))
				return res.status(400).json({ status: "ERROR", message: "DNF[User]" });

			const { image, text } = await ticket(body.event_id, body.user_id);
			var userEvent = await UserEvent.create({
				...body,
				status: "Marcado",
				qrcode: { image, text },
			});

			const user = await User.findById(body.user_id);

			await User.findByIdAndUpdate(body.user_id, {
				registered_events: [...user.registered_events, userEvent._id],
			});

			return res.status(200).json({ status: "OK", userEvent });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { status } = req.body;

		if (!id) return res.status(400).json({ status: "ERROR", message: "INS" });

		try {
			if (!(await UserEvent.findById(id)))
				return res.status(400).json({
					status: "ERROR",
					message: "DNF",
				});

			const userEvent = await UserEvent.findByIdAndUpdate(
				id,
				{ status },
				{ new: true }
			);

			return res.status(400).json({ sattus: "OK", userEvent });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id) return res.status(400).json({ status: "ERROR", message: "INS" });

		try {
			if (!(await UserEvent.findById(id)))
				return res.status(400).json({
					status: "ERROR",
					message: "DNF",
				});

			await UserEvent.findByIdAndDelete(id);

			return res.status(200).json({ status: "OK", message: "DD" });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}
})();
