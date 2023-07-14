interface IAppResponse {
  statusCode?: number;
  message?: string;
  data?: any;
}

class AppResponse {
  status(statusCode: number) {
    throw new Error("Method not implemented.");
  }

  public readonly statusCode: number;
  public readonly result: string;
  public readonly message: string | undefined;
  public readonly data: any | undefined;

  constructor({ statusCode = 200, message, data }: IAppResponse) {
    this.statusCode = statusCode;
    this.result = "success";
    this.message = message;
    this.data = data;
  }
}

export { AppResponse };
