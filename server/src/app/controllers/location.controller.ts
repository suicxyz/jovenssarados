import { Request, Response } from "express";

import { Location } from "@models";

export default new (class LocationController {
	async list(req: Request, res: Response): Promise<Response> {
		try {
			const locations = await Location.find();

			return res.status(200).json(locations);
		} catch (err) {
			return res.status(400).send(new Error("Could not list locations."));
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		if (!id)
			return res
				.status(400)
				.send(new Error("Location ID is not specified in URL."));

		try {
			const location = await Location.findById(id);

			if (!location)
				return res.status(404).send(new Error("Location not found."));

			return res.status(200).json(location);
		} catch (err) {
			return res.status(400).send(new Error("Could not show location."));
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const { body } = req;

		try {
			const location = await Location.create(body);

			return res.status(200).json(body);
		} catch (err) {
			return res.status(400).send(new Error("Could not create location."));
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { body } = req;

		if (!id)
			return res
				.status(400)
				.send(new Error("Location ID not specified on URL."));

		try {
			if (!await Location.findById(id))
				return res.status(404).send(new Error("Location not found."));

			await Location.findByIdAndUpdate(id, body);

			const location = await Location.findById(id);

			return res.status(200).json(location);
		} catch (err) {
			return res.status(400).send(new Error("Could not update location."));
		}
	}
})();
