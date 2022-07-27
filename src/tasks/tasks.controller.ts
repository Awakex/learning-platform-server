import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "../auth/roles-auth.decorator";
import { Roles } from "../../types/Roles";
import { RolesGuard } from "../auth/roles.guard";
import { Task } from "../schemas/task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { TaskSettings } from "../schemas/task-settings.schema";
import { TaskSettingsDto } from "./dto/task-settings.dto";

@ApiTags("Задания")
@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: "Создание задания" })
  @ApiResponse({ status: 200, type: Task })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/create")
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @ApiOperation({ summary: "Получить все задания" })
  @ApiResponse({ status: 200, type: Task })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/")
  getTasks(@Query("withSettings") withSettings: boolean) {
    return this.tasksService.getTasks(withSettings);
  }

  @ApiOperation({ summary: "Изменить задание" })
  @ApiResponse({ status: 204, type: Task })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Put("/:id")
  updateTask(@Param("id") id: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.updateTask(id, dto);
  }

  @ApiOperation({ summary: "Получить задание по ID" })
  @ApiResponse({ status: 200, type: Task })
  @Role(Roles.GUEST)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Get("/:id")
  getTask(@Param("id") id: string) {
    return this.tasksService.getTask(id);
  }

  @ApiOperation({ summary: "Прикрепить изображение к заданию" })
  @ApiResponse({ status: 200, type: Task })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor("file"))
  @Put("/:id/attach-image")
  attachImage(@Param("id") id: string, @UploadedFile("file") image) {
    return this.tasksService.attachImage(id, image);
  }

  @ApiOperation({ summary: "Удалить изображение из вопроса" })
  @ApiResponse({ status: 200, type: Task })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Delete("/:id/image")
  deleteTaskImage(@Param("id") id: string) {
    return this.tasksService.deleteTaskImage(id);
  }

  @ApiOperation({ summary: "Сохранение настроек для задания" })
  @ApiResponse({ status: 200, type: TaskSettings })
  @Role(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @Post("/:id/settings")
  saveTaskSettings(
    @Param("id") questionId: string,
    @Body() dto: TaskSettingsDto
  ) {
    return this.tasksService.saveTaskSettings(questionId, dto);
  }
}
