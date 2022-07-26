import { Request } from "express";

export interface IRequestWithAuth extends Request {
  user: {
    _id: string;
  };
}
