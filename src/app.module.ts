import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { FilesService } from "./files/files.service";
import { FilesModule } from "./files/files.module";
import { TasksController } from "./tasks/tasks.controller";
import { TasksModule } from "./tasks/tasks.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AnswersModule } from './answers/answers.module';
import { RewardModule } from './reward/reward.module';
import { SetsModule } from './sets/sets.module';
import { ItemsModule } from './items/items.module';
import { LogSetResolveModule } from './log-set-resolve/log-set-resolve.module';
import { LogTaskResolveModule } from './log-task-resolve/log-task-resolve.module';
import * as path from "path";

@Module({
  controllers: [TasksController],
  providers: [FilesService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    TasksModule,
    AnswersModule,
    RewardModule,
    SetsModule,
    ItemsModule,
    LogSetResolveModule,
    LogTaskResolveModule,
  ],
})
export class AppModule {}
