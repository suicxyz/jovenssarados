import { tz, Moment } from "moment-timezone";

export const BrazilTimezone = (): Moment => {
	return tz(Date.now(), "America/Sao_Paulo");
};
