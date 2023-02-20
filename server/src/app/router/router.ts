import { Router } from "express";
const router = Router();

import { User, Event, UserEvent } from "@controllers";
import {
	User as UserModel,
	Event as EventsModel,
	UserEvent as UserEventModel,
} from "@models";

router.delete("/api/debug/users", async (req, res) => {
	try {
		const users = await UserModel.find();

		for (const item of users) await UserModel.findByIdAndDelete(item._id);

		return res.status(200).json({ status: "OK", message: "DD" });
	} catch (e) {
		return res.status(400).json({ status: "ERROR", message: e.message });
	}
});

router.delete("/api/debug/events", async (req, res) => {
	try {
		const events = await EventsModel.find();

		for (const item of events) await EventsModel.findByIdAndDelete(item._id);

		return res.status(200).json({ status: "OK", message: "DD" });
	} catch (e) {
		return res.status(400).json({ status: "ERROR", message: e.message });
	}
});

router.delete("/api/debug/user-events", async (req, res) => {
	try {
		const userEvents = await UserEventModel.find();

		for (const item of userEvents)
			await UserEventModel.findByIdAndDelete(item._id);

		return res.status(200).json({ status: "OK", message: "DD" });
	} catch (e) {
		return res.status(400).json({ status: "ERROR", message: e.message });
	}
});

router.get("/api/users", User.list);
router.get("/api/users/:id", User.show);
router.post("/api/users", User.create);
router.put("/api/users/:id", User.update);
router.delete("/api/users/:id", User.delete);

router.get("/api/events", Event.list);
router.get("/api/events/:id", Event.show);
router.post("/api/events", Event.create);
router.put("/api/events/:id", Event.update);
router.delete("/api/events/:id", Event.delete);

router.get("/api/user-events", UserEvent.list);
router.get("/api/user-events/:id", UserEvent.show);
router.post("/api/user-events", UserEvent.create);
router.put("/api/user-events", UserEvent.update);
router.delete("/api/user-events/:id", UserEvent.delete);

export default router;
