import { forwardRef, Module } from "@nestjs/common";
import { SetsService } from "./sets.service";
import { SetsController } from "./sets.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Set, SetSchema } from "../schemas/set.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [SetsController],
  providers: [SetsService],
  imports: [
    MongooseModule.forFeature([{ name: Set.name, schema: SetSchema }]),
    forwardRef(() => AuthModule),
  ],

  exports: [SetsService],
})
export class SetsModule {}
