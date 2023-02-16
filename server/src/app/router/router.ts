import { Router } from "express";
const router = Router();

import { User, Event } from "@controllers";
import { User as UserModel } from "@models";

router.delete("/api/debug/users", async (req, res) => {
	try {
		const users = await UserModel.find();

		for (const user of users) await UserModel.findByIdAndDelete(user._id);

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

export default router;
