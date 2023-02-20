import { tz, Moment } from "moment-timezone";
import fs from "fs";

export const BrazilTimezone = (): Moment => {
	return tz(Date.now(), "America/Sao_Paulo");
};

export const ConvertToBase64 = (file: string) => {
	const bitmap = fs.readFileSync(file, {
		encoding: "base64",
	});

	return bitmap;
};
