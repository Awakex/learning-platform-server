import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer, AnswerDocument } from "../schemas/answer.schema";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { TasksService } from "../tasks/tasks.service";
import {
  CorrectAnswer,
  CorrectAnswerDocument,
} from "../schemas/correct-answer.schema";
import { CorrectAnswerDto } from "./dto/correct-answer.dto";
import { IRequestWithAuth } from "../types/IRequestWithAuth";
import { RewardService } from "../reward/reward.service";

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(CorrectAnswer.name)
    private correctAnswerModel: Model<CorrectAnswerDocument>,
    private tasksService: TasksService,
    private rewardService: RewardService
  ) {}

  async createAnswer(
    questionId: string,
    dto: CreateAnswerDto
  ): Promise<Answer> {
    let task = await this.tasksService.getTask(questionId);
    const answer = new this.answerModel({ ...dto, questionId: task });
    return answer.save();
  }

  async getAnswersByQuestionId(questionId: string): Promise<Answer[]> {
    const answers = await this.answerModel.find({ questionId });
    return answers;
  }

  async saveCorrectAnswers(
    questionId: string,
    correctAnswerDto: CorrectAnswerDto
  ): Promise<CorrectAnswer> {
    if (!questionId) {
      throw new HttpException("Не указан ID вопроса", HttpStatus.BAD_REQUEST);
    }

    if (!correctAnswerDto.answers || !correctAnswerDto.answers.length) {
      throw new HttpException("Не указаны ответы", HttpStatus.BAD_REQUEST);
    }

    let existedAnswers = await this.correctAnswerModel.findOne({ questionId });

    try {
      let dto: CorrectAnswer = {
        answers: correctAnswerDto.answers,
        questionId,
      };

      let createdCorrectAnswers;

      if (existedAnswers) {
        createdCorrectAnswers = existedAnswers;
        createdCorrectAnswers.answers = dto.answers;
      } else {
        createdCorrectAnswers = new this.correctAnswerModel(dto);
      }

      return createdCorrectAnswers.save();
    } catch (e) {
      throw new HttpException(
        `Ошибка при сохранении ответов, ${e.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async checkCorrectAnswers(
    questionId: string,
    correctAnswerDto: CorrectAnswerDto,
    request: IRequestWithAuth
  ): Promise<any> {
    if (!correctAnswerDto.answers || !correctAnswerDto.answers.length) {
      throw new HttpException(
        "Пользователь не выбрал правильные ответы",
        HttpStatus.BAD_REQUEST
      );
    }

    let correctAnswers = await this.correctAnswerModel.findOne({ questionId });
    if (!correctAnswers) {
      throw new HttpException(
        "У этого вопроса нет ответов",
        HttpStatus.NOT_FOUND
      );
    }

    let isCorrect = correctAnswerDto.answers.every((v) =>
      correctAnswers.answers.includes(v)
    );

    if (isCorrect) {
      let reward = await this.rewardService.giveRatingByTask(
        request.user._id,
        questionId
      );

      return {
        status: true,
        reward,
      };
    }

    return {
      status: false,
    };
  }
}
