export default async (): Promise<
	{ status: string, message: string }
> => {
	try {		
		return { status: "OK", message: "OCS" };
	} catch () {
		return { status: "ERROR", message: "ONC" };
	}
};
