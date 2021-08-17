import {ResponseFilter, Context, ResponseFilterMethods} from "@tsed/common";
import {request} from "express";

@ResponseFilter("*/*")
export class CustomResponseFilter implements ResponseFilterMethods {
    transform(data: any, ctx: Context) {
        const statusCode = ctx.response.statusCode
        let success:boolean = false
        if(statusCode == 200){
            success = true
        }
        return {success,statusCode, data, errors: [], links: []};
    }
}
