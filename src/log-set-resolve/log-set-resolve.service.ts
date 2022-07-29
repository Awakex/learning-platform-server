import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  LogSetResolve,
  LogSetResolveDocument,
} from "../schemas/log-set-resolve";
import { Model } from "mongoose";

@Injectable()
export class LogSetResolveService {
  constructor(
    @InjectModel(LogSetResolve.name)
    private logSetResolveModel: Model<LogSetResolveDocument>
  ) {}

  async saveResolve(
    setId: string,
    isResolvedCorrect: boolean,
    userId: string,
    taskId: string
  ): Promise<LogSetResolve> {
    let log = {
      setId,
      isResolvedCorrect,
      userId,
      taskId,
    };

    let createdLog = new this.logSetResolveModel(log);
    return createdLog.save();
  }

  async getResolveLogBySetIdAndUserId(
    setId: string,
    userId: string
  ): Promise<LogSetResolve[]> {
    return this.logSetResolveModel.find({ setId, userId });
  }
}
