import { forwardRef, Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../schemas/task.schema";
import { AuthModule } from "../auth/auth.module";
import { RolesModule } from "../roles/roles.module";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    RolesModule,
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [TasksService],
})
export class TasksModule {}
