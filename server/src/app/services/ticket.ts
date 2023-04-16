import qrcode from "qrcode";

import { Event, User } from "@models";

export default async (eventId: string, userId: string): Promise<
	{ status: string, message: string } |
	{ image: string, text: string }
> => {
	try {
		const user = await User.findById(userId);
		if (!user) return { status: "ERROR", message: "DNF[User]" };

		const event = await Event.findById(eventId);
		if (!event) return { status: "ERROR", message: "DNF[Event]" };

		const codeContent = `${user._id}+${event._id}+${Date.now()}`;

		const code: string = await qrcode.toDataURL(codeContent);
		return { image: code, text: codeContent };
	} catch (e) {
		return { status: "ERROR", message: "ONC" };
	}
};