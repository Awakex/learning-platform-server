import { Module } from "@nestjs/common";
import { LogTaskResolveService } from "./log-task-resolve.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  LogTaskResolve,
  LogTaskResolveSchema,
} from "../schemas/log-task-resolve";

@Module({
  providers: [LogTaskResolveService],
  imports: [
    MongooseModule.forFeature([
      { name: LogTaskResolve.name, schema: LogTaskResolveSchema },
    ]),
  ],
  exports: [LogTaskResolveService],
})
export class LogTaskResolveModule {}
