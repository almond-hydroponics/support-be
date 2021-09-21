import { ResponseFilter, Context, ResponseFilterMethods } from '@tsed/common';

@ResponseFilter('*/*')
export class CustomResponseFilter implements ResponseFilterMethods {
	transform(data: string, ctx: Context): any {
		const { statusCode } = ctx.response;
		let success = false;
		if (statusCode === 200) {
			success = true;
		}
		return {
			success,
			statusCode,
			data,
			errors: [],
			links: [],
		};
	}
}
