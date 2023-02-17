import { Request, Response } from "express";

import { Event } from "@models";

export default new (class EventController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			const events = await Event.find();

			return res.status(200).json({ status: "OK", events });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res.status(400).json({
				status: "ERROR",
				message: "INS",
			});

		try {
			const event = await Event.findById(id);

			if (!event)
				return res.status(400).json({ status: "ERROR", message: "DNF" });

			return res.status(200).json({ status: "OK", event });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;

		try {
			const event = await Event.create({ ...body, created_by: body._id });

			return res.status(201).json({ status: "OK", event });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { body } = req;

		if (!id) return res.status(400).json({ status: "ERROR", message: "INS" });

		try {
			if (!(await Event.findById(id)))
				return res.status(400).json({ status: "ERROR", message: "DNF" });

			await Event.findByIdAndUpdate(id, body);

			const event = await Event.findById(id);

			return res.status(201).json({ status: "OK", event });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id) return res.status(400).json({ status: "ERROR", message: "INS" });

		try {
			await Event.findByIdAndDelete(id);

			return res.status(204).json({ status: "OK", message: "DD" });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}
})();
