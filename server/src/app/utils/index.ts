import { tz, Moment } from "moment-timezone";

export const sum = (x: number, y: number): number => {
	return x + y;
};

export const BrazilTimezone = (): Moment => {
	return tz(Date.now(), "America/Sao_Paulo");
};
