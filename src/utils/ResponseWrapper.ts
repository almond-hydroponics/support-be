export class ResponseWrapper {
	static SuccessResponse(msg: string, data: any): any {
		return { success: true, message: msg, data };
	}

	static FailResponse(msg: string, data: any): any {
		return { success: false, error: msg, data };
	}
}
