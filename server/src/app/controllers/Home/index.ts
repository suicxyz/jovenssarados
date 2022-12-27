import { Request, Response } from "express";

import { HomeModel } from "@models";
import utils from "src/app/utils";

class HomeController {
	async index(_req: Request, res: Response): Promise<Response> {
		console.log(HomeModel.load());
		console.log("Sum 1 and 1: " + utils.sum(1, 1));
		return res.send("Home.");
	}
}

export default new HomeController();
