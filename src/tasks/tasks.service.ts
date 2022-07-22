import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilesService } from "../files/files.service";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private filesService: FilesService
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getTask(taskId: string): Promise<Task> {
    if (!taskId) {
      throw new HttpException("Не указан ID задания", HttpStatus.BAD_REQUEST);
    }

    const task = await this.taskModel.findById(taskId);
    return task;
  }

  async updateTask(taskId: string, dto: CreateTaskDto): Promise<Task> {
    let task = await this.taskModel.findById({ _id: taskId });

    if (dto.question) {
      task.question = dto.question;
    }

    return task.save();
  }

  async attachImage(taskId: string, image: File) {
    const fileName = await this.filesService.createFile(image);
    const task = await this.taskModel.findById(taskId);
    if (task && fileName) {
      task.image = fileName;
    }

    return task.save();
  }
}
