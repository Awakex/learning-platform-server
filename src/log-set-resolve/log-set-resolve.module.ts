import { Module } from "@nestjs/common";
import { LogSetResolveService } from "./log-set-resolve.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LogSetResolve, LogSetResolveSchema } from "../schemas/log-set-resolve";

@Module({
  providers: [LogSetResolveService],
  imports: [
    MongooseModule.forFeature([
      { name: LogSetResolve.name, schema: LogSetResolveSchema },
    ]),
  ],
  exports: [LogSetResolveService],
})
export class LogSetResolveModule {}
