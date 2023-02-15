import { Request, Response } from "express";

import { Event } from "@models";

export default new (class EventController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			const events = await Event.find();

			return res.status(200).json({ status: "OK", events });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({
				status: "ERROR",
				message: "Event ID is not specified in URL.",
			});

		try {
			const event = await Event.findById(id);

			if (!event)
				return res
					.status(400)
					.json({ status: "ERROR", message: "Event not found." });

			return res.status(200).json({ status: "OK", event });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;
		const { login } = req.session;

		try {
			await Event.create({ ...body, createdBy: login._id });

			const event = await Event.findOne().sort({ createdAt: -1 }).lean().exec();

			return res.status(201).json({ status: "OK", event });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: e.message });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { body } = req;

		if (!id)
			return res
				.status(400)
				.send(new Error("Event ID is not specified in URL."));

		try {
			await Event.findByIdAndUpdate(id, body);

			const event = await Event.findById(id);

			return res.status(201).json(event);
		} catch (e) {
			return res.status(400).send(new Error("Could not find event."));
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res
				.status(400)
				.send(new Error("Event ID is not specified in URL."));

		try {
			await Event.findByIdAndDelete(id);

			return res.status(204).json({ message: "Event deleted." });
		} catch (e) {
			return res.status(400).send(new Error("Could not delete event."));
		}
	}
})();
