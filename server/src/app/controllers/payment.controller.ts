import { Request as EXRequest, Response as EXResponse } from "express";

import Stripe from "stripe";

import { payments } from "@config";
import { config } from "dotenv";
config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, { apiVersion: "2022-11-15" });

export default new (class Payment {
	async createCheckoutSession(req: EXRequest, res: EXResponse): Promise<EXResponse> {
		try {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: payments.payment.methods,
				mode: "payment",
				line_items: req.body.map((item: any) => {
					return {
						price_data: {
							currency: payments.payment.currency,
							product_data: {
								name: item.name
							},
							unit_amount: item.price
						},
						quantity: 1
					};
				}),
				success_url: `${process.env.CLIENT_URL}/success`,
				cancel_url: `${process.env.CLIENT_URL}/failure`
			});

			if (session.code == 403)
				return res.status(403).json({ status: "ERROR", message: "PNC" });      
     
			if (session.code == 401) 
				return res.status(401).json({ status: "ERROR", message: "ONC" });

			return res.status(200).json({ status: "OK", session });
		} catch (e) {
			return res.status(400).json({ status: "ERROR", message: "ONC" });
		}
	}
})
