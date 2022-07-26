import { forwardRef, Module } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswersController } from "./answers.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Answer, AnswerSchema } from "../schemas/answer.schema";
import { TasksModule } from "../tasks/tasks.module";
import { AuthModule } from "../auth/auth.module";
import {
  CorrectAnswer,
  CorrectAnswerSchema,
} from "../schemas/correct-answer.schema";
import { RewardModule } from "src/reward/reward.module";

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    MongooseModule.forFeature([
      { name: Answer.name, schema: AnswerSchema },
      { name: CorrectAnswer.name, schema: CorrectAnswerSchema },
    ]),
    TasksModule,
    RewardModule,
    forwardRef(() => AuthModule),
  ],
  exports: [AnswersService],
})
export class AnswersModule {}
