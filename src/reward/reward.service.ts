import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class RewardService {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService
  ) {}

  async giveRatingByTask(userId: string, taskId: string) {
    if (!userId || !taskId) {
      throw new HttpException(
        "Ошибка при зачислении рейтинга",
        HttpStatus.BAD_REQUEST
      );
    }

    let settings = await this.tasksService.getTaskSettings(taskId);
    if (!settings) {
      return null;
    }

    await this.usersService.updatedUserRating(userId, settings.rating);

    return {
      rating: settings.rating,
    };
  }
}
