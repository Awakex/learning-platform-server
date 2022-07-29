import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  LogTaskResolve,
  LogTaskResolveDocument,
} from "../schemas/log-task-resolve";
import { Model } from "mongoose";

@Injectable()
export class LogTaskResolveService {
  constructor(
    @InjectModel(LogTaskResolve.name)
    private logTaskResolveModel: Model<LogTaskResolveDocument>
  ) {}

  async saveResolve(
    taskId: string,
    isResolvedCorrect: boolean,
    userId: string
  ): Promise<LogTaskResolve> {
    let log = {
      isResolvedCorrect,
      userId,
      taskId,
    };

    let createdLog = new this.logTaskResolveModel(log);
    return createdLog.save();
  }

  async getResolveLogByTaskIdAndUserId(
    taskId: string,
    userId: string
  ): Promise<LogTaskResolve> {
    return this.logTaskResolveModel.findOne({ taskId, userId });
  }
}
