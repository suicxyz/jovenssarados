import { Router } from "express";
const router = Router();

import { User, Event, UserEvent, Auth } from "@controllers";
import {
	User as UserModel,
	Event as EventsModel,
	UserEvent as UserEventModel,
} from "@models";

import auth from "../middlewares/auth.middleware";

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

router.get("/api/users", auth, User.list);
router.get("/api/users/:id", auth, User.show);
router.post("/api/users", auth, User.create);
router.put("/api/users/:id", auth, User.update);
router.delete("/api/users/:id", auth, User.delete);

router.get("/api/events", auth, Event.list);
router.get("/api/events/:id", auth, Event.show);
router.post("/api/events", auth, Event.create);
router.put("/api/events/:id", auth, Event.update);
router.delete("/api/events/:id", auth, Event.delete);

router.get("/api/user-events", auth, UserEvent.list);
router.get("/api/user-events/:id", auth, UserEvent.show);
router.post("/api/user-events", auth, UserEvent.create);
router.put("/api/user-events", auth, UserEvent.update);
router.delete("/api/user-events/:id", auth, UserEvent.delete);

router.post("/api/auth/login", auth, Auth.login);

export default router;
