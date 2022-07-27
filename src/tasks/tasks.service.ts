import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "../schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FilesService } from "../files/files.service";
import { TaskSettingsDto } from "./dto/task-settings.dto";
import {
  TaskSettings,
  TaskSettingsDocument,
} from "../schemas/task-settings.schema";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(TaskSettings.name)
    private taskSettingsModel: Model<TaskSettingsDocument>,
    private filesService: FilesService
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async getTasks(withSettings: boolean = false): Promise<Task[]> {
    let tasks;

    if (withSettings) {
      tasks = await this.taskModel.find().populate("settings");
    } else {
      tasks = await this.taskModel.find();
    }

    return tasks;
  }

  async getTask(taskId: string): Promise<Task> {
    if (!taskId) {
      throw new HttpException("Не указан ID задания", HttpStatus.BAD_REQUEST);
    }

    const task = await this.taskModel.findById(taskId).populate("settings");
    return task;
  }

  async updateTask(taskId: string, dto: CreateTaskDto): Promise<Task> {
    let task = await this.taskModel.findById({ _id: taskId });
    task.question = dto.question;
    task.answersType = dto.answersType;

    return task.save();
  }

  async deleteTaskImage(taskId: string): Promise<Task> {
    let task = await this.taskModel.findById({ _id: taskId });
    task.image = "";

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

  async getTaskSettings(taskId: string): Promise<TaskSettings> {
    return this.taskSettingsModel.findOne({ questionId: taskId });
  }

  async saveTaskSettings(
    questionId: string,
    dto: TaskSettingsDto
  ): Promise<TaskSettings> {
    if (!questionId) {
      throw new HttpException("Не указан ID задания", HttpStatus.BAD_REQUEST);
    }

    if (!dto) {
      throw new HttpException(
        "Нет данных для сохранения",
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      let updatedDto: TaskSettings = {
        questionId,
        ...dto,
      };

      let existedSettings = await this.taskSettingsModel.findOne({
        questionId,
      });

      if (existedSettings) {
        existedSettings.rating = dto.rating;
        existedSettings.search = dto.search;
        return existedSettings.save();
      } else {
        const createdSettings = new this.taskSettingsModel(updatedDto);
        const task = await this.taskModel.findById(questionId);
        task.settings = createdSettings;
        await task.save();
        return createdSettings.save();
      }
    } catch (e) {}

    throw new HttpException(
      "Ошибка сохранения настроек",
      HttpStatus.BAD_REQUEST
    );
  }
}
