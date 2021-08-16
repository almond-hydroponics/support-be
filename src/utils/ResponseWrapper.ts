export class ResponseWrapper{
    static SuccessResponse(msg: string, data:any) : any{
        return {message: msg, data: data, success: true}
    }
    static FailResponse(msg: string, data:any) : any{
        return {error: msg, data: data, success: false}
    }
}
