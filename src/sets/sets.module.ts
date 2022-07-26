import { forwardRef, Module } from "@nestjs/common";
import { SetsService } from "./sets.service";
import { SetsController } from "./sets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Sets, SetsSchema } from "../schemas/sets.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [
    MongooseModule.forFeature([{ name: Sets.name, schema: SetsSchema }]),
    forwardRef(() => AuthModule),
  ],

  exports: [SetsService],
})
export class SetsModule {}
