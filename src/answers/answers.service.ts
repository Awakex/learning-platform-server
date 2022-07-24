import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer, AnswerDocument } from "../schemas/answer.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    private tasksService: TasksService
  ) {}

  async createAnswer(
    questionId: string,
    dto: CreateAnswerDto
  ): Promise<Answer> {
    let task = await this.tasksService.getTask(questionId);
    const answer = new this.answerModel({ ...dto, questionId: task });
    return answer.save();
  }
}
