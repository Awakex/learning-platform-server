import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
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
import { LogSetResolveService } from "../log-set-resolve/log-set-resolve.service";
import { SetsService } from "../sets/sets.service";
import { LogTaskResolveService } from "../log-task-resolve/log-task-resolve.service";

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(CorrectAnswer.name)
    private correctAnswerModel: Model<CorrectAnswerDocument>,
    private tasksService: TasksService,
    private rewardService: RewardService,
    private logSetResolveService: LogSetResolveService,
    private logTaskResolveService: LogTaskResolveService,
    private setsService: SetsService
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

  async isTaskAlreadyResolved(
    taskId: string,
    userId: string
  ): Promise<boolean> {
    let log = await this.logTaskResolveService.getResolveLogByTaskIdAndUserId(
      taskId,
      userId
    );
    return !!log;
  }

  async isSetAlreadyResolved(setId: string, userId: string): Promise<boolean> {
    let set = await this.setsService.getSetById(setId, false);

    let logSetResolve =
      await this.logSetResolveService.getResolveLogBySetIdAndUserId(
        setId,
        userId
      );

    let resolveQuestionIds = logSetResolve.map((v) => v.taskId.toString());

    return set.tasks.every((v) => resolveQuestionIds.includes(v.toString()));
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
    request: IRequestWithAuth,
    setId: string
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

    let isCorrect = correctAnswerDto.answers.every((v) => {
      return correctAnswers.answers.includes(v);
    });


    let isSetAlreadyResolved

    if (setId) {
      isSetAlreadyResolved = await this.isSetAlreadyResolved(
          setId,
          request.user._id
      );
    }


    let isTaskAlreadyResolved = await this.isTaskAlreadyResolved(
      questionId,
      request.user._id
    );

    if (!isTaskAlreadyResolved) {
      await this.logTaskResolveService.saveResolve(
        questionId,
        isCorrect,
        request.user._id
      );
    }

    if (setId && !isSetAlreadyResolved) {
      await this.logSetResolveService.saveResolve(
        setId,
        isCorrect,
        request.user._id,
        questionId
      );
    }

    let result: any = {
      status: isCorrect,
      isSetAlreadyResolved,
      isTaskAlreadyResolved,
    };

    //todo: решить как выдавать награду для комплекта
    if (isCorrect) {
      let reward;
      let setReward;
      if (!isTaskAlreadyResolved) {
        reward = await this.rewardService.giveRatingByTask(
          request.user._id,
          questionId
        );
      }

      if (setId) {
        // смотрим по логам ДО записи нового лога, если на момент проверки сет был не решен,
        // но после решения мы получаем решенный сет, то выдаем награду
        let isSetResolvedAfterLastResolve = await this.isSetAlreadyResolved(
          setId,
          request.user._id
        );

        if (!isSetAlreadyResolved && isSetResolvedAfterLastResolve) {
          setReward = await this.rewardService.giveItemsBySet(
            request.user._id,
            setId
          );

          result.setReward = setReward;
        }
      }

      result.reward = reward;
    }

    return result;
  }
}
