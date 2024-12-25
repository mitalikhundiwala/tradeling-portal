import HttpError from "standard-http-error";

export interface ITradelingHttpErrorProps {
  statusCode: number;
}

export class TradelingHttpErrorClass extends HttpError {
  getStatusCode(): number {
    return this.errorCode;
  }

  constructor(httpStatusCode: number | string, message: string) {
    super(httpStatusCode, message);
  }
}

export default TradelingHttpErrorClass;
